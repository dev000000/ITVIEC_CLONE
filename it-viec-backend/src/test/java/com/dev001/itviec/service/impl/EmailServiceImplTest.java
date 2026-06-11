package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;
import java.util.Properties;

import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.dev001.itviec.configuration.MailConfig;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;

@ExtendWith(MockitoExtension.class)
class EmailServiceImplTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private SpringTemplateEngine templateEngine;

    @Mock
    private MailConfig mailConfig;

    @InjectMocks
    private EmailServiceImpl emailService;

    @BeforeEach
    void setUp() {
        when(mailConfig.getFrom()).thenReturn("no-reply@test.com");
    }

    @Test
    void sendSimple_shouldCallMailSender() {
        emailService.sendSimple("user@test.com", "Subject", "Body");

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(captor.capture());

        SimpleMailMessage message = captor.getValue();
        assertThat(message.getFrom()).isEqualTo("no-reply@test.com");
        assertThat(message.getTo()).containsExactly("user@test.com");
        assertThat(message.getSubject()).isEqualTo("Subject");
        assertThat(message.getText()).isEqualTo("Body");
    }

    @Test
    void sendSimple_whenMailFails_shouldThrowAppException() {
        doThrow(new MailSendException("smtp down")).when(mailSender).send(any(SimpleMailMessage.class));

        assertThatThrownBy(() -> emailService.sendSimple("user@test.com", "Subject", "Body"))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.EMAIL_SEND_FAILED);
    }

    @Test
    void sendHtml_shouldProcessTemplateAndSend() throws Exception {
        when(templateEngine.process(eq("email/welcome"), any(Context.class))).thenReturn("<p>Hello</p>");

        Session session = Session.getInstance(new Properties());
        MimeMessage mimeMessage = new MimeMessage(session);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        emailService.sendHtml("user@test.com", "Welcome", "email/welcome", Map.of("name", "Tester"));

        verify(templateEngine).process(eq("email/welcome"), any(Context.class));
        verify(mailSender).send(mimeMessage);
    }

    @Test
    void sendBulk_shouldSendToEachRecipient() {
        when(templateEngine.process(eq("email/welcome"), any(Context.class))).thenReturn("<p>Hello</p>");

        Session session = Session.getInstance(new Properties());
        when(mailSender.createMimeMessage()).thenAnswer(invocation -> new MimeMessage(session));

        List<String> recipients = List.of("a@test.com", "b@test.com", "c@test.com");
        emailService.sendBulk(recipients, "Bulk", "email/welcome", Map.of("name", "Tester", "message", "Hi"));

        verify(mailSender, times(3)).send(any(MimeMessage.class));
    }
}
