package com.formaster.mstform_createform;

public interface MstCreateformService {

	public MstCreateformDTO saveForm(MstCreateformDTO formCreateformDTO);

	public MstCreateformDTO deleteFormData(MstCreateformDTO formDTO, int id);
}
