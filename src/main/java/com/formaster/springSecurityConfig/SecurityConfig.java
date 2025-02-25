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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	UserDetailsService userdetailsService;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.csrf(Customizer.withDefaults())
				/* return http.csrf(csrf -> csrf.disable()) */
				.authorizeHttpRequests(auth -> auth.requestMatchers("/master-form", "/master-users")
						.hasAuthority("ADMIN").requestMatchers("/fill-forms", "/completed-forms", "/profile")
						.hasAnyAuthority("ADMIN", "CLIENT")
						.requestMatchers("/assets/**", "/js/LoginScript.js", "/WEB-INF/views/index.jsp").permitAll()
						.requestMatchers(new CustomAjaxRequestMatcher()).permitAll().anyRequest().authenticated())
				.formLogin(form -> form.loginPage("/").loginProcessingUrl("/loginForm")
						.successHandler(customSuccessHandler()).failureHandler(customFailureHandler()).permitAll())
				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/").invalidateHttpSession(true)
						.deleteCookies("JSESSIONID").permitAll())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)).build();
	}

	@Bean
	public AuthenticationSuccessHandler customSuccessHandler() {
		return (request, response, authentication) -> {
			UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
			String role = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse("");
			request.getSession().setAttribute("userRole", role);
			request.getSession().setAttribute("fname", userPrincipal.getFirstName());
			if ("ADMIN".equals(role)) {
				response.sendRedirect("/master-form");
			} else {
				response.sendRedirect("/fill-forms");
			}
		};
	}

	@Bean
	public AuthenticationFailureHandler customFailureHandler() {
		return (request, response, exception) -> {
			System.out.println("Login failed! Redirecting to login page...");
			request.getSession().setAttribute("LoginError", "Invalid Email or Password!");
			response.sendRedirect("/");
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

	public class CustomAjaxRequestMatcher implements RequestMatcher {
		@Override
		public boolean matches(HttpServletRequest request) {
			String requestedWithHeader = request.getHeader("X-Requested-With");
			return "XMLHttpRequest".equals(requestedWithHeader);
		}
	}

}
