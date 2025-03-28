package com.formaster.mstform_createform;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class MstCreateformEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length = 8)
	private int fid;
	@Column(nullable = false, length = 64)
	private String titletxt;
	@Column(nullable = false, length = 64)
	private String aliasname;
	@Column(nullable = false, length = 8)
	private int module;
	@Column(nullable = false, length = 8)
	private int characteristic;
	@Column(nullable = false, length = 8)
	private int subcharacteristic;
	@Column(nullable = false, length = 8)
	private int recurrence;
	@Column(nullable = false, length = 8)
	private int startmonth;
	@Column(nullable = false, length = 8)
	private int complianceperiod;
	@Column(nullable = false, length = 16)
	private String effectivedate;
	@Column(nullable = false, length = 64)
	private String textdes;
	@Column(nullable = false, length = 8)
	private int createdby;
	@CreationTimestamp
	private Timestamp createdon;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int modifyby;
	@Column(nullable = true)
	private Timestamp modifyon;
	@Column(nullable = false, length = 8)
	private int active;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int isdelete;
}
