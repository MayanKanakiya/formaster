package com.formaster.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/loginjvalid")
	public ResponseEntity<?> loginJValidate(@RequestBody UserDTO dto) {
		try {
			UserDTO ServiceResponseUserDTO = userService.loginJValid(dto);
			if (ServiceResponseUserDTO.getMessage().containsKey("200")) {
				return ResponseEntity.ok(Map.of("message", ServiceResponseUserDTO.getMessage().get("200")));
			} else if (ServiceResponseUserDTO.getMessage().containsKey("400")) {
				return ResponseEntity.badRequest()
						.body(Map.of("message", ServiceResponseUserDTO.getMessage().get("400")));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("message", ServiceResponseUserDTO.getMessage().get("500")));
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}
}