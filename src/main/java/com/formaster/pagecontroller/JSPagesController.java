package com.formaster.pagecontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.formaster.loginuser.UserDTO;
import com.formaster.mstform_adduser.MasterFormService;
import com.formaster.mstform_createform.MstCreateformRepository;

@Controller
public class JSPagesController {

	@Autowired
	MasterFormService formService;

	@Autowired
	MstCreateformRepository createformRepository;

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
	public String masterForm(Model model) {
		try {
			Integer id = createformRepository.formId();
			id = (id != null) ? id + 1 : 1;
			model.addAttribute("id", id);
			return "master_form";
		} catch (Exception e) {
			System.out.println("Error while fetching id from the form" + e.getMessage());
			return "master_form";
		}

	}

	@GetMapping("/master-users")
	public String masterUsers(Model model) {
		try {
			List<UserDTO> userList = formService.getAllUserData();
			model.addAttribute("userList", userList);
			return "master_users";
		} catch (Exception e) {
			System.out.println("Error while fetching user data from the user_entity table" + e.getMessage());
			return "master_users";
		}
	}

	@GetMapping("/profile")
	public String profile() {
		return "profile";
	}
}
