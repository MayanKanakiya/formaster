package com.formaster.mstform_createform;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MstCreateformRepository extends JpaRepository<MstCreateformEntity, Integer> {

	@Query(value = "select max(fid) from mst_createform_entity", nativeQuery = true)
	Integer formId();

}
