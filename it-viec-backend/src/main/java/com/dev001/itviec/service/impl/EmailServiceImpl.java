package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.EMAIL_SEND_FAILED;

import java.util.List;
import java.util.Map;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.dev001.itviec.configuration.MailConfig;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final MailConfig mailConfig;

    @Override
    public void sendSimple(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailConfig.getFrom());
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            mailSender.send(message);
        } catch (MailException ex) {
            log.error("Failed to send simple email to {}", to, ex);
            throw new AppException(EMAIL_SEND_FAILED);
        }
    }

    @Override
    public void sendHtml(String to, String subject, String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);
        String html = templateEngine.process(templateName, context);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
            helper.setFrom(mailConfig.getFrom());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException | MailException ex) {
            log.error("Failed to send html email to {}", to, ex);
            throw new AppException(EMAIL_SEND_FAILED);
        }
    }

    @Override
    public void sendBulk(List<String> recipients, String subject, String templateName, Map<String, Object> variables) {
        for (String recipient : recipients) {
            sendHtml(recipient, subject, templateName, variables);
        }
    }
}
