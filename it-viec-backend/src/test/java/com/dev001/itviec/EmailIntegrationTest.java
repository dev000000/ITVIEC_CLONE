package com.dev001.itviec;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import jakarta.mail.internet.MimeMessage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.dev001.itviec.service.EmailService;
import com.icegreen.greenmail.configuration.GreenMailConfiguration;
import com.icegreen.greenmail.junit5.GreenMailExtension;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetup;

@SpringBootTest
@ActiveProfiles("test")
class EmailIntegrationTest {

    @RegisterExtension
    static GreenMailExtension greenMail = new GreenMailExtension(new ServerSetup(3025, "127.0.0.1", "smtp"))
            .withConfiguration(GreenMailConfiguration.aConfig().withUser("test", "test"))
            .withPerMethodLifecycle(false);

    @Autowired
    private EmailService emailService;

    @BeforeEach
    void purgeMailbox() throws Exception {
        greenMail.purgeEmailFromAllMailboxes();
    }

    @Test
    void sendSimple_shouldBeReceivedByGreenMail() throws Exception {
        emailService.sendSimple("recipient@test.com", "Hello", "Test body");

        MimeMessage[] received = greenMail.getReceivedMessages();
        assertThat(received).hasSize(1);
        assertThat(received[0].getSubject()).isEqualTo("Hello");
        assertThat(GreenMailUtil.getBody(received[0])).contains("Test body");
    }

    @Test
    void sendBulk_shouldDeliverToAllRecipients() {
        List<String> recipients = List.of("a@test.com", "b@test.com", "c@test.com");
        emailService.sendBulk(recipients, "Bulk", "email/welcome", Map.of("name", "Tester", "message", "Hi"));

        assertThat(greenMail.getReceivedMessages()).hasSize(3);
    }
}
