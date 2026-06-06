package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.token.Token;
import com.dev001.itviec.entity.user.User;

public interface TokenRepository extends JpaRepository<Token, String> {

    List<Token> findByUserAndRevokedFalse(User user);

    List<Token> findByUserAndRevokedFalseAndAccessTokenTrue(User user);

    Optional<Token> findByTokenAndRevokedFalse(String token);

    Optional<Token> findByToken(String token);
}
