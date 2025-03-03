console.log("Master create form script running..")
const questionTable = document.getElementById("formquestion_datatable");
const tbody = questionTable.getElementsByTagName("tbody")[0];

const queName = document.getElementById("queName");
const queDes = document.getElementById("queDes");
const queAnswerType = document.getElementById("queAnswerType");
const reqans = document.getElementById("reqans");
const saveBtnQueTable = document.getElementById("saveBtnQueTable");
const saveQueInDBTable = document.getElementById("saveQueInDBTable");
const cancelBtnQueInputFiled = document.getElementById("cancelBtnQueInputFiled");

saveBtnQueTable.addEventListener("click", () => {
	if (queName.value.trim().length == 0) {
		alert("Please enter Question name");
		return;
	}
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(queName.value)) {
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
	if (!/^(?! )[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+( [A-Za-z0-9!@#$%^&*(),.?":{}|<>]+)*$/.test(queDes.value)) {
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
});
queName.addEventListener("input", () => {
	if (queName.value.trim().length > 30) {
		queName.value = queName.value.slice(0, 30);
	}
});
queDes.addEventListener("input", () => {
	if (queDes.value.trim().length > 50) {
		queDes.value = queDes.value.slice(0, 30);
	}
});

/*This below code automcatically add question number when click add buttton*/
let table = $('#formquestion_datatable').DataTable();

function getNextQuestionNumber() {
	let rowCount = table.rows().count();
	return "Q" + (rowCount + 1);
}

$(".addformquestion").on("show.bs.modal", function() {
	let nextQuestion = getNextQuestionNumber();
	$("input[placeholder='Enter Your Question Label in English']").val(nextQuestion);
});