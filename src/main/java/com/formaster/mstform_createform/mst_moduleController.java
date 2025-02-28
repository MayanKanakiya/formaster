package com.formaster.mstform_createform;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class mst_moduleController {

	@Autowired
	mst_moduleService moduleService;

	@PostMapping("/populateModuleDropdown")
	public ResponseEntity<?> fetchUData() {
		try {
			List<mst_moduleDTO> moduleNameList = moduleService.getAllModuleNameData();
			return ResponseEntity.ok(moduleNameList);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "Internal server error controller side: " + e.getMessage()));
		}
	}
}
