package com.formaster.user;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

	private int id;
	private String fname;
	private String lname;
	private String email;
	private String pass;
	private String cno;
	private String gender;
	private String validfrom;
	private String validto;
	private String urole;
	private String image;
	private int createdby;
	private Timestamp createdon;
	private int modifyby;
	private Timestamp modifyon;
	private int active;
	private int isdelete;
	private Map<Boolean, String> message = new HashMap<>();

	public Map<Boolean, String> getMessage() {
		return message;
	}

	public void setMessage(Map<Boolean, String> message) {
		this.message = message;
	}

	public void addMessage(boolean success, String message) {
		this.message.put(success, message);
	}
}
