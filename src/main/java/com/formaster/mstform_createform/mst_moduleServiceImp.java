package com.formaster.mstform_createform;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class mst_moduleServiceImp implements mst_moduleService {

	@Autowired
	mst_moduleRepository moduleRepository;

	@Override
	public List<mst_moduleDTO> getAllModuleNameData() {
		List<mst_moduleDTO> moduleData = new ArrayList<>();
		try {
			List<mst_moduleDTO> userDataList = moduleRepository.getAllModuleData();
			for (mst_moduleDTO mData : userDataList) {
				mst_moduleDTO getAllModuleData = new mst_moduleDTO(mData.getModuleName());
				moduleData.add(getAllModuleData);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return moduleData;
	}

}
