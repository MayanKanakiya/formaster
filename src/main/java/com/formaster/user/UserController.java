package com.formaster.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/loginjvalid")
	public ResponseEntity<?> loginJValidate(@RequestBody UserDTO dto) {
		try {
			UserDTO ServiceResponseUserDTO = userService.loginJValid(dto);
			if (ServiceResponseUserDTO.getMessage().containsKey(true)) {
				return ResponseEntity.ok(Map.of("message", ServiceResponseUserDTO.getMessage().get(true)));
			} else {
				return ResponseEntity.badRequest()
						.body(Map.of("message", ServiceResponseUserDTO.getMessage().get(false)));
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Internal server error: " + e.getMessage());
		}
	}
}
