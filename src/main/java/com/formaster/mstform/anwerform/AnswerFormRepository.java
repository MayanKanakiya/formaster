package com.formaster.mstform.anwerform;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.formaster.mstform_createform.MstCreateformDTO;

public interface AnswerFormRepository extends JpaRepository<AnswerFormEntity, Integer> {

	@Query(value = "select f.fid,f.titletxt from mst_createform_entity as f left join form_submit_entity as sf on f.fid=sf.fid and sf.submitedby=?1 and sf.issubmited=1 where sf.fid is null and f.isdelete=0", nativeQuery = true)
	List<MstCreateformDTO> getAllFormDataById(int uid);

}
