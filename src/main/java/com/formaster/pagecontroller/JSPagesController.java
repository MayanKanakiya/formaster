package com.formaster.pagecontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.formaster.loginuser.UserDTO;
import com.formaster.mstform.anwerform.AnswerFormRepository;
import com.formaster.mstform.formsubmit.FormSubmitRepository;
import com.formaster.mstform_adduser.MasterFormRepository;
import com.formaster.mstform_createform.MstCreateformDTO;
import com.formaster.mstform_createform.MstCreateformRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class JSPagesController {
	@Autowired
	MasterFormRepository formRepository;

	@Autowired
	MstCreateformRepository createformRepository;

	@Autowired
	AnswerFormRepository answerFormRepository;

	@Autowired
	FormSubmitRepository formSubmitRepository;
	
	/*
	 * public JSPagesController(FormSubmitRepository formSubmitRepository) {
	 * this.formSubmitRepository = formSubmitRepository; }
	 */

	@Autowired
	private HttpSession session;

	@GetMapping("/")
	public String home() {
		return "index";
	}

	@GetMapping("/completed-forms")
	public String completedForms(Model model) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			List<Object[]> formCompletedData = formSubmitRepository.getSubmitFData(createdby);
			model.addAttribute("formCompletedData", formCompletedData);
			return "completed_forms";
		} catch (Exception e) {
			return "completed_forms";
		}
	}

	@GetMapping("/fill-forms")
	public String fillForms(Model model) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			List<MstCreateformDTO> notSubmitedFormList = answerFormRepository.getAllFormDataById(createdby);
			model.addAttribute("notSubmitedFormList", notSubmitedFormList);
			return "fill_forms";
		} catch (Exception e) {
			System.out.println("Error while fetching not submited form data from the table" + e.getMessage());
			return "fill_forms";
		}
	}

	@GetMapping("/master-form")
	public String masterForm(Model model) {
		try {
			Integer id = createformRepository.formId();
			id = (id != null) ? id + 1 : 1;
			int createdby = (int) session.getAttribute("currentLogin");
			List<MstCreateformDTO> formDataList = createformRepository.getAllFormData(createdby);
			model.addAttribute("id", id);
			model.addAttribute("formDataList", formDataList);
			return "master_form";
		} catch (Exception e) {
			System.out.println("Error while fetching id from the form" + e.getMessage());
			return "master_form";
		}

	}

	@GetMapping("/master-users")
	public String masterUsers(Model model) {
		try {
			List<UserDTO> userList = formRepository.getAllUserData();
			model.addAttribute("userList", userList);
			return "master_users";
		} catch (Exception e) {
			System.out.println("Error while fetching user data from the user_entity table" + e.getMessage());
			return "master_users";
		}
	}

	@GetMapping("/profile")
	public String profile(Model model) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			List<UserDTO> userListById = formRepository.getUserDataById(createdby);
			model.addAttribute("userListById", userListById);
			return "profile";
		}catch (Exception e) {
			System.out.println("Error while fetching user data from the user_entity table" + e.getMessage());
			return "profile";
		}
		
	}
}
