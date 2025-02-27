package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MstCreateformDTO {
	private int fid;
	private String titletxt;
	private String aliasname;
	private int module;
	private int subcharacteristic;
	private int recurrence;
	private int startmonth;
	private int complianceperiod;
	private String effectivedate;
	private String textdes;
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
}
