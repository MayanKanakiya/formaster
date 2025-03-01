package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class mst_subcharacteristicDTO {
	private int subCharacteristicId;
	private String subCharacteristicName;
	private int characteristicId;
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

	public mst_subcharacteristicDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public mst_subcharacteristicDTO(String subCharacteristicName) {
		super();
		this.subCharacteristicName = subCharacteristicName;
	}
	
}
