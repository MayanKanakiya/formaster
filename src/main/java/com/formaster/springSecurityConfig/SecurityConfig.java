package com.formaster.springSecurityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	UserDetailsService userdetailsService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.csrf(Customizer.withDefaults())
				/* return http.csrf(csrf -> csrf.disable()) */
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/loginjvalid", "/assets/**", "/js/LoginScript.js", "/WEB-INF/views/index.jsp")
						.permitAll().anyRequest().authenticated())
				.formLogin(form -> form.loginPage("/") // Custom login page URL
						.loginProcessingUrl("/loginForm") // Form action URL
						.successHandler(customSuccessHandler()) // Redirect on success
						.failureHandler(customFailureHandler()) // Redirect on failure
						.permitAll())
				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/").invalidateHttpSession(true)
						.deleteCookies("JSESSIONID").permitAll())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)).build();
	}

	@Bean
	public AuthenticationSuccessHandler customSuccessHandler() {
		return (request, response, authentication) -> {
			System.out.println("Login successful! Redirecting...");
			response.sendRedirect("/master-form");
		};
	}

	@Bean
	public AuthenticationFailureHandler customFailureHandler() {
		return (request, response, exception) -> {
			System.out.println("Login failed! Redirecting to login page...");
			response.sendRedirect("/?error=true");
		};
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(userdetailsService);
		return provider;
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
