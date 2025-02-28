package com.formaster.mstform_createform;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class mst_module_entity {
	@Id
	@Column(name = "moduleid", nullable = false)
	private int moduleId;

	@Column(name = "modulename", length = 128, nullable = false)
	private String moduleName;

	@Column(name = "moduleshortname", length = 2, nullable = false)
	private String moduleShortName;

	@Column(name = "active")
	private Integer active;

	@Column(name = "createdby", nullable = false)
	private int createdBy;

	@Column(name = "createdon", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp createdOn;

	@Column(name = "modifyby")
	private Integer modifyBy;

	@Column(name = "modifyon")
	private Timestamp modifyOn;

	@Column(name = "ipaddress", length = 16)
	private String ipAddress;

}
