package com.formaster.mstform_createform;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MstCreateformRepository extends JpaRepository<MstCreateformEntity, Integer> {

	@Query(value = "select modulename from mst_module where 1=1", nativeQuery = true)
	int populateDropdown();

}
