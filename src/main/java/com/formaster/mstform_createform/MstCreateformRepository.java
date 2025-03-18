package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;

public interface MstCreateformRepository extends JpaRepository<MstCreateformEntity, Integer> {

	@Query(value = "select max(fid) from mst_createform_entity", nativeQuery = true)
	Integer formId();

	@Query(value = "select fid, titletxt,active from mst_createform_entity where isdelete=0 and createdby=?1;", nativeQuery = true)
	List<MstCreateformDTO> getAllFormData(int uid);

	@Modifying
	@Transactional
	@Query(value = "update queform_entity set isdelete=1, modifyby=?2, modifyon=?3 where fid=?1", nativeQuery = true)
	int deleteQData(int fid, int modifyby, Timestamp modifyon);

	@Query(value = "select f.fid,f.titletxt,f.aliasname,f.module,f.characteristic,f.subcharacteristic,f.recurrence,f.startmonth,"
			+ "f.complianceperiod,f.effectivedate,f.active,f.textdes,q.quelabel,q.que_name,q.que_des,q.que_type,"
			+ "q.quereq,q.questions from mst_createform_entity as f join queform_entity as q on f.fid=q.fid where f.fid=?1 and f.isdelete=0 and q.isdelete=0", nativeQuery = true)
	List<Object[]> getAllFormDataById(int fid);
}
