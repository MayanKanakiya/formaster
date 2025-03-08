package com.formaster.mstform.queform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueformDTO {
	private Integer quelabel;
	private int fid;
	private String queName;
	private String queDes;
	private String queType;
	private int quereq;
	 private List<String> questions;
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

	public QueformDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public QueformDTO(int quelabel, String queName, String queDes, String queType, int quereq, List<String> questions) {
		super();
		this.quelabel = quelabel;
		this.queName = queName;
		this.queDes = queDes;
		this.queType = queType;
		this.quereq = quereq;
		this.questions = questions;
	}
	
}
