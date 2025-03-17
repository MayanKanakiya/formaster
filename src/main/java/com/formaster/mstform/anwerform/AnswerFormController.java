package com.formaster.mstform.anwerform;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AnswerFormController {

	@Autowired
	AnswerFormService answerService;

	@PostMapping("/saveAnswer")
	public ResponseEntity<?> SaveForm(@RequestBody AnswerFormDTO dto) {
		try {
			AnswerFormDTO ServiceResponseAnswerDTO = answerService.saveAnswer(dto);
			if (ServiceResponseAnswerDTO.getMessage().containsKey("200")) {
				return ResponseEntity.ok(Map.of("message", ServiceResponseAnswerDTO.getMessage().get("200")));
			} else if (ServiceResponseAnswerDTO.getMessage().containsKey("400")) {
				return ResponseEntity.badRequest()
						.body(Map.of("message", ServiceResponseAnswerDTO.getMessage().get("400")));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("message", ServiceResponseAnswerDTO.getMessage().get("500")));
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}
}
