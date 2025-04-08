package com.formaster.mstform.anwerform;

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
public class AnswerFormEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length = 8)
	private int answerid;
	@Column(length = 8)
	private int quelabel;
	@Column(columnDefinition = "TEXT")
	private String answers;
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
	private int urole;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int isdelete;

}
