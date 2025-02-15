package com.formaster.user;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
	@Override
	public void login() {

	}

	@Override
	public UserDTO loginJValid(UserDTO dto) {
		if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
			dto.addMessage(false, "Please enter your email");
			return dto;
		}
		if (dto.getPass() == null || dto.getPass().isEmpty()) {
			dto.addMessage(false, "Please enter your password");
			return dto;
		}
		dto.addMessage(true, "Success login java server side validation");
		return dto;
	}
}
