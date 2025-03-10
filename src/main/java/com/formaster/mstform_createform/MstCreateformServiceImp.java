package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.formaster.mstform.queform.QueFormRepository;
import com.formaster.mstform.queform.QueformDTO;
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

	@Override
	public MstCreateformDTO deleteFormData(MstCreateformDTO dto, int id) {
		try {
			int createdby = (int) session.getAttribute("currentLogin");
			if (createformRepository.deleteFData(id, createdby, new Timestamp(System.currentTimeMillis())) > 0) {
				createformRepository.deleteQData(id, createdby, new Timestamp(System.currentTimeMillis()));
				dto.addMessage("200", "Form data deleted successfully!!");
				return dto;
			} else {
				dto.addMessage("400", "Error while deleting form data");
				return dto;
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.addMessage("500", "Internal server error while checking duplication email");
			return dto;
		}
	}

	@Override
	public List<MstCreateformDTO> fetchFormDataById(int id) {
		List<Object[]> formDataListById = createformRepository.getAllFormDataById(id);
		Map<Integer, MstCreateformDTO> formMap = new LinkedHashMap<>();

		if (formDataListById.isEmpty()) {
			throw new NoSuchElementException("Form not found with id: " + id);
		}

		for (Object[] fData : formDataListById) {
			int fid = (int) fData[0];
			String titleTxt = (String) fData[1];
			String aliasName = (String) fData[2];
			int module = (int) fData[3];
			int characteristic = (int) fData[4];
			int subCharacteristic = (int) fData[5];
			int recurrence = (int) fData[6];
			int month = (int) fData[7];
			int compliancePeriod = (int) fData[8];
			String effectiveDate = (String) fData[9];
			int active = (int) fData[10];
			String textDes = (String) fData[11];
			Integer queLabel = fData[12] != null ? (Integer) fData[12] : null;
			String queName = (String) fData[13];
			String queDes = (String) fData[14];
			String queType = (String) fData[15];
			int queReq = (int) fData[16];
			String questionJsonString = (String) fData[17];

			MstCreateformDTO formDTO = formMap.computeIfAbsent(fid, k -> {
				MstCreateformDTO dto = new MstCreateformDTO();
				dto.setFid(fid);
				dto.setTitletxt(titleTxt);
				dto.setAliasname(aliasName);
				dto.setModule(module);
				dto.setCharacteristic(characteristic);
				dto.setSubcharacteristic(subCharacteristic);
				dto.setRecurrence(recurrence);
				dto.setStartmonth(month);
				dto.setComplianceperiod(compliancePeriod);
				dto.setEffectivedate(effectiveDate);
				dto.setActive(active);
				dto.setTextdes(textDes);
				dto.setQueData(new ArrayList<>());
				return dto;
			});

			if (queLabel != null) {
				Optional<QueformDTO> existingQuestion = formDTO.getQueData().stream()
						.filter(q -> q.getQuelabel().equals(queLabel)).findFirst();

				QueformDTO queDTO;
				if (existingQuestion.isPresent()) {
					queDTO = existingQuestion.get();
				} else {
					List<String> questions = new ArrayList<>();
					if (questionJsonString != null && !questionJsonString.isEmpty()) {
						ObjectMapper objectMapper = new ObjectMapper();
						try {
							questions = objectMapper.readValue(questionJsonString, new TypeReference<List<String>>() {
							});
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					queDTO = new QueformDTO(queLabel, queName, queDes, queType, queReq, questions);
					formDTO.getQueData().add(queDTO);
				}
			}
		}
		return new ArrayList<>(formMap.values());
	}
}
