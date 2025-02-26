package com.formaster.mstform;

import java.security.SecureRandom;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordGenerate {

	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
	private static final SecureRandom RANDOM = new SecureRandom();
	private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public String generateRandomPassword(int length) {
		StringBuilder password = new StringBuilder();
		for (int i = 0; i < length; i++) {
			password.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
		}
		return password.toString();
	}

	public String hashPassword(String password) {
		return passwordEncoder.encode(password);
	}
}
