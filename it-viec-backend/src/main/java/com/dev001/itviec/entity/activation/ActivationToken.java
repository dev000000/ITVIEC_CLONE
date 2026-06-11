package com.dev001.itviec.entity.activation;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.ActivationTokenType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(
        name = "activation_tokens",
        indexes = {
            @Index(name = "idx_activation_token", columnList = "token"),
            @Index(name = "idx_activation_user_id", columnList = "user_id")
        })
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ActivationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false, unique = true)
    String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", nullable = false)
    @Builder.Default
    ActivationTokenType tokenType = ActivationTokenType.EMAIL_VERIFY;

    @Column(name = "expires_at", nullable = false)
    LocalDateTime expiresAt;

    @Column(name = "is_used")
    boolean used;

    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
