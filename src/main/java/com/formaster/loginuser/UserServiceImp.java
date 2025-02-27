package com.formaster.loginuser;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
	@Override
	public UserDTO loginJValid(UserDTO dto) {
		try {
			if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
				dto.addMessage("400", "Please enter your email");
				return dto;
			}
			if (dto.getPass() == null || dto.getPass().isEmpty()) {
				dto.addMessage("400", "Please enter your password");
				return dto;
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error : Java Validation");
			return dto;
		}
		dto.addMessage("200", "Success login java server side validation");
		return dto;
	}
}
