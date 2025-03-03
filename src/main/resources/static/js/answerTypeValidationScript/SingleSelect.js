console.log("Answer type: Single select");
function countSingleSelectOptions() {
	return $("#singleselecttable tbody tr").length;
}
function addSingleSelectRow() {
	let rowCount = countSingleSelectOptions();

	if (rowCount >= 4) {
		alert("Only 4 answer choices are allowed.");
		return;
	}

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
             <a href='javascript:void(0)' id='singleselectadd'>
                 <i class='fa fa-plus-square-o font_20 m-t-5 text-default'></i>
             </a>
         </td>
         <td class='text-center border-0 p-0' width='3%'>
             <a href='javascript:void(0)' id='singleselectremove'>
                 <i class='fa fa-minus-square-o font_20 m-t-5 text-default'></i>
             </a>
         </td>
     </tr>`;

	$("#singleselecttable tbody").append(newRow);

	if (rowCount + 1 >= 4) {
		$("#singleselecttable tbody tr:last-child #singleselectadd").hide();
	}
}

$(document).on("click", "#singleselectadd", function(event) {
	event.preventDefault();
	event.stopPropagation();

	let count = countSingleSelectOptions();

	if (count >= 4) {
		alert("Only 4 answer choices are allowed.");
		return;
	}

	addSingleSelectRow();

	if (count + 1 >= 4) {
		$("#singleselecttable tbody tr:last-child #singleselectadd").hide();
	}
});

// Event Listener for Remove Button
$(document).on("click", "#singleselectremove", function(event) {
	event.preventDefault();
	event.stopPropagation();

	let count = countSingleSelectOptions();

	if (count <= 2) {
		alert("Please select at least two answer choices.");
		return;
	}

	$(this).closest("tr").remove();

	if (count - 1 < 4) {
		$("#singleselecttable tbody tr:last-child #singleselectadd").show();
	}
});

saveBtnQueTable.addEventListener("click", () => {
	/*validation for select single choice answer in answer type*/
	if (queAnswerType.value === "5") {
		console.log("Single select");

		let rowCount = countSingleSelectOptions();

		if (rowCount < 2) {
			alert("Please select at least two answer choices.");
			return;
		}
		if (rowCount > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
});
