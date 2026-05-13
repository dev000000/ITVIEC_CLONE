package com.dev001.itviec.configuration;

import com.dev001.itviec.exception.TokenExpiredException;
import com.dev001.itviec.repository.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        var uri = request.getRequestURI();
        var method = request.getMethod();

        return (uri.contains("/api/v1/cities") && method.equals("GET"))
                || uri.contains("/api/v1/skills") && method.equals("GET")
                || uri.contains("/api/v1/countries") && method.equals("GET")
                || uri.startsWith("/api/v1/companies/slug/") && method.equals("GET")
                || uri.contains("/register/seekers")
                || uri.contains("/refresh-token")
                || uri.contains("/login");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // this section is for HttpOnly Cookie
        if (shouldNotFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        String jwt = null;
        String email;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("accessToken".equals(c.getName())) {
                    jwt = c.getValue();
                    break;
                }
            }
        }
        if (jwt == null) {
            filterChain.doFilter(request, response);
            return;
        }
        var isTokenExpired = jwtService.isTokenExpired(jwt);
        if (isTokenExpired) {
            request.setAttribute("auth.error.code", "ACCESS_TOKEN_EXPIRED");
            SecurityContextHolder.clearContext();
            throw new TokenExpiredException("Access token expired");
        }
        email = jwtService.extractEmail(jwt).orElse(null);
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
            boolean isTokenExistedInDatabaseAndNotRevoked = tokenRepository
                    .findByToken(jwt)
                    .map(token -> !token.isRevoked())
                    .orElse(false);
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenExistedInDatabaseAndNotRevoked) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
