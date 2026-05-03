package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import com.dev001.itviec.entity.token.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

    @Query(value = """
            SELECT * FROM token t
            WHERE t.user_id =:userId AND t.revoked = false
            """, nativeQuery = true)
    List<Token> findAllValidTokensByUser(@Param("userId") String userId);

    @Query(value = """
        SELECT * FROM token t
        WHERE t.user_id = :userId AND t.revoked = false AND t.is_access_token = true
        """,nativeQuery = true)
    List<Token> findAllValidAccessTokensByUser(@Param("userId") String userId);

    Optional<Token> findByToken(String token);
}
