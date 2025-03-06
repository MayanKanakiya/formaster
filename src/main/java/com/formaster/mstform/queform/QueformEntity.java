package com.formaster.mstform.queform;

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
public class QueformEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length = 8, nullable = false)
	private int quelabel;
	@Column(length = 8, nullable = false)
	private int fid;
	@Column(nullable = false, length = 64)
	private String queName;
	@Column(nullable = false, length = 64)
	private String queDes;
	@Column(nullable = false, length = 32)
	private String queType;
	@Column(nullable = false, length = 8)
	private int quereq;
	@Column(columnDefinition = "TEXT")
	private String questions;
	@Column(nullable = false, length = 8)
	private int createdby;
	@CreationTimestamp
	private Timestamp createdon;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int modifyby;
	@Column(nullable = true)
	private Timestamp modifyon;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int active;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int isdelete;
}
