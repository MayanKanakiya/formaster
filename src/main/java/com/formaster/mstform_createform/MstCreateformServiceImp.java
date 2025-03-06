package com.formaster.mstform_createform;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.formaster.mstform.queform.QueFormRepository;
import com.formaster.mstform.queform.QueformEntity;

import jakarta.servlet.http.HttpSession;

@Service
public class MstCreateformServiceImp implements MstCreateformService {

	@Autowired
	MstCreateformRepository createformRepository;

	@Autowired
	QueFormRepository queRepository;

	@Autowired
	private HttpSession session;

	public static String capitalizeFirst(String input) {
		if (input == null || input.isEmpty()) {
			return input;
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}

	@Override
	public MstCreateformDTO saveForm(MstCreateformDTO dto) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			MstCreateformEntity formEntity = new MstCreateformEntity();
			formEntity.setTitletxt(dto.getTitletxt());
			formEntity.setAliasname(dto.getAliasname());
			formEntity.setModule(dto.getModule());
			formEntity.setCharacteristic(dto.getCharacteristic());
			formEntity.setSubcharacteristic(dto.getSubcharacteristic());
			formEntity.setRecurrence(dto.getRecurrence());
			formEntity.setStartmonth(dto.getStartmonth());
			formEntity.setComplianceperiod(dto.getComplianceperiod());
			formEntity.setEffectivedate(dto.getEffectivedate());
			formEntity.setTextdes(dto.getTextdes());
			formEntity.setActive(dto.getActive());
			formEntity.setCreatedby(createdby);
			createformRepository.save(formEntity);

			Integer id = createformRepository.formId();
			/* Integer id = (tempId != null) ? tempId + 1 : 1 */;
			ObjectMapper objectMapper = new ObjectMapper();

			List<QueformEntity> questions = dto.getQueData().stream().map(qDto -> {
				QueformEntity qData = new QueformEntity();
				qData.setFid(id);
				qData.setQueName(qDto.getQueName());
				qData.setQueDes(qDto.getQueDes());
				qData.setQueType(qDto.getQueType());
				qData.setQuereq(qDto.getQuereq());
				qData.setCreatedby(createdby);

				try {
					// Convert List<String> to JSON string
					qData.setQuestions(objectMapper.writeValueAsString(qDto.getQuestions()));
				} catch (Exception e) {
					e.printStackTrace();
				}

				return qData;
			}).collect(Collectors.toList());

			queRepository.saveAll(questions);
			dto.addMessage("200", "Save form data");
			return dto;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error while saving form data");
			return dto;
		}
	}

}
