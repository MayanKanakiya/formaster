package com.formaster.mstform_createform;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MstCreateformServiceImp implements MstCreateformService {

	@Autowired
	MstCreateformRepository createformRepository;

	public static String capitalizeFirst(String input) {
		if (input == null || input.isEmpty()) {
			return input;
		}
		return input.substring(0, 1).toUpperCase() + input.substring(1);
	}

	@Override
	public List<MstCreateformDTO> getAllMstModuleData() {
		List<MstCreateformDTO> mstModuleData = new ArrayList<>();
		try {

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return mstModuleData;
	}
}
