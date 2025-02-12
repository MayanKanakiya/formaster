package com.formaster.pagecontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JSPagesController {

	@GetMapping("/")
	public String home() {
		return "index";
	}

	@GetMapping("/completed-forms")
	public String completedForms() {
		return "completed_forms";
	}

	@GetMapping("/fill-forms")
	public String fillForms() {
		return "fill_forms";
	}

	@GetMapping("/master-form")
	public String masterForm() {
		return "master_form";
	}

	@GetMapping("/master-users")
	public String masterUsers() {
		return "master_users";
	}

	@GetMapping("/profile")
	public String profile() {
		return "profile";
	}
}
