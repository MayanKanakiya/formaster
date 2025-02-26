package com.formaster.mstform;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.formaster.user.UserDTO;

@Controller
public class MasterFormController {

	@Autowired
	MasterFormService mstService;

	@PostMapping("/userMstJValid")
	public ResponseEntity<?> UserMstValidation(@RequestBody UserDTO dto) {
		try {
			UserDTO ServiceResponseUserDTO = mstService.AddUserJValid(dto);
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

	@PostMapping("/addUserMst")
	public ResponseEntity<?> MstUserAdd(@ModelAttribute UserDTO dto, @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {
		try {
			UserDTO ServiceResponseUserDTO = mstService.AddUser(dto,imageFile);
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
