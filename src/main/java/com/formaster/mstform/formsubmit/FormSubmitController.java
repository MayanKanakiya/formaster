package com.formaster.mstform.formsubmit;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FormSubmitController {

	@Autowired
	FormSubmitRepository formSubmitRepository;
	
	@PostMapping("/fetchFAns/{id}")
	public ResponseEntity<?> fetchFData(@PathVariable("id") int id) {
		try {
			List<Object[]> formDataList = formSubmitRepository.getFormSubmitedAnswer(id);
			return ResponseEntity.ok(formDataList);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}
}
