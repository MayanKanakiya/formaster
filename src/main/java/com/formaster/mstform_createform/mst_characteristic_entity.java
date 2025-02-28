package com.formaster.mstform_createform;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class mst_characteristic_entity {
	@Id
	@Column(name = "characteristicid", nullable = false)
	private int characteristicId;

	@Column(name = "characteristicname", nullable = false, length = 128)
	private String characteristicName;

	@Column(name = "active", nullable = false)
	private int active;

	@Column(name = "createdby", nullable = false)
	private int createdBy;

	@Column(name = "createon", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp createOn;

	@Column(name = "modifyby")
	private int modifyBy;

	@Column(name = "modifyon")
	private Timestamp modifyOn;

	@Column(name = "ipaddress", length = 16)
	private String ipAddress;
}
