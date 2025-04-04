package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class mst_recurranceDTO {
	private int recurranceId;
	private String recurranceName;
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

	public mst_recurranceDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public mst_recurranceDTO(int recurranceId, String recurranceName) {
		super();
		this.recurranceId = recurranceId;
		this.recurranceName = recurranceName;
	}
}
