console.log("Answer type : Single choice")
function countOptions() {
	return $("#singlechoicetable tbody tr").length;
}

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
queAnswerType.addEventListener("change", function() {
	if (queAnswerType.value === "1") {
		$(".singlechoicedata").show();
		$("#singlechoicetable tbody").empty();
		addNewRow();
	} else {
		$(".singlechoicedata").hide();
		$("#singlechoicetable tbody").empty();
	}
});

$(document).on("click", "#singlechoiceadd", function(event) {
	event.preventDefault();
	event.stopPropagation();

	let count = countOptions();

	if (count >= 4) {
		alert("Only 4 answer choices are allowed.");
		return;
	}

	addNewRow();

	if (count + 1 >= 4) {
		$("#singlechoicetable tbody tr:last-child #singlechoiceadd").hide();
	}

});

$(document).on("click", "#singlechoiceremove", function(event) {
	event.preventDefault();
	event.stopPropagation();

	let count = countOptions();

	if (count <= 2) {
		alert("Please select at least two answer choices.");
		return;
	}

	$(this).closest("tr").remove();

	if (count - 1 < 4) {
		$("#singlechoicetable tbody tr:last-child #singlechoiceadd").show();
	}

});
saveBtnQueTable.addEventListener("click", () => {
	/*validation for select single choice answer in answer type*/
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
});
