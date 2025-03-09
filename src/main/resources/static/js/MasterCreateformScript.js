console.log("Master create form script running..")
const questionTable = document.getElementById("formquestion_datatable");
const queTableTbody = $("#formquestion_datatable tbody")

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

/*ID's selection for question modal*/
const quelabel = document.getElementById("quelabel");
const queName = document.getElementById("queName");
const queDes = document.getElementById("queDes");
const queAnswerType = document.getElementById("queAnswerType");
const reqans = document.getElementById("reqans");
const validatans = document.getElementById("validatans");
const singlechoicediv = document.getElementById("singlechoicediv");
const multichoicediv = document.getElementById("multichoicediv");
const singleSelectDiv = document.getElementById("singleSelectDiv");
const answerTypeFormat = document.getElementById("answerTypeFormat");
const saveBtnQueTable = document.getElementById("saveBtnQueTable");
const saveQueInDBTable = document.getElementById("saveQueInDBTable");
const cancelBtnQueInputFiled = document.getElementById("cancelBtnQueInputFiled");
const XQueModalBtn = document.getElementById("XQueModalBtn");

/*ID's selection for form*/
const formId = document.getElementById("formId");
const titleTxt = document.getElementById("titleTxt");
const aliasNameTxt = document.getElementById("aliasNameTxt");
const comPeriod = document.getElementById("comPeriod");
const date_from = document.getElementById("date_from");
const active = document.getElementById("active");
const cancelBtnFullForm = document.getElementById("cancelBtnFullForm");
const hiddenId = document.getElementById("hiddenId");
let activeChk = 0;
const textDes = document.getElementById("textDes");
//Below object for only available data for only question form
let queData;
//Below object for only available data for full create form
let formData;
let questionCounter = 1;
let queDataArray = [];
saveBtnQueTable.addEventListener("click", () => {
	if (queName.value.trim().length == 0) {
		alert("Please enter Question name");
		return;
	}
	if (!/^(?!\s)(?!.*\s{2,})[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+(?:\s[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/
		.test(queName.value)) {
		alert("Enter a valid question name without extra spaces at the beginning or end. Only one space is allowed between words.");
		queName.value = '';
		return;
	}
	if (queName.value.trim().length < 15) {
		alert("Question name more than 15 characters");
		return false;
	}
	if (queDes.value.trim().length == 0) {
		alert("Please enter Question description");
		return;
	}
	if (!/^(?!\s)(?!.*\s{2,})[A-Za-z0-9!@#$%^&*(),.?":{}|<>/-]+(?:\s[A-Za-z0-9!@#$%^&*(),.?":{}|<>/-]+)*$/
		.test(queDes.value)) {
		alert("Enter a valid question name without extra spaces at the beginning or end. Only one space is allowed between words.");
		queDes.value = '';
		return;
	}
	if (queDes.value.trim().length < 15) {
		alert("Question description more than 15 characters");
		return false;
	}
	if (queAnswerType.value === "0" || queAnswerType.value === "") {
		alert("Please select answer type");
		return;
	}
	if (queAnswerType.value === "3") {
		if (validatans.checked) {
			if (answerTypeFormat.value === "") {
				alert("Please select answer format type, because you checked validation answer format checked box.")
				return;
			}
		}
	}
	else if (queAnswerType.value === "4") {
		if (validatans.checked) {
			if (answerTypeFormat.value === "") {
				alert("Please select answer format type, because you checked validation answer format checked box.")
				return;
			}
		}
	}
	if (queAnswerType.value === "1") {
		console.log("Single Choice");

		let count = countOptions();

		if (count < 2) {
			alert("Please select at least two answer choices.");
			return;
		}
		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
	if (queAnswerType.value === "2") {
		console.log("Multiple Choice");
		let count = countMultiOptions();

		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
	if (queAnswerType.value === "5") {
		console.log("Single Select");

		let count = countSingleSelectOptions();

		if (count < 2) {
			alert("Please select at least two answer choices.");
			return;
		}
		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
	if (queAnswerType.value === "6") {
		console.log("Multi Select");
		let count = countMultiSelectOptions();

		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
	//This validation for dynamically add input filed
	function validateChoiceInputs(selector, inputClass) {
		let isValid = true;

		$(selector).each(function(index) {
			let inputField = $(this).find(inputClass).val();

			if (inputField.length == 0) {
				alert(`${index + 1} Question input field cannot be empty`);
				isValid = false;
				return false;
			} else if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(inputField)) {
				alert(`${index + 1} Question input field should not accept white spaces`);
				isValid = false;
				return false;
			} else if (inputField.length < 2) {
				alert(`${index + 1} Question not aleast 2 characters`);
				isValid = false;
				return false;
			} else if (inputField.length > 15) {
				alert(`${index + 1} Question cannot have more than 15 characters`);
				isValid = false;
				return false;
			}
		});

		return isValid;
	}
	if (queAnswerType.value === "1") {
		if (!validateChoiceInputs(".singleChoiceTR", ".singleChoiceInput")) return;
	}
	if (queAnswerType.value === "2") {
		if (!validateChoiceInputs(".multiChoiceTR", ".multiChoiceInput")) return;
	}
	if (queAnswerType.value === "5") {
		if (!validateChoiceInputs(".singleSelectTR", ".singleSelectInput")) return;
	}
	if (queAnswerType.value === "6") {
		if (!validateChoiceInputs(".multiSelectTR", ".multiSelectInput")) return;
	}

	let reqanschk = 0;
	if (reqans.checked) {
		reqanschk = 1;
	}
	queData = {
		quelabel: quelabel.value,
		queName: queName.value,
		queDes: queDes.value,
		queType: queAnswerType.value,
		quereq: reqanschk,
	}
	if (queAnswerType.value === "1") {
		queData["questions"] = [];
		$(".singleChoiceTR").each(function(index) {
			queData["questions"].push($(this).find(".singleChoiceInput").val());
		});
	}
	if (queAnswerType.value === "2") {
		queData["questions"] = [];
		$(".multiChoiceTR").each(function(index) {
			queData["questions"].push($(this).find(".multiChoiceInput").val());
		});
	}
	if (queAnswerType.value === "5") {
		queData["questions"] = [];
		$(".singleSelectTR").each(function(index) {
			queData["questions"].push($(this).find(".singleSelectInput").val());
		});
	}
	if (queAnswerType.value === "6") {
		queData["questions"] = [];
		$(".multiSelectTR").each(function(index) {
			queData["questions"].push($(this).find(".multiSelectInput").val());
		});
	}
	if (queAnswerType.value === "3" || validatans.checked) {
		queData["questions"] = [];
		queData["questions"].push(answerTypeFormat.value);
	} else if (queAnswerType.value === "3") {
		queData["questions"].push(0);
	}

	if (queAnswerType.value === "4" || validatans.checked) {
		queData["questions"] = [];
		queData["questions"].push(answerTypeFormat.value);
	} else if (queAnswerType.value === "3") {
		queData["questions"].push(0);
	}
	if (queAnswerType.value === "7") {
		queData["questions"] = [];
		queData["questions"].push(0);
	}

	if ($("#formquestion_datatable tbody tr").length > 0) {
		$("#formquestion_datatable tbody td.dataTables_empty:first").remove();
	}
	let newRow = `	<tr data-quedata='${JSON.stringify(queData)}'>
					<td>${queData.quelabel}</td>
					<td>${queData.queName}</td>
					<td>${queData.queAnswerType == 1 ? "Single Choice" : queData.queAnswerType == 2 ? "Multi Choice" : queData.queAnswerType == 3 ? "Single Textbox" : queData.queAnswerType == 4 ? "Multiline Textbox" : queData.queAnswerType == 5 ? "Single select dropdown" : queData.queAnswerType == 6 ? "Multi select dropdown" : "Date"}</td>
					<td>${queData.quereq == 1 ? "Yes" : "No"}</td>
					<td class="text-center"><span data-toggle="modal"
						data-target=".addformquestion"><a
							href="javascript:void(0)" data-toggle="tooltip"
							data-placement="bottom" data-original-title="Edit"
							class="text-success fa-size queTableEditBtn"><i
								class="fa fa-pencil"></i></a></span> <span
						class="delete-user-alert"><a
							href="javascript:void(0)" class="text-danger fa-size queTableDeleteBtn"
							data-toggle="tooltip" data-placement="bottom"
							data-original-title="Delete"><i
								class="fa fa-trash"></i></a></span></td>
						</tr>`;

	queTableTbody.append(newRow);
	queDataArray.push(queData)
	$('.modal').modal('hide');
	clearInputFiledQueModal();
	questionCounter++;
	/*console.log(queData);*/
});
queName.addEventListener("input", () => {
	if (queName.value.trim().length > 30) {
		queName.value = queName.value.slice(0, 30);
	}
});
queDes.addEventListener("input", () => {
	if (queDes.value.trim().length > 50) {
		queDes.value = queDes.value.slice(0, 50);
	}
});
/*This below code automcatically add question number when click add buttton*/
function getNextQuestionNumber() {
	return "Q" + questionCounter;
}
$(".addformquestion").on("show.bs.modal", function() {
	let nextQuestion = getNextQuestionNumber();
	$("input[placeholder='Enter Your Question Label in English']").val(nextQuestion);
});
cancelBtnQueInputFiled.addEventListener("click", () => {
	clearInputFiledQueModal();
});
XQueModalBtn.addEventListener("click", () => {
	clearInputFiledQueModal();
});
function clearInputFiledQueModal() {
	queName.value = "";
	queDes.value = "";
	if (queAnswerType.value == "1") {
		singlechoicediv.style.display = "none";
	} else if (queAnswerType.value == "2") {
		multichoicediv.style.display = "none";
	} else if (queAnswerType.value == "3") {
		document.querySelectorAll(".hideCheckAnswerFormat").forEach(el => {
			el.style.display = "none";
		});
	} else if (queAnswerType.value == "4") {
		document.querySelectorAll(".hideCheckAnswerFormat").forEach(el => {
			el.style.display = "none";
		});
	} else if (queAnswerType.value == "5") {
		singleSelectDiv.style.display = "none";
	}
	queAnswerType.value = "";
	$('.selectpicker').selectpicker('refresh');
}
/*main form validation start here*/
saveQueInDBTable.addEventListener("click", () => {
	if (titleTxt.value.trim().length == 0) {
		alert("Please enter form title");
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(titleTxt.value)) {
		alert("Enter a valid title text without extra spaces at the beginning or end. Only one space is allowed between words.");
		titleTxt.value = '';
		return;
	}
	if (titleTxt.value.trim().length < 15) {
		alert("Title text not more than 15 characters");
		return;
	}
	if (aliasNameTxt.value.trim().length == 0) {
		alert("Please enter alias name")
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(aliasNameTxt.value)) {
		alert("Enter a valid title text without extra spaces at the beginning or end. Only one space is allowed between words.");
		aliasNameTxt.value = '';
		return;
	}
	if (aliasNameTxt.value.trim().length < 5) {
		alert("Alias name not more than 5 characters");
		return;
	}
	if (moduleDropdown.value === "0") {
		alert("Please select module");
		return;
	}
	if (characteristicDropdown.value === "0") {
		alert("Please select characteristic");
		return;
	}
	if (subcharacteristicDropdown.value === "0") {
		alert("Please select subcharacteristic");
		return;
	}
	if (recurranceDropdown.value === "0") {
		alert("Please select recurrance");
		return;
	}
	if (monthDropdown.value === "0") {
		alert("Please select month");
		return;
	}
	if (comPeriod.value.trim().length == 0) {
		alert("Please select compilance month");
		return;
	}
	if (!/^\d{2}$/.test(comPeriod.value)) {
		alert("Please enter month like 01 or 12.");
		comPeriod.value = '';
		return;
	}
	if (date_from.value.trim().length == 0) {
		alert("Please enter effective date. Date format should be DD/MM/YYYY.");
		return;
	}
	if (date_from.value.trim().length > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(date_from.value)) {
			alert("Invalid date format. Please use DD/MM/YYYY.");
			date_from.value = '';
			return false;
		}
	}
	if (active.checked) {
		activeChk = 1;
	}
	if (textDes.value.trim().length == 0) {
		alert("Please select text description");
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(textDes.value)) {
		alert("Enter a valid text description without extra spaces at the beginning or end. Only one space is allowed between words.");
		textDes.value = '';
		return;
	}
	if (textDes.value.trim().length < 10) {
		alert("Text description not more than 5 characters");
		return;
	}
	if ($("#formquestion_datatable tbody tr.odd").length > 0 &&
		$("#formquestion_datatable tbody tr.odd").nextAll("tr").length == 0) {
		alert("Please enter at least one question");
	} else {
		formData = {
			titletxt: titleTxt.value,
			aliasname: aliasNameTxt.value,
			module: moduleDropdown.value,
			characteristic: characteristicDropdown.value,
			subcharacteristic: subcharacteristicDropdown.value,
			recurrence: recurranceDropdown.value,
			startmonth: monthDropdown.value,
			complianceperiod: comPeriod.value,
			effectivedate: date_from.value,
			textdes: textDes.value,
			active: activeChk,
			queData: queDataArray
		};
		console.log(formData);
		clearInputFiledCreateForm()
		if (hiddenId.value.trim().length == 0) {
			$.ajax({
				url: "/saveForm",
				method: 'POST',
				data: JSON.stringify(formData),
				contentType: "application/json",
				beforeSend: function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success: function(response) {
					console.log(response)
					alert("Form is save in our database");
				},
				error: function(response) {
					if (response.status === 400) {
						const errorResponse = JSON.parse(response.responseText);
						alert(errorResponse.message);
					} else if (response.status === 500) {
						alert("Server error occurred while saving create form.");
					}
				}
			});
		} else {

		}
	}
});
titleTxt.addEventListener("input", () => {
	if (titleTxt.value.trim().length > 25) {
		titleTxt.value = titleTxt.value.slice(0, 25);
	}
});
aliasNameTxt.addEventListener("input", () => {
	if (aliasNameTxt.value.trim().length > 10) {
		aliasNameTxt.value = aliasNameTxt.value.slice(0, 25)
	}
})
date_from.addEventListener('input', () => {
	if (!/^[\d\/]*$/.test(date_from.value)) {
		date_from.value = date_from.value.slice(0, -1);
	}
});
textDes.addEventListener("input", () => {
	if (textDes.value.trim().length > 50) {
		textDes.value = textDes.value.slice(0, 50);
	}
});
comPeriod.addEventListener('input', () => {
	if (!/^[0-9]+$/.test(comPeriod.value)) {
		comPeriod.value = comPeriod.value.slice(0, -1);
	}
});
$('.deleteFormBtn').on('click', function() {
	const uid = $(this).data('id');
	if (confirm("Are you sure want to delete data?")) {
		$.ajax({
			url: `/deletefdata/${uid}`,
			method: 'DELETE',
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success: function(response) {
				console.log(response.message);
				$(`#row-${uid}`).remove();
				alert("Form data deleted successfully!!");
				window.location.href = '/master-form';
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					alert(errorResponse.message);
				} else if (response.status === 500) {
					alert("Server error occurred while deleting form data. Try again later.");
				}
			}
		});
	}
});
$('.editFormBtn').on('click', function() {
	const uid = $(this).data('id');
	$.ajax({
		url: `/fetchFData/${uid}`,
		method: 'POST',
		contentType: 'application/json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			console.log(response);
			if (response.length > 0) {
				let formData = response[0];
				hiddenId.value = formData.fid;
				formId.value = "FORM-" + formData.fid;
				titleTxt.value = formData.titletxt;
				aliasNameTxt.value = formData.aliasname;
				setTimeout(() => {
					$('#moduleDropdown').val(formData.module).trigger('change');
					$('#recurranceDropdown').val(formData.recurrence).trigger('change');
					$('#monthDropdown').val(formData.startmonth).trigger('change');
					$('.selectpicker').selectpicker('refresh');
					charDropdown(moduleDropdown.options[moduleDropdown.selectedIndex]?.text || "");
					setTimeout(() => {
						for (let option of characteristicDropdown.options) {
							if (option.value == formData.characteristic) {
								option.selected = true;
								$('.selectpicker').selectpicker('refresh');
								break;
							}
						}
						subCharDropdown(characteristicDropdown.options[characteristicDropdown.selectedIndex]?.text || "")
						setTimeout(() => {
							for (let option of subcharacteristicDropdown.options) {
								if (option.value == formData.subcharacteristic) {
									option.selected = true;
									$('.selectpicker').selectpicker('refresh');
									break;
								}
							}
						}, 300);
					}, 300);
				}, 200);
				comPeriod.value = formData.complianceperiod;
				date_from.value = formData.effectivedate;
				if (formData.active == 1) {
					active.checked = true;
				} else {
					active.checked = false;
				}
				textDes.value = formData.textdes;
				if ($("#formquestion_datatable tbody tr").length > 0) {
					$("#formquestion_datatable tbody td.dataTables_empty:first").remove();
				}
				formData.queData.forEach((que, index) => {
					let row = `<tr data-quedata='${JSON.stringify(que)}'>
									<td>Q${index + 1}</td>
									<td>${que.queName}</td>
									<td>${que.queType == 1 ? "Single Choice" : que.queType == 2 ? "Multi Choice" : que.queType == 3 ? "Single Textbox" : que.queType == 4 ? "Multiline Textbox" : que.queType == 5 ? "Single select dropdown" : que.queType == 6 ? "Multi select dropdown" : "Date"}</td>
									<td>${que.quereq == 1 ? "Yes" : "No"}</td>
									<td class="text-center"><span data-toggle="modal"
										data-target=".addformquestion"><a
											href="javascript:void(0)" data-toggle="tooltip"
											data-placement="bottom" data-original-title="Edit"
											class="text-success fa-size queTableEditBtn"><i
												class="fa fa-pencil"></i></a></span> <span
										class="delete-user-alert"><a
											href="javascript:void(0)" class="text-danger fa-size queTableDeleteBtn"
											data-toggle="tooltip" data-placement="bottom"
											data-original-title="Delete"><i
												class="fa fa-trash"></i></a></span></td>
										</tr>`;
					queTableTbody.append(row);
				});
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred while fetching form data.");
			}
		}
	});
});
$(document).on("hide.bs.modal", ".addformquestion", function() {
	clearInputFiledQueModal();
});
$(document).on('click', '.queTableDeleteBtn', function() {
	alert("Cliked que table delete button");
});
$(document).on('click', '.queTableEditBtn', function() {
	let row = $(this).closest("tr");
	let queEditData = JSON.parse(row.attr("data-quedata"));
	console.log(queEditData);
	setTimeout(() => {
		$("#quelabel").val(queEditData.quelabel);
	}, 100);
	$("#queName").val(queEditData.queName);
	$("#queDes").val(queEditData.queDes);
	if (queEditData.queType == "1") {
		$("#queAnswerType").val("1").trigger("change");
	} else if (queEditData.queType == "2") {
		$("#queAnswerType").val("2").trigger("change");
	} else if (queEditData.queType == "3") {
		$("#queAnswerType").val("3").trigger("change");
	} else if (queEditData.queType == "4") {
		$("#queAnswerType").val("4").trigger("change");
	} else if (queEditData.queType == "5") {
		$("#queAnswerType").val("5").trigger("change");
	} else if (queEditData.queType == "6") {
		$("#queAnswerType").val("6").trigger("change");
	} else if (queEditData.queType == "7") {
		$("#queAnswerType").val("7").trigger("change");
	}
	if (queEditData.quereq == 1) {
		reqans.checked = true;
	} else {
		reqans.checked = false;
	}
});
cancelBtnFullForm.addEventListener("click", () => {
	clearInputFiledCreateForm();
});
function clearInputFiledCreateForm() {
	titleTxt.value = '';
	aliasNameTxt.value = '';
	moduleDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	characteristicDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	subcharacteristicDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	recurranceDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	monthDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	comPeriod.value = '';
	date_from.value = '';
	textDes.value = '';
	queTableTbody.empty();
	if ($("#formquestion_datatable tbody").length > 0) {
		$("#formquestion_datatable tbody").append("<tr><td valign='top' colspan='5' class='dataTables_empty'>No data available in table</td></tr>");
	}
	questionCounter = 1;
}
