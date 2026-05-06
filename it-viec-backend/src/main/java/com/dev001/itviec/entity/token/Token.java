package com.dev001.itviec.entity.token;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;

import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.TokenType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tokens")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String id;

    @Column(nullable = false)
    String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type")
    TokenType tokenType;

    @Column(name = "expiry_time")
    Date expiryTime;

    @Column(name = "is_revoked")
    boolean revoked;

    @Column(name = "is_access_token")
    boolean accessToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
