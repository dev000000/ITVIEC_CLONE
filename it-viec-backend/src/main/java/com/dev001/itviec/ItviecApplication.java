package com.dev001.itviec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
public class ItviecApplication {
    @Value("${server.port}")
    public  String port;

    @Value("${application.security.cookie.secure}")
    private  boolean secure;

    @Value("${application.security.cookie.same-site}")
    private  String sameSite;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private  long refreshExpiration; // in milliseconds

    @Value("${spring.datasource.url}")
    private  String url;

    public static void main(String[] args) {
        SpringApplication.run(ItviecApplication.class, args);

    }
    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            log.error("Server started on port: " + port);
            log.error("Secure: " + secure);
            log.error("SameSite: " + sameSite);
            log.error("Refresh Expiration: " + refreshExpiration);
            log.error("Database URL: " + url);
        };
    }
    }


