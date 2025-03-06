package com.formaster.mstform_createform;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;

public interface MstCreateformRepository extends JpaRepository<MstCreateformEntity, Integer> {

	@Query(value = "select max(fid) from mst_createform_entity", nativeQuery = true)
	Integer formId();

	@Query(value = "select fid, titletxt,active from mst_createform_entity where isdelete=0", nativeQuery = true)
	List<MstCreateformDTO> getAllFormData();

	@Modifying
	@Transactional
	@Query(value = "update mst_createform_entity set isdelete=1 where fid=?1", nativeQuery = true)
	int deleteFData(int fid);

	@Modifying
	@Transactional
	@Query(value = "update queform_entity set isdelete=1 where fid=?1", nativeQuery = true)
	int deleteQData(int fid);

}
