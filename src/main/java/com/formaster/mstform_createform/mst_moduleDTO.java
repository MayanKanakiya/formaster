package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class mst_moduleDTO {

	private int moduleId;
	private String moduleName;
	private String moduleShortName;
	private int active;
	private int createdBy;
	private Timestamp createdOn;
	private int modifyBy;
	private Timestamp modifyOn;
	private String ipAddress;
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

	public mst_moduleDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public mst_moduleDTO(String moduleName) {
		super();
		this.moduleName = moduleName;
	}

}
