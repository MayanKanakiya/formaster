package com.formaster.mstform.formsubmit;

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
public class FormSubmitEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sid;
	@Column(nullable = false, length = 8)
	private int submitedby;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int issubmited;
	@Column(nullable = false, length = 8)
	private int fid;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int urole;
	@CreationTimestamp
	private Timestamp submitedon;
}
