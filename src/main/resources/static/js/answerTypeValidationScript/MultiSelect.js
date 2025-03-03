console.log("Answer type: Multi select");

function countMultiSelectOptions() {
	return $("#multiSelectDiv .multiselecttable tbody tr").length;
}

function addMultiSelectRow() {
	let count = countMultiSelectOptions();

	if (count >= 4) return;

	var newRow = `<tr class="">
         <td class='text-center border-0' width='5%'>
             <i class='fa fa-arrow-right' aria-hidden='true'></i>
         </td>
         <td class='border-0 p-1'>
             <div class='form-group mb-0'>
                 <input type='text' class='form-control' placeholder='Enter an answer choice in English'>
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

	$('#multiSelectDiv .multiselecttable tbody').append(newRow);
	updateMultiSelectUI();
}

// Show/hide "+" button when max limit is reached
function updateMultiSelectUI() {
	let count = countMultiSelectOptions();

	if (count >= 4) {
		$("#multiSelectDiv .multiselecttable tbody tr:last-child #multiSelectadd").hide();
	} else {
		$("#multiSelectDiv .multiselecttable tbody tr:first-child #multiSelectadd").show();
	}

	if (count <= 1) {
		$("#multiSelectDiv .multiselecttable tbody tr:first-child #multiSelectremove").hide();
	} else {
		$("#multiSelectDiv .multiselecttable tbody #multiSelectremove").show();
	}
}

// On answer type change
queAnswerType.addEventListener("change", function() {
	if (queAnswerType.value === "6") {
		console.log("Multi Select");
		$("#multiSelectDiv").show();
		$("#multiSelectDiv .multiselecttable tbody").empty();
		addMultiSelectRow();
	} else {
		$("#multiSelectDiv").hide();
		$("#multiSelectDiv .multiselecttable tbody").empty();
	}
});

// Add row on "+" button click
$(document).on("click", "#multiSelectadd", function(event) {
	event.preventDefault();
	event.stopPropagation();

	addMultiSelectRow();
});

// Remove row on "-" button click
$(document).on("click", "#multiSelectremove", function(event) {
	event.preventDefault();
	event.stopPropagation();

	let count = countMultiSelectOptions();
	if (count > 1) {
		$(this).closest("tr").remove();
		updateMultiSelectUI();
	}
});

// Validation on save
saveBtnQueTable.addEventListener("click", () => {
	if (queAnswerType.value === "6") {
		console.log("Multi Select");
		let count = countMultiSelectOptions();

		if (count > 4) {
			alert("Only 4 answer choices are allowed.");
			return;
		}
	}
});
