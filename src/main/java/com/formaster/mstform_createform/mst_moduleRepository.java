package com.formaster.mstform_createform;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface mst_moduleRepository extends JpaRepository<mst_module_entity, Integer> {

	@Query(value = "select modulename from mst_module_entity where 1=1", nativeQuery = true)
	List<mst_moduleDTO> getAllModuleData();

	@Query(value = "select char.characteristicname from mst_module_entity as m join mst_module_characteristics_mapping_entity as map on m.moduleid=map.moduleid join mst_characteristic_entity as char on map.characteristicid=char.characteristicid where m.modulename=?1", nativeQuery = true)
	List<mst_characteristicDTO> getCharacteristicByModule(String moduleName);

	@Query(value = "select sub.subcharacteristicname from mst_subcharacteristic_entity as sub join mst_characteristic_entity as char on sub.characteristicid=char.characteristicid where char.characteristicname=?1", nativeQuery = true)
	List<mst_subcharacteristicDTO> getSubCharacteristicByCharacteristic(String characteristicName);

	@Query(value = "select recurrancename from mst_recurrance_entity where 1=1", nativeQuery = true)
	List<mst_recurranceDTO> getAllRecurrance();

	@Query(value = "select monthname from mst_month_entity where 1=1", nativeQuery = true)
	List<mst_monthDTO> getAllMonth();
}
