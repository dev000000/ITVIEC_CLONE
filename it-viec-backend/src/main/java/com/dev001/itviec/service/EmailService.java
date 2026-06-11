package com.dev001.itviec.service;

import java.util.List;
import java.util.Map;

public interface EmailService {
    void sendSimple(String to, String subject, String text);

    void sendHtml(String to, String subject, String templateName, Map<String, Object> variables);

    void sendBulk(List<String> recipients, String subject, String templateName, Map<String, Object> variables);
}
