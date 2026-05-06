package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import com.dev001.itviec.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.token.Token;

public interface TokenRepository extends JpaRepository<Token, String> {


    List<Token> findByUserAndRevokedTrue(User user);

    List<Token> findByUserAndRevokedTrueAndAccessTokenTrue(User user);

    Optional<Token> findByToken(String token);
}
