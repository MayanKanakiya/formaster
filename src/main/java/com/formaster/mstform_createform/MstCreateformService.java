package com.formaster.mstform_createform;

import java.util.List;

public interface MstCreateformService {

	public MstCreateformDTO saveForm(MstCreateformDTO formCreateformDTO);

	public MstCreateformDTO deleteFormData(MstCreateformDTO formDTO, int id);

	public MstCreateformDTO updateFormData(MstCreateformDTO createformDTO, int id);

	public List<MstCreateformDTO> fetchFormDataById(int id);
}
