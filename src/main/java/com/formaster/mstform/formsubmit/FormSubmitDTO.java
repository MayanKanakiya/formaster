package com.formaster.mstform.formsubmit;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FormSubmitDTO {

	private int sid;
	private int submitedby;
	private int fid;
	private Timestamp submitedon;
	private int urole;
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
