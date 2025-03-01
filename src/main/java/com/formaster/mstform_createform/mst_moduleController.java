package com.formaster.mstform_createform;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class mst_moduleController {

	@Autowired
	mst_moduleService moduleService;

	@PostMapping("/populatingDropdown")
	public ResponseEntity<?> populatingDropdown() {
		try {
			Map<String, Object> response = new HashMap<>();
			List<mst_moduleDTO> moduleNameList = moduleService.getAllModuleNameData();
			List<mst_recurranceDTO> recurranceDataList = moduleService.getAllRecurranceData();
			List<mst_monthDTO> monthDataList = moduleService.getAllMonthData();

			// Populate the response with the fetched data
			response.put("modules", moduleNameList);
			response.put("recurrance", recurranceDataList);
			response.put("month", monthDataList);

			// Return a success response, even if lists are empty
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					Map.of("message", "Internal server error while populating module or recurrance or month dropdowns: "
							+ e.getMessage()));
		}
	}

	@PostMapping("/populateCharacteristicByModuleName")
	public ResponseEntity<?> changeCharacteristicNameByModule(@RequestParam("moduleName") String moduleName) {
		try {
			List<mst_characteristicDTO> characteristicNameByModule = moduleService
					.getCharacterisitcByModuleName(moduleName);
			return ResponseEntity.ok(characteristicNameByModule);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message",
							"Internal server error controller side while populating characteristic data into dropdown: "
									+ e.getMessage()));
		}
	}

	@PostMapping("/populatesubCharacteristicByCharacteristicName")
	public ResponseEntity<?> changeSubCharacteristicNameByCharacteristic(
			@RequestParam("characteristicName") String characteristicName) {
		try {
			List<mst_subcharacteristicDTO> subcharacteristicNameByCharacteristic = moduleService
					.getSubCharacteristicByCharacteristicName(characteristicName);
			return ResponseEntity.ok(subcharacteristicNameByCharacteristic);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message",
					"Internal server error controller side while populating subcharacteristic data into dropdown: "
							+ e.getMessage()));
		}
	}
}
