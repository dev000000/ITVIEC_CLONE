package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.token.Token;
import com.dev001.itviec.entity.user.User;

public interface TokenRepository extends JpaRepository<Token, String> {

    List<Token> findByUserAndRevokedTrue(User user);

    List<Token> findByUserAndRevokedTrueAndAccessTokenTrue(User user);

    Optional<Token> findByToken(String token);
}
