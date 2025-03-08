package com.formaster.mstform_createform;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class mstCreateformController {

	@Autowired
	MstCreateformService formService;

	@PostMapping("/saveForm")
	public ResponseEntity<?> SaveForm(@RequestBody MstCreateformDTO dto) {
		try {
			MstCreateformDTO ServiceResponseFormDTO = formService.saveForm(dto);
			if (ServiceResponseFormDTO.getMessage().containsKey("200")) {
				return ResponseEntity.ok(Map.of("message", ServiceResponseFormDTO.getMessage().get("200")));
			} else if (ServiceResponseFormDTO.getMessage().containsKey("400")) {
				return ResponseEntity.badRequest()
						.body(Map.of("message", ServiceResponseFormDTO.getMessage().get("400")));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("message", ServiceResponseFormDTO.getMessage().get("500")));
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}

	@DeleteMapping("/deletefdata/{id}")
	public ResponseEntity<?> deleteFormData(MstCreateformDTO dto, @PathVariable("id") int id) {
		try {
			MstCreateformDTO ServiceResponseFormDTO = formService.deleteFormData(dto, id);
			if (ServiceResponseFormDTO.getMessage().containsKey("200")) {
				return ResponseEntity.ok(Map.of("message", ServiceResponseFormDTO.getMessage().get("200")));
			} else if (ServiceResponseFormDTO.getMessage().containsKey("400")) {
				return ResponseEntity.badRequest()
						.body(Map.of("message", ServiceResponseFormDTO.getMessage().get("400")));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("message", ServiceResponseFormDTO.getMessage().get("500")));
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}

	@PostMapping("/fetchFData/{id}")
	public ResponseEntity<?> fetchFData(@PathVariable("id") int id) {
		try {
			List<MstCreateformDTO> formDataList = formService.fetchFormDataById(id);
			return ResponseEntity.ok(formDataList);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}

}
