package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dev001.itviec.entity.token.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

    @Query(
            """
			select t from Token t inner join User u on t.user.id = u.id
			where u.id = :userId and (t.revoked = false)
			""")
    List<Token> findAllValidTokensByUser(String userId);

    @Query(
            """
			select t from Token t inner join User u on t.user.id = u.id
			where u.id = :userId and t.revoked = false and t.isAccessToken = true
			""")
    List<Token> findAllValidAccessTokensByUser(String userId);

    Optional<Token> findByToken(String token);
}
