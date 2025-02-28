package com.formaster.mstform_createform;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface mst_moduleRepository extends JpaRepository<mst_module_entity, Integer> {

	@Query(value = "select modulename from mst_module_entity where 1=1", nativeQuery = true)
	List<mst_moduleDTO> getAllModuleData();
}
