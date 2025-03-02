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

// Function to count the number of rows (input fields)
function countOptions() {
	return $("#singlechoicetable tbody tr").length;
}

// Function to add a new row
function addNewRow() {
	var newRow = `<tr>
         <td class='text-center border-0' width='5%'>
             <i class='fa fa-arrow-right' aria-hidden='true'></i>
         </td>
         <td class='border-0 p-1'>
             <div class='form-group mb-0'>
                 <input type='text' class='form-control' placeholder='Enter an answer choice in English'>
             </div>
         </td>
         <td class='text-center border-0 p-0' width='3%'>
             <a href='javascript:void(0)' id='singlechoiceadd'>
                 <i class='fa fa-plus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
             </a>
         </td>
         <td class='text-center border-0 p-0' width='3%'>
             <a href='javascript:void(0)' id='singlechoiceremove'>
                 <i class='fa fa-minus-square-o font_20 m-t-5 text-default' aria-hidden='true'></i>
             </a>
         </td>
     </tr>`;
	$('#singlechoicetable tbody').append(newRow);
}

// Show singlechoicedata and add one default input field when single choice is selected
queAnswerType.addEventListener("change", function() {
	if (queAnswerType.value === "1") {
		$(".singlechoicedata").show(); // Show the div
		$("#singlechoicetable tbody").empty(); // Clear the table
		addNewRow(); // Add one default input field
	} else {
		$(".singlechoicedata").hide(); // Hide the div
		$("#singlechoicetable tbody").empty(); // Clear the table
	}
});

// Add new row (one by one) - Event delegation
$(document).on("click", "#singlechoiceadd", function(event) {
	event.preventDefault(); // Prevent default behavior
	event.stopPropagation(); // Stop event bubbling

	let count = countOptions();

	// Check if the maximum limit (4 rows) is reached
	if (count >= 4) {
		alert("Only 4 answer choices are allowed.");
		return;
	}

	addNewRow(); // Add a new row

	// Hide the + button if the limit is reached
	if (count + 1 >= 4) {
	    $("#singlechoicetable tbody tr:last-child #singlechoiceadd").hide();
	}

});

// Remove row (ensure at least 2 choices remain) - Event delegation
$(document).on("click", "#singlechoiceremove", function(event) {
	event.preventDefault(); // Prevent default behavior
	event.stopPropagation(); // Stop event bubbling

	let count = countOptions();

	// Check if the minimum limit (2 rows) is reached
	if (count <= 2) {
		alert("Please select at least two answer choices.");
		return;
	}

	// Remove the closest row
	$(this).closest("tr").remove();

	// Show the + button if rows are less than 4
	if (count - 1 < 4) {
	    $("#singlechoicetable tbody tr:last-child #singlechoiceadd").show();
	}

});

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
	/*validation for select single choice answer in answer type*/
	if (queAnswerType.value === "1") {
		console.log("Single Choice");
		let count = countOptions();

		// Check if the number of rows is between 2 and 4
		if (count < 2) {
			alert("Please select at least two answer choices.");
			return;
		}
		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
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