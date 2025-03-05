console.log("Master create form script running..")
const questionTable = document.getElementById("formquestion_datatable");
const queTableTbody = $("#formquestion_datatable tbody")

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
const titleTxt = document.getElementById("titleTxt");
const aliasNameTxt = document.getElementById("aliasNameTxt");
const comPeriod = document.getElementById("comPeriod");
const date_from = document.getElementById("date_from");
const active = document.getElementById("active");
let activeChk = 0;
const textDes = document.getElementById("textDes");
//Below object for only available data for only question form
let queData;
//Below object for only available data for full create form
let formData;
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
			} else if (inputField.length < 4) {
				alert(`${index + 1} Question must have at least 4 characters`);
				isValid = false;
				return false;
			} else if (inputField.length > 5) {
				alert(`${index + 1} Question cannot have more than 5 characters`);
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
	queData = {}
	queData = {
		quelabel: quelabel.value,
		queName: queName.value,
		queDes: queDes.value,
		queAnswerType: queAnswerType.value,
		quereq: reqanschk,
	}
	if (queAnswerType.value === "1") {
		queData["options"] = [];
		$(".singleChoiceTR").each(function(index) {
			queData["options"].push($(this).find(".singleChoiceInput").val());
		});
	}
	if (queAnswerType.value === "2") {
		queData["options"] = [];
		$(".multiChoiceTR").each(function(index) {
			queData["options"].push($(this).find(".multiChoiceInput").val());
		});
	}
	if (queAnswerType.value === "5") {
		queData["options"] = [];
		$(".singleSelectTR").each(function(index) {
			queData["options"].push($(this).find(".singleSelectInput").val());
		});
	}
	if (queAnswerType.value === "6") {
		queData["options"] = [];
		$(".multiSelectTR").each(function(index) {
			queData["options"].push($(this).find(".multiSelectInput").val());
		});
	}
	if (queAnswerType.value === "3" || validatans.checked) {
		console.log(answerTypeFormat.value)
		queData["answerTypeFormat"] = answerTypeFormat.value
	} else if (queAnswerType.value === "3") {
		queData["answerTypeFormat"] = 0;
	}

	if (queAnswerType.value === "4" || validatans.checked) {
		console.log(answerTypeFormat.value)
		queData["answerTypeFormat"] = answerTypeFormat.value
	} else if (queAnswerType.value === "3") {
		queData["answerTypeFormat"] = 0;
	}
	
	queTableTbody.empty();
	let newRow = `	<tr>
					<td>${queData.quelabel}</td>
					<td>${queData.queName}</td>
					<td>${queData.queAnswerType == 1 ? "Single Choice" : queData.queAnswerType == 2 ? "Multi Choice" : queData.queAnswerType == 3 ? "Single Textbox" : queData.queAnswerType == 4 ? "Multiline Textbox" : queData.queAnswerType == 5 ? "Single select dropdown" : queData.queAnswerType == 6 ? "Multi select dropdown" : "Date"}</td>
					<td>${queData.quereq == 1 ? "Yes" : "No"}</td>
					<td class="text-center"><span data-toggle="modal"
						data-target=".addformquestion"><a
							href="javascript:void(0)" data-toggle="tooltip"
							data-placement="bottom" data-original-title="Edit"
							class="text-success fa-size"><i
								class="fa fa-pencil"></i></a></span> <span
						class="delete-user-alert"><a
							href="javascript:void(0)" class="text-danger fa-size"
							data-toggle="tooltip" data-placement="bottom"
							data-original-title="Delete"><i
								class="fa fa-trash"></i></a></span></td>
						</tr>`;
	queTableTbody.append(newRow);

	console.log(queData);
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
	let rowCount = $("#formquestion_datatable tbody tr").length;
	return "Q" + (rowCount);
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
	formData = {
		queData: queData
	}
	console.log(formData)

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