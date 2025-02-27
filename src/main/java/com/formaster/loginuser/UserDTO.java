package com.formaster.loginuser;

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
	private int urole;
	private String image;
	private int createdby;
	private Timestamp createdon;
	private int modifyby;
	private Timestamp modifyon;
	private int active;
	private int isdelete;
	private Map<String, String> message = new HashMap<>();

	public Map<String, String> getMessage() {
		return message;
	}

	public void setMessage(Map<String, String> message) {
		this.message = message;
	}

	public void addMessage(String statusCode, String message) {
		this.message.put(statusCode, message);
	}

	public UserDTO() {
		super();
	}

	public UserDTO(int id, String fname, String lname, String email, String cno, String gender,
			String validfrom, String validto, int urole, String image, int createdby, Timestamp createdon, int modifyby,
			Timestamp modifyon, int active) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.cno = cno;
		this.gender = gender;
		this.validfrom = validfrom;
		this.validto = validto;
		this.urole = urole;
		this.image = image;
		this.createdby = createdby;
		this.createdon = createdon;
		this.modifyby = modifyby;
		this.modifyon = modifyon;
		this.active = active;
	}
}
