package com.formaster.user;

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
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(length = 5)
	private int id;
	@Column(nullable = false, length = 28)
	private String fname;
	@Column(nullable = false, length = 28)
	private String lname;
	@Column(nullable = false, length = 64)
	private String email;
	@Column(nullable = false, length = 255)
	private String pass;
	@Column(nullable = true, length = 10)
	private String cno;
	@Column(nullable = false, length = 8)
	private String gender;
	@Column(nullable = true, length = 28)
	private String validfrom;
	@Column(nullable = true, length = 28)
	private String validto;
	@Column(nullable = false, length = 8)
	private String urole;
	@Column(nullable = true, length = 255)
	private String image;
	@Column(nullable = false, length = 8)
	private int createdby;
	@CreationTimestamp
	private Timestamp createdon;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int modifyby;
	@Column(nullable = true)
	private int modifyon;
	@Column(nullable = false, length = 8)
	private int active;
	@Column(nullable = false, length = 8, columnDefinition = "int default 0")
	private int isdelete;

	
}
