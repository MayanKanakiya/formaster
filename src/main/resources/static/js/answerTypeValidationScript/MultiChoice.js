console.log("Answer type: Multi choice");

function countMultiOptions() {
    return $("#multichoicetable tbody tr").length;
}

function addMultiRow() {
    let count = countMultiOptions();

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
    
    $('#multichoicetable tbody').append(newRow);
    updateMultiChoiceUI();
}

// Show/hide "+" button above when max limit is reached
function updateMultiChoiceUI() {
    let count = countMultiOptions();

    // Hide "+" button only when exactly 4 inputs exist
    if (count >= 4) {
        $("#multichoicetable tbody tr:last-child #multichoiceadd").hide();
    } else {
        $("#multichoicetable tbody tr:first-child #multichoiceadd").show();
    }

    // Prevent removing the last remaining input
    if (count <= 1) {
        $("#multichoicetable tbody tr:first-child #multichoiceremove").hide();
    } else {
        $("#multichoicetable tbody #multichoiceremove").show();
    }
}

// On answer type change
queAnswerType.addEventListener("change", function() {
    if (queAnswerType.value === "2") { 
        console.log("Multiple Choice");
        $("#multichoicedata").show();
        $("#multichoicetable tbody").empty();
        addMultiRow();
    } else {
        $("#multichoicedata").hide();
        $("#multichoicetable tbody").empty();
    }
});

// Add row on "+" button click
$(document).on("click", "#multichoiceadd", function(event) {
    event.preventDefault();
    event.stopPropagation();

    addMultiRow();
});

// Remove row on "-" button click
$(document).on("click", "#multichoiceremove", function(event) {
    event.preventDefault();
    event.stopPropagation();

    let count = countMultiOptions();
    if (count > 1) {
        $(this).closest("tr").remove();
        updateMultiChoiceUI();
    }
});

// Validation on save
saveBtnQueTable.addEventListener("click", () => {
    if (queAnswerType.value === "2") {
        console.log("Multiple Choice");
        let count = countMultiOptions();

        if (count > 4) {
            alert("Only 4 answer choices are allowed.");
            return;
        }
    }
});
