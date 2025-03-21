package com.formaster.mstform.formsubmit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FormSubmitRepository extends JpaRepository<FormSubmitEntity, Integer> {

	@Modifying
	@Query(value = "update form_submit_entity set issubmited=1 where fid=?1 and submitedby=?2", nativeQuery = true)
	int setFormSubmit(int fid, int submitedby);

	@Query(value = "select sf.submitedon,f.fid,f.titletxt,u.fname,u.lname from mst_createform_entity as f join form_submit_entity as sf on sf.fid=f.fid join user_entity as u on sf.submitedby = u.id where sf.submitedby=?1 and sf.issubmited=1", nativeQuery = true)
	List<Object[]> getSubmitFData(int uid);

	@Query(value = "select f.titletxt,f.textdes,q.que_name,q.quereq,q.que_des,a.answers from mst_createform_entity as f join queform_entity as q on f.fid=q.fid join answer_form_entity as a on a.quelabel=q.quelabel where f.fid=?1 and f.isdelete=0 and q.isdelete=0", nativeQuery = true)
	List<Object[]> getFormSubmitedAnswer(int fid);
}
