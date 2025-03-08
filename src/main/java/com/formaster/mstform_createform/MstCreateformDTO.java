package com.formaster.mstform_createform;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.formaster.mstform.queform.QueformDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MstCreateformDTO {
	private int fid;
	private String titletxt;
	private String aliasname;
	private int module;
	private int characteristic;
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
	private List<QueformDTO> queData;
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

	public MstCreateformDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MstCreateformDTO(int fid, String titletxt, String aliasname, int module, int characteristic,
			int subcharacteristic, int recurrence, int startmonth, int complianceperiod, String effectivedate,
			int active, String textdes, List<QueformDTO> queData) {
		this.fid = fid;
		this.titletxt = titletxt;
		this.aliasname = aliasname;
		this.module = module;
		this.characteristic = characteristic;
		this.subcharacteristic = subcharacteristic;
		this.recurrence = recurrence;
		this.startmonth = startmonth;
		this.complianceperiod = complianceperiod;
		this.effectivedate = effectivedate;
		this.active = active;
		this.textdes = textdes;
		this.queData = queData;
	}

	public MstCreateformDTO(int fid, String titletxt, int active) {
		super();
		this.fid = fid;
		this.titletxt = titletxt;
		this.active = active;
	}

}
