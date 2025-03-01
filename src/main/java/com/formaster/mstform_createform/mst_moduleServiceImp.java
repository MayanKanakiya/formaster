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

	@Override
	public List<mst_characteristicDTO> getCharacterisitcByModuleName(String moduleName) {
		List<mst_characteristicDTO> characteristicName = new ArrayList<>();
		try {
			List<mst_characteristicDTO> characteristicNameList = moduleRepository.getCharacteristicByModule(moduleName);
			for (mst_characteristicDTO charName : characteristicNameList) {
				mst_characteristicDTO getCharNameByModule = new mst_characteristicDTO(charName.getCharacteristicName());
				characteristicName.add(getCharNameByModule);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return characteristicName;
	}

	@Override
	public List<mst_subcharacteristicDTO> getSubCharacteristicByCharacteristicName(String characteristicName) {
		List<mst_subcharacteristicDTO> subcharacteristicName = new ArrayList<>();
		try {
			List<mst_subcharacteristicDTO> subCharacteristicNameList = moduleRepository
					.getSubCharacteristicByCharacteristic(characteristicName);
			for (mst_subcharacteristicDTO subCharName : subCharacteristicNameList) {
				mst_subcharacteristicDTO getSubCharNameByChar = new mst_subcharacteristicDTO(
						subCharName.getSubCharacteristicName());
				subcharacteristicName.add(getSubCharNameByChar);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return subcharacteristicName;
	}

	@Override
	public List<mst_recurranceDTO> getAllRecurranceData() {
		List<mst_recurranceDTO> recurranceData = new ArrayList<>();
		try {
			List<mst_recurranceDTO> userRecurranceList = moduleRepository.getAllRecurrance();
			for (mst_recurranceDTO rData : userRecurranceList) {
				mst_recurranceDTO getAllRecurranceData = new mst_recurranceDTO(rData.getRecurranceName());
				recurranceData.add(getAllRecurranceData);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return recurranceData;
	}

	@Override
	public List<mst_monthDTO> getAllMonthData() {
		List<mst_monthDTO> monthData = new ArrayList<>();
		try {
			List<mst_monthDTO> userMonthList = moduleRepository.getAllMonth();
			for (mst_monthDTO mData : userMonthList) {
				mst_monthDTO getAllMonthData = new mst_monthDTO(mData.getMonthName());
				monthData.add(getAllMonthData);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return monthData;
	}
}
