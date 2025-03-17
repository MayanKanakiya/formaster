package com.formaster.mstform.formsubmit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FormSubmitRepository extends JpaRepository<FormSubmitEntity, Integer> {

	@Modifying
	@Query(value = "update form_submit_entity set issubmited=1 where fid=?1 and submitedby=?2", nativeQuery = true)
	int setFormSubmit(int fid, int submitedby);
}
