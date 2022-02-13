package wonder.backend.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import wonder.backend.jwt.JwtAccessDeniedHandler;
import wonder.backend.jwt.JwtAuthenticationEntryPoint;
import wonder.backend.jwt.JwtFilter;
import wonder.backend.jwt.TokenProvider;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
        http
                .cors()
                .and()
                .csrf().disable();
        http
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .antMatchers("/swagger-ui/**", "/swagger-resources/**", "/v3/api-docs/**").permitAll()

                .antMatchers("/auth/login").permitAll()
                .antMatchers("/auth/signup").permitAll()
                .antMatchers("/test/**").permitAll()

                .antMatchers(HttpMethod.GET, "/users").permitAll()
                .antMatchers(HttpMethod.GET, "/users/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/users/{id}/posts").permitAll()
                .antMatchers(HttpMethod.GET, "/users/{id}/followers").permitAll()
                .antMatchers(HttpMethod.GET, "/users/{id}/followees").permitAll()
                .antMatchers(HttpMethod.GET, "/posts").permitAll()
                .antMatchers(HttpMethod.GET, "/posts/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/comments").permitAll()
                .antMatchers(HttpMethod.GET, "/recommendation").permitAll()

                .antMatchers(HttpMethod.POST, "/posts").access("hasAnyRole('USER, ADMIN')")
                .antMatchers(HttpMethod.POST, "/comments").access("hasAnyRole('USER, ADMIN')")
                .antMatchers(HttpMethod.POST, "/recommendation").access("hasAnyRole('USER, ADMIN')")

                .antMatchers(HttpMethod.PUT, "/posts/{id}").access("hasAnyRole('USER, ADMIN')")
                .antMatchers(HttpMethod.PUT, "/comments/{id}").access("hasAnyRole('USER, ADMIN')")

                .antMatchers(HttpMethod.DELETE, "/posts/{id}").access("hasAnyRole('USER, ADMIN')")
                .antMatchers(HttpMethod.DELETE, "/comments/{id}").access("hasAnyRole('USER, ADMIN')")
                .antMatchers(HttpMethod.DELETE, "/recommendation/{id}").access("hasAnyRole('USER, ADMIN')")
                .anyRequest().authenticated();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}