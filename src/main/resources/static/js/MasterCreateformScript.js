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
const multiSelectDiv = document.getElementById("multiSelectDiv");
const datePicker = document.getElementById("datePicker");
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
const moveBackBtn = document.getElementById("moveBackBtn");
const hiddenId = document.getElementById("hiddenId");
let activeChk = 0;
const textDes = document.getElementById("textDes");

/*ID's selection for preview question*/
const previewFtitle = document.getElementById("previewFtitle");
const previewFDes = document.getElementById("previewFDes");
const previewQueBody = $("#all_question_preview .modal-body");
//Below object for only available data for only question form
let queData;
let editingRow = null;
//Below object for only available data for full create form
let formData;
let allQueDataArray = [];
let allEditsaveQueArray = [];
saveBtnQueTable.addEventListener("click", () => {
	if (queName.value.trim().length == 0) {
		showAlertFailure('Please enter Question name');
		return;
	}
	if (!/^(?!\s)(?!.*\s{2,})[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(queName.value)) {
		showAlertFailure('Allow only characters and only one space is allowed between words.');
		queName.value = '';
		return;
	}
	if (queName.value.trim().length < 5) {
		showAlertFailure('Question name more than 5 characters');
		return false;
	}
	if (queDes.value.trim().length == 0) {
		showAlertFailure('Please enter Question description');
		return;
	}
	if (!/^(?!\s)(?!.*\s{2,})[A-Za-z0-9!@#$%^&*(),.?":{}|<>/-]+(?:\s[A-Za-z0-9!@#$%^&*(),.?":{}|<>/-]+)*$/
		.test(queDes.value)) {
		showAlertFailure('Enter a valid question name without extra spaces at the beginning or end. Only one space is allowed between words.');
		queDes.value = '';
		return;
	}
	if (queDes.value.trim().length < 5) {
		showAlertFailure('Question description more than 5 characters');
		return false;
	}
	if (queAnswerType.value === "0" || queAnswerType.value === "") {
		showAlertFailure('Please select answer type');
		return;
	}
	if (queAnswerType.value === "3") {
		if (validatans.checked) {
			if (answerTypeFormat.value === "") {
				showAlertFailure('Please select answer format type, because you checked validation answer format checked box.')
				return;
			}
		}
	}
	else if (queAnswerType.value === "4") {
		if (validatans.checked) {
			if (answerTypeFormat.value === "") {
				showAlertFailure('Please select answer format type, because you checked validation answer format checked box.')
				return;
			}
		}
	}
	if (queAnswerType.value === "1") {
		console.log("Single Choice");

		let count = countOptions();

		if (count < 2) {
			showAlertFailure('Please select at least two answer choices.');
			return;
		}
		if (count > 4) {
			showAlertFailure('Only 4 answer choices are allowed.');
			return;
		}
	}
	if (queAnswerType.value === "2") {
		console.log("Multiple Choice");
		let count = countMultiOptions();

		if (count > 4) {
			showAlertFailure('Only 4 answer choices are allowed.');
			return;
		}
	}
	if (queAnswerType.value === "5") {
		console.log("Single Select");

		let count = countSingleSelectOptions();

		if (count < 2) {
			showAlertFailure('Please select at least two answer choices.');
			return;
		}
		if (count > 4) {
			showAlertFailure('Only 4 answer choices are allowed.');
			return;
		}
	}
	if (queAnswerType.value === "6") {
		console.log("Multi Select");
		let count = countMultiSelectOptions();

		if (count > 4) {
			showAlertFailure('Only 4 answer choices are allowed.');
			return;
		}
	}
	//This validation for dynamically add input filed
	function validateChoiceInputs(selector, inputClass) {
		let isValid = true;

		$(selector).each(function(index) {
			let inputField = $(this).find(inputClass).val();

			if (inputField.length == 0) {
				showAlertFailure(`${index + 1} Question input field cannot be empty`);
				isValid = false;
				return false;
			} else if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>+\-]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>+\-]+)*$/
				.test(inputField)) {
				showAlertFailure(`${index + 1} Question input field should not accept white spaces`);
				isValid = false;
				return false;
			} else if (inputField.length < 2) {
				showAlertFailure(`${index + 1} Question not aleast 2 characters`);
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
	if (editingRow) {
		editingRow.attr("data-quedata", JSON.stringify(queData));
		editingRow.find("td:eq(0)").text(queData.quelabel);
		editingRow.find("td:eq(1)").text(queData.queName);
		editingRow.find("td:eq(2)").text(
			queData.queType == 1 ? "Single Choice" :
				queData.queType == 2 ? "Multi Choice" :
					queData.queType == 3 ? "Single Textbox" :
						queData.queType == 4 ? "Multiline Textbox" :
							queData.queType == 5 ? "Single select dropdown" :
								queData.queType == 6 ? "Multi select dropdown" : "Date"
		);
		editingRow.find("td:eq(3)").text(queData.quereq == 1 ? "Yes" : "No");
		editingRow = null;
	} else {
		let newRow = `	<tr data-quedata='${JSON.stringify(queData)}'>
					<td>${queData.quelabel}</td>
					<td>${queData.queName}</td>
					<td>${queData.queType == 1 ? "Single Choice" : queData.queType == 2 ? "Multi Choice" : queData.queType == 3 ? "Single Textbox" : queData.queType == 4 ? "Multiline Textbox" : queData.queType == 5 ? "Single select dropdown" : queData.queType == 6 ? "Multi select dropdown" : "Date"}</td>
					<td>${queData.quereq == 1 ? "Yes" : "No"}</td>
					<td class="text-center"><span data-toggle="modal"
						data-target=".addformquestion"><a
							href="javascript:void(0)" data-toggle="tooltip"
							data-placement="bottom" data-original-title="Edit"
							class="text-success fa-size queTableEditBtn"><i
								class="fa fa-pencil"></i></a></span> <span
						class="delete-user-alert"><a
							href="javascript:void(0)" class="text-danger fa-size delete-user-alert-que"
							data-toggle="tooltip" data-placement="bottom"
							data-original-title="Delete"><i
								class="fa fa-trash"></i></a></span></td>
						</tr>`;

		queTableTbody.append(newRow);
	}
	allQueDataArray = [];
	$("#formquestion_datatable tbody tr[data-quedata]").each(function() {
		let queData = $(this).attr("data-quedata");
		allQueDataArray.push(JSON.parse(queData));
	});
	$('.modal').modal('hide');
	clearInputFiledQueModal();
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
	let lastQuestionNumber = 0;

	let lastRow = $("#formquestion_datatable tr:last td:first").text().trim();

	if (lastRow.startsWith("Q")) {
		lastQuestionNumber = parseInt(lastRow.substring(1)) || 0;
	}
	return "Q" + (lastQuestionNumber + 1);
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
	} else if (queAnswerType.value == "6") {
		multiSelectDiv.style.display = "none";
	} else if (queAnswerType.value == "7") {

	}
	queAnswerType.value = "";
	$('.selectpicker').selectpicker('refresh');
	validatans.checked = false;
	answerTypeFormat.value = "0";
	reqans.checked = false;
}
/*main form validation start here*/
saveQueInDBTable.addEventListener("click", () => {
	if (titleTxt.value.trim().length == 0) {
		showAlertFailure('Please enter form title');
		return;
	}
	if (!/^(?!\s)(?!.*\s{2,})[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(titleTxt.value)) {
		showAlertFailure('Enter a valid title text without extra spaces at the beginning or end. Only one space is allowed between words.');
		titleTxt.value = '';
		return;
	}
	if (titleTxt.value.trim().length < 2) {
		showAlertFailure('Title text more then 2 characters');
		return;
	}
	if (aliasNameTxt.value.trim().length == 0) {
		showAlertFailure('Please enter alias name')
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(aliasNameTxt.value)) {
		showAlertFailure('Enter a valid title text without extra spaces at the beginning or end. Only one space is allowed between words.');
		aliasNameTxt.value = '';
		return;
	}
	if (aliasNameTxt.value.trim().length < 5) {
		showAlertFailure('Alias name not more than 5 characters');
		return;
	}
	if (moduleDropdown.value === "0") {
		showAlertFailure('Please select module');
		return;
	}
	if (characteristicDropdown.value === "0") {
		showAlertFailure('Please select characteristic');
		return;
	}
	if (subcharacteristicDropdown.value === "0") {
		showAlertFailure('Please select subcharacteristic');
		return;
	}
	if (recurranceDropdown.value === "0") {
		showAlertFailure('Please select recurrance');
		return;
	}
	if (monthDropdown.value === "0") {
		showAlertFailure('Please select month');
		return;
	}
	if (comPeriod.value.trim().length == 0) {
		showAlertFailure('Please select compilance month');
		return;
	}
	if (!/^\d{2}$/.test(comPeriod.value)) {
		showAlertFailure('Please enter month like 01 or 12.');
		comPeriod.value = '';
		return;
	}
	if (date_from.value.trim().length == 0) {
		showAlertFailure('Please enter effective date. Date format should be DD/MM/YYYY.');
		return;
	}
	if (date_from.value.trim().length > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(date_from.value)) {
			showAlertFailure('Invalid date format. Please use DD/MM/YYYY.');
			date_from.value = '';
			return false;
		}
	}
	if (active.checked) {
		activeChk = 1;
	}
	if (textDes.value.trim().length == 0) {
		showAlertFailure('Please select text description');
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(textDes.value)) {
		showAlertFailure('Enter a valid text description without extra spaces at the beginning or end. Only one space is allowed between words.');
		textDes.value = '';
		return;
	}
	if (textDes.value.trim().length < 10) {
		showAlertFailure('Text description not more than 5 characters');
		return;
	}
	if ($("#formquestion_datatable tbody tr.odd").length > 0 &&
		$("#formquestion_datatable tbody tr.odd").nextAll("tr").length == 0) {
		showAlertFailure('Please enter at least one question');
	} else {
		allQueDataArray.forEach(obj => {
			delete obj.quelabel;
		});
		$("#formquestion_datatable tbody tr[data-quedata]").each(function() {
			let queData = $(this).attr("data-quedata");
			allEditsaveQueArray.push(JSON.parse(queData));
		});
		allEditsaveQueArray.forEach(obj => {
			delete obj.quelabel;
		});
		formData = {
			fid: hiddenId.value,
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
			queData: hiddenId.value.trim().length !== 0 ? allEditsaveQueArray : allQueDataArray
		};

		console.log(formData);
		clearInputFiledCreateForm()
		const url = hiddenId.value.trim().length == 0 ? "/saveForm" : "/updateForm";
		$.ajax({
			url: url,
			method: 'POST',
			data: JSON.stringify(formData),
			contentType: "application/json",
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
				$(".preloader").show();
			},
			success: function(response) {
				console.log(response)
				showAlertSuccess(response.message)
				setTimeout(() => {
					window.location.href = "/master-form";
				}, 4000);
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					showAlertFailure(errorResponse.message)
				} else if (response.status === 500) {
					showAlertFailure('Server error occurred while saving create form.')
				}
			},
			complete: function() {
				$(".preloader").hide();
			}
		});
	}
});
titleTxt.addEventListener("input", () => {
	if (titleTxt.value.trim().length > 15) {
		titleTxt.value = titleTxt.value.slice(0, 15);
	}
	if (!/^[A-Za-z ]+$/.test(titleTxt.value)) {
		titleTxt.value = titleTxt.value.slice(0, -1);
	}
});
aliasNameTxt.addEventListener("input", () => {
	if (aliasNameTxt.value.trim().length > 10) {
		aliasNameTxt.value = aliasNameTxt.value.slice(0, 10)
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
$('.delete-user-alert-form').on('click', function() {
	const uid = $(this).data('id');
	showDeleteConfirmation(() => {
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
				showAlertSuccess('Form data deleted successfully!!')
				setTimeout(() => {
					window.location.href = '/master-form';
				}, 4000);
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					showAlertFailure(errorResponse.message)
				} else if (response.status === 500) {
					showAlertFailure('Server error occurred while deleting form data. Try again later.')
				}
			}
		});
	});
});
$(document).ready(function() {
	$('#formquestion_datatable')
		.DataTable({
			paging: true,
			"bLengthChange": false,
			"columnDefs": [{
				"targets": 4,
				"orderable": false
			}],
			"pageLength": 10,
			language: {
				paginate: {
					next: '<i class="fa fa-angle-double-right">',
					previous: '<i class="fa fa-angle-double-left">'
				}
			},
			dom: "<'row'<'col-xl-6 col-lg-6 col-sm-5'pi><'col-xl-5 col-lg-4 col-sm-5'f><'col-xl-1 col-lg-2 col-sm-2 colmspadding text-left'<'toolbar1'>>>"
				+ "<'row'<'col-md-12'tr>>",
			fnInitComplete: function() {
				$('div.toolbar1')
					.html(
						'<a href="javascript:void(0)" data-toggle="modal" data-target=".formsorting" class="btn btn-warning btn-padding mb-1 mr-1"><i class="fa fa-sort"></i></a><a href="javascript:void(0)" data-toggle="modal" data-target=".addformquestion" class="btn btn-warning btn-padding mb-1"><i class="fa fa-plus"></i> Add</a>');
			},
		});
});
$(document).on("click", ".editFormBtn, .viewFormBtn", function() {
	const uid = $(this).data('id');
	let isEdit = $(this).hasClass("editFormBtn");
	$.ajax({
		url: `/fetchFData/${uid}`,
		method: 'POST',
		contentType: 'application/json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
			$(".preloader").show();
		},
		success: function(response) {
			console.log(response);
			/*Fetch data for form*/
			if (isEdit) {
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
					const searchTableBody = $('#formquestion_datatable').DataTable();
					searchTableBody.clear().draw();
					/*if ($("#formquestion_datatable tbody tr").length > 0) {
						$("#formquestion_datatable tbody td.dataTables_empty:first").remove();
					}*/
					allQueDataArray.push(...formData.queData);
					console.log(allQueDataArray)
					formData.queData.forEach((que, index) => {
						let queWithLabel = { ...que, quelabel: `Q${index + 1}` };
						let newRow = searchTableBody.row.add([
							queWithLabel.quelabel,
							que.queName,
							que.queType == 1 ? "Single Choice" : que.queType == 2 ? "Multi Choice" :
								que.queType == 3 ? "Single Textbox" : que.queType == 4 ? "Multiline Textbox" :
									que.queType == 5 ? "Single select dropdown" : que.queType == 6 ? "Multi select dropdown" : "Date",
							que.quereq == 1 ? "Yes" : "No",
							`<td class="text-center">
										            <span data-toggle="modal" data-target=".addformquestion">
										                <a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" 
										                   data-original-title="Edit" class="text-success fa-size queTableEditBtn">
										                   <i class="fa fa-pencil"></i>
										                </a>
										            </span>
										            <span class="delete-user-alert">
										                <a href="javascript:void(0)" class="text-danger fa-size delete-user-alert-que"
										                   data-toggle="tooltip" data-placement="bottom"  data-original-title="Delete">
										                   <i class="fa fa-trash" ></i>
										                </a>
										            </span>
										        </td>`
						]).draw(false);
						$(newRow.node()).attr("data-quedata", JSON.stringify(queWithLabel));
					});
				}

			}
			/*Fetch data preview form questions*/
			else {
				if (response.length > 0) {
					let formData = response[0];
					previewFtitle.innerHTML = formData.titletxt;
					previewFDes.innerHTML = formData.textdes;
					if ($("#all_question_preview .modal-body div").length > 0) {
						$("#all_question_preview .modal-body div.card").remove();
					}
					formData.queData.forEach((que, index) => {
						let queWithLabel = { ...que, quelabel: `Q : ${index + 1}` };
						if (que.queType == 1) {
							let row = `
								<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>
												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0 text-justify">
														<p class="font-weight-700 mb-1 text-justify">
															<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span>${que.queName}
														</p>
														<p class="mb-1">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        ${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
													                <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
													                    <div class="custom-control custom-radio">
													                        <input type="radio" id="choice${index}" name="choicetwo" class="custom-control-input">
													                        <label class="custom-control-label font-weight-300 m-t-5" for="choice${index}">
													                            ${choice}
													                        </label>
													                    </div>
													                </div>
													            `).join('')
									: ''
								}
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>
								`;
							previewQueBody.append(row);
						} else if (que.queType == 2) {
							let row = `	<div class="card mb-2 queshadow">
									<div class="card-body">
										<div class="row pl-2 pr-2">
											<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
												<span class="question">${queWithLabel.quelabel}</span>
											</div>

											<div
												class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
												<div class="form-group mb-0">
													<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
													</p>
													<p class="mb-1 text-justify">${que.queDes}</p>
												</div>

												<div class="form-group mb-0">
													<div class="row pl-2 pr-2">
													${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
														<div
															class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
															<div class="custom-control custom-checkbox displayblock">
																<input type="checkbox" class="custom-control-input"
																	id="choiceckbox${index}"> <label
																	class="custom-control-label font-weight-300 m-t-5"
																	for="choiceckbox${index}">${choice}</label>
															</div>
														</div>
														`).join('')
									: ''
								}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 3) {
							let row = `<div class="card mb-2 queshadow">
												<div class="card-body">
													<div class="row pl-2 pr-2">
														<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
															<span class="question">${queWithLabel.quelabel}</span>
														</div>

														<div
															class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
															<div class="form-group mb-0">
																<p class="font-weight-700 mb-1 text-justify">
																	<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span>${que.queName}
																</p>
																<p class="mb-1 text-justify">${que.queDes}</p>
															</div>
															<div class="form-group mb-0">
																<div class="row pl-2 pr-2">
																	<div
																		class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																		<input type="text" class="form-control"
																			placeholder="Enter Your Answer">
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 4) {
							let row = `<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
															<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>

													<div class="form-group mb-0">
														<div class="row pl-2 pr-2">
															<div
																class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																<textarea class="form-control textareasize"
																	placeholder="Enter Your Answer"></textarea>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 5) {
							let row = `<div class="card mb-2 queshadow">	
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
															<select class="selectpicker" data-style="lineheight12 bg-transfer"
				                                                data-live-search="true">
				                                                <option value="" selected="selected">Select</option>
																${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
										                        <option value="${index}">${choice}</option>
										                    `).join('')
									: ''
								}
				                                            </select>
													        </div>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
							$('.selectpicker').selectpicker('refresh');
						} else if (que.queType == 6) {
							let row = `<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
													            <select class="selectpicker" multiple
													                data-selected-text-format="count"
													                data-style="btn-light bg-transfer"
													                data-actions-box="true">
													                <option value="0" selected="selected">Select</option>
													                ${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
													                        <option value="${index}">${choice}</option>
													                    `).join('')
									: ''
								}
													            </select>
													        </div>
													    </div>
													</div>

												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
							$('.selectpicker').selectpicker('refresh');
						} else if (que.queType == 7) {
							let row = `<div class="card mb-0 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>

													<div class="form-group mb-0">
														<div class="row pl-2 pr-2">
															<div
																class="col-xl-3 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																<div class="input-group date">
																	<input type="text" class="form-control"
																		placeholder="dd/mm/yyyy" id="allpreview_date"> <span
																		class="input-group-addon inputgroups"> <i
																		class="mdi mdi-calendar"></i>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
						}
					});
				}
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred while fetching form data.')
			}
		},
		complete: function() {
			$(".preloader").hide();
		}
	});
});
$(document).on("hide.bs.modal", ".addformquestion", function() {
	clearInputFiledQueModal();
});

$(document).on("click", ".delete-user-alert-que", function() {
	let row = $(this).closest("tr");
	showDeleteConfirmation(() => {
		row.remove();
		$("#formquestion_datatable tbody tr").each(function(index) {
			let dataAttr = $(this).attr("data-quedata");
			if (!dataAttr) {
				return;
			}
			try {
				let queData = JSON.parse(dataAttr);
				queData.quelabel = `Q${index + 1}`;
				$(this).attr("data-quedata", JSON.stringify(queData));
				$(this).find("td:first").text(`Q${index + 1}`);
			} catch (error) {
				console.error(`Invalid JSON in row ${index + 1}:`, error);
			}
		});
	});
});

$(document).on('click', '.queTableEditBtn', function() {
	editingRow = $(this).closest("tr");
	let queEditData = JSON.parse(editingRow.attr("data-quedata"));
	console.log(queEditData);

	setTimeout(() => {
		$("#quelabel").val(queEditData.quelabel);
	}, 100);
	$("#queName").val(queEditData.queName);
	$("#queDes").val(queEditData.queDes);
	$("#singlechoicetable tbody").empty();
	$("#multichoicetable tbody").empty();
	$("#singleselecttable tbody").empty();
	$("#multiSelectDiv .multiselecttable tbody").empty();
	if (queEditData.queType == "1") {
		$("#queAnswerType").val("1").trigger("change");

		if (queEditData.questions && queEditData.questions.length > 0) {
			queEditData.questions.forEach((choice, index) => {
				let SingleChoiceCountTR = index + 1;

				let choiceRow = `
	                  <tr class="singleChoiceTR singleChoiceTR${SingleChoiceCountTR}">
	                      <td class='text-center border-0' width='5%'>
	                          <i class='fa fa-arrow-right' aria-hidden='true'></i>
	                      </td>
	                      <td class='border-0 p-1'>
	                          <div class='form-group mb-0'>
	                              <input type='text' class='form-control singleChoiceInput' 
	                                     placeholder='Enter an answer choice in English' 
	                                     value="${choice}">
	                          </div>
	                      </td>
	                      <td class='text-center border-0 p-0' width='3%'>
	                          <a href='javascript:void(0)'id='singlechoiceadd'>
	                              <i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
	                          </a>
	                      </td>
	                      <td class='text-center border-0 p-0' width='3%'>
	                          <a href='javascript:void(0)' id='singlechoiceremove'>
	                              <i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
	                          </a>
	                      </td>
	                  </tr>`;

				$("#singlechoicetable tbody").append(choiceRow);
			});
		}
	} else if (queEditData.queType == "2") {
		$("#queAnswerType").val("2").trigger("change");
		if (queEditData.questions && queEditData.questions.length > 0) {
			queEditData.questions.forEach((choice, index) => {
				let MultiChoiceCountTR = index + 1;

				let choiceRow = `
				<tr class="multiChoiceTR multiChoiceTR${MultiChoiceCountTR}">
				         <td class='text-center border-0' width='5%'>
				             <i class='fa fa-arrow-right' aria-hidden='true'></i>
				         </td>
				         <td class='border-0 p-1'>
				             <div class='form-group mb-0'>
				                 <input type='text' class='form-control multiChoiceInput' placeholder='Enter an answer choice in English' value="${choice}">
				             </div>
				         </td>
				         <td class='text-center border-0 p-0' width='3%'>
				             <a href='javascript:void(0)' id='multichoiceadd'>
				                 <i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
				             </a>
				         </td>
				         <td class='text-center border-0 p-0' width='3%'>
				             <a href='javascript:void(0)' id='multichoiceremove'>
				                 <i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
				             </a>
				         </td>
				     </tr>`;

				$("#multichoicetable tbody").append(choiceRow);
			});
		}
	} else if (queEditData.queType == "3") {
		$("#queAnswerType").val("3").trigger("change");
		validatans.checked = true;
		$(".showanswershouldbe").show();
		if (queEditData.questions.includes("1")) {
			$("#answerTypeFormat").val("1").trigger("change");
		} else if (queEditData.questions.includes("2")) {
			$("#answerTypeFormat").val("2").trigger("change");
		} else if (queEditData.questions.includes("3")) {
			$("#answerTypeFormat").val("3").trigger("change");
		} else if (queEditData.questions.includes("4")) {
			$("#answerTypeFormat").val("4").trigger("change");
		}
		$("#answerTypeFormat").selectpicker("refresh");
	} else if (queEditData.queType == "4") {
		$("#queAnswerType").val("4").trigger("change");
		validatans.checked = true;
		$(".showanswershouldbe").show();
		if (queEditData.questions.includes("1")) {
			$("#answerTypeFormat").val("1").trigger("change");
		} else if (queEditData.questions.includes("2")) {
			$("#answerTypeFormat").val("2").trigger("change");
			$("#answerTypeFormat").selectpicker("refresh");
		} else if (queEditData.questions.includes("3")) {
			$("#answerTypeFormat").val("3").trigger("change");
			$("#answerTypeFormat").selectpicker("refresh");
		} else if (queEditData.questions.includes("4")) {
			$("#answerTypeFormat").val("4").trigger("change");
			$("#answerTypeFormat").selectpicker("refresh");
		}
		$("#answerTypeFormat").selectpicker("refresh");
	} else if (queEditData.queType == "5") {
		$("#queAnswerType").val("5").trigger("change");
		if (queEditData.questions && queEditData.questions.length > 0) {
			queEditData.questions.forEach((choice, index) => {
				let SingleSelectCountTR = index + 1;

				let choiceRow = `
					<tr class="singleSelectTR singleSelectTR${SingleSelectCountTR}">
					         <td class='text-center border-0' width='5%'>
					             <i class='fa fa-arrow-right' aria-hidden='true'></i>
					         </td>
					         <td class='border-0 p-1'>
					             <div class='form-group mb-0'>
					                 <input type='text' class='form-control singleSelectInput' placeholder='Enter an answer choice in English' value="${choice}">
					             </div>
					         </td>
					         <td class='text-center border-0 p-0' width='3%'>
					             <a href='javascript:void(0)' id='singleselectadd'>
					                 <i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
					             </a>
					         </td>
					         <td class='text-center border-0 p-0' width='3%'>
					             <a href='javascript:void(0)' id='singleselectremove'>
					                 <i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
					             </a>
					         </td>
					     </tr>`;

				$("#singleselecttable tbody").append(choiceRow);
			});
		}
	} else if (queEditData.queType == "6") {
		$("#queAnswerType").val("6").trigger("change");
		if (queEditData.questions && queEditData.questions.length > 0) {
			queEditData.questions.forEach((choice, index) => {
				let MultiSelectCountTR = index + 1;

				let choiceRow = `
				<tr class="multiSelectTR multiSelectTR${MultiSelectCountTR}">
				         <td class='text-center border-0' width='5%'>
				             <i class='fa fa-arrow-right' aria-hidden='true'></i>
				         </td>
				         <td class='border-0 p-1'>
				             <div class='form-group mb-0'>
				                 <input type='text' class='form-control multiSelectInput' placeholder='Enter an answer choice in English' value="${choice}">
				             </div>
				         </td>
				         <td class='text-center border-0 p-0' width='3%'>
				             <a href='javascript:void(0)' id='multiSelectadd'>
				                 <i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
				             </a>
				         </td>
				         <td class='text-center border-0 p-0' width='3%'>
				             <a href='javascript:void(0)' id='multiSelectremove'>
				                 <i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
				             </a>
				         </td>
				     </tr>`;

				$("#multiSelectDiv .multiselecttable tbody").append(choiceRow);
			});
		}
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
moveBackBtn.addEventListener("click", () => {
	clearInputFiledCreateForm();
});
function clearInputFiledCreateForm() {
	titleTxt.value = '';
	aliasNameTxt.value = '';
	moduleDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	characteristicDropdown.innerHTML = "";
	$('.selectpicker').selectpicker('refresh');
	subcharacteristicDropdown.innerHTML = "";
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
		$("#formquestion_datatable tbody").append("<tr class='odd'><td valign='top' colspan='5' class='dataTables_empty'>No data available in table</td></tr>");
	}
}