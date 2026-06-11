package com.dev001.itviec.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Component
@ConfigurationProperties(prefix = "app.mail")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MailConfig {
    String from;
}
