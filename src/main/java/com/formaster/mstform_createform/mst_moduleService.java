package com.formaster.mstform_createform;

import java.util.List;

public interface mst_moduleService {

	public List<mst_moduleDTO> getAllModuleNameData();

	public List<mst_characteristicDTO> getCharacterisitcByModuleName(String moduleName);

	public List<mst_subcharacteristicDTO> getSubCharacteristicByCharacteristicName(String characteristicName);

	public List<mst_recurranceDTO> getAllRecurranceData();
	
	public List<mst_monthDTO> getAllMonthData();
}
