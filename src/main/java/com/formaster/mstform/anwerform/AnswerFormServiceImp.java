package com.formaster.mstform.anwerform;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class AnswerFormServiceImp implements AnswerFormService {

	@Autowired
	AnswerFormRepository answerFormRepository;

	@Autowired
	private HttpSession session;

	@Override
	public AnswerFormDTO saveAnswer(AnswerFormDTO dto) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			AnswerFormEntity answerFormEntity = new AnswerFormEntity();

			answerFormRepository.save(answerFormEntity);
			dto.addMessage("200", "Answer is save in our database");
			return dto;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error while saving form data");
			return dto;
		}
	}
}
