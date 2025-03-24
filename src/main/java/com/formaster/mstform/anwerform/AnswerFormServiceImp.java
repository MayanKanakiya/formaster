package com.formaster.mstform.anwerform;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.formaster.mstform.formsubmit.FormSubmitEntity;
import com.formaster.mstform.formsubmit.FormSubmitRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Service
public class AnswerFormServiceImp implements AnswerFormService {

	@Autowired
	AnswerFormRepository answerFormRepository;

	@Autowired
	FormSubmitRepository formSubmitRepository;

	@Autowired
	private HttpSession session;

	@Override
	@Transactional
	public AnswerFormDTO saveAnswer(AnswerFormDTO dto) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			List<AnswerFormDTO> answerList = dto.getAnswersList();
			int fid = 0;
			if (answerList != null) {
				for (AnswerFormDTO answer : answerList) {
					AnswerFormEntity answerFormEntity = new AnswerFormEntity();
					answerFormEntity.setQuelabel(answer.getQuelabel());
					answerFormEntity.setAnswers(answer.getAnswer());
					answerFormEntity.setCreatedby(createdby);
					fid = answer.getFid();
					answerFormRepository.save(answerFormEntity);
				}
				FormSubmitEntity fSubmitEntity = new FormSubmitEntity();
				fSubmitEntity.setFid(fid);
				fSubmitEntity.setSubmitedby(createdby);
				fSubmitEntity.setIssubmited(1);
				formSubmitRepository.save(fSubmitEntity);
			}

			dto.addMessage("200", "Answer is save in our database");
			return dto;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error while saving form data");
			return dto;
		}
	}
}
