package com.dev001.itviec.entity.token;

import java.util.Date;

import jakarta.persistence.*;

import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.TokenType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Table(name = "token")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String id;

    String token;

    @Enumerated(EnumType.STRING)
    TokenType tokenType;

    Date expiryTime;
    boolean revoked;

    boolean isAccessToken;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
