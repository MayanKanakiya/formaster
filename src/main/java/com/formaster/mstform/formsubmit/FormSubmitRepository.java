package com.formaster.mstform.formsubmit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FormSubmitRepository extends JpaRepository<FormSubmitEntity, Integer> {

	@Modifying
	@Query(value = "update form_submit_entity set issubmited=1 where fid=?1 and submitedby=?2", nativeQuery = true)
	int setFormSubmit(int fid, int submitedby);

	@Query(value = "select a.submitedon,f.fid,f.titletxt,u.fname,u.lname from mst_createform_entity as f join form_submit_entity as a on a.fid=f.fid join user_entity as u on u.id=?1 where f.isdelete=0;", nativeQuery = true)
	List<Object[]> getSubmitFData(int submitedby);
}
