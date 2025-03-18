console.log("Running module script");
const addFormBtn = document.getElementById("addFormBtn");
const moduleDropdown = document.getElementById("moduleDropdown");
const characteristicDropdown = document.getElementById("characteristicDropdown")
const subcharacteristicDropdown = document.getElementById("subcharacteristicDropdown")
const recurranceDropdown = document.getElementById("recurranceDropdown");
const monthDropdown = document.getElementById("monthDropdown");


var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
function populateFormDropdown() {
	$.ajax({
		url: "/populatingDropdown",
		method: 'POST',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			/*console.log(response.modules);
			console.log(response.recurrance);
			console.log(response.month);*/
			moduleDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			response.modules.forEach(function(moduleData) {
				const option = document.createElement("option");
				option.textContent = moduleData.moduleName;
				option.value = moduleData.moduleId;
				moduleDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
			recurranceDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			response.recurrance.forEach(function(recurranceData) {
				const option = document.createElement("option");
				option.textContent = recurranceData.recurranceName;
				option.value = recurranceData.recurranceId;
				recurranceDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
			monthDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			response.month.forEach(function(monthData) {
				const option = document.createElement("option");
				option.textContent = monthData.monthName;
				option.value = monthData.monthId;
				monthDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred populate module names into dropdown box.')
			}
		}
	});
}
//Below method for populate module dropdown when page load
addFormBtn.addEventListener("click", () => {
	hiddenId.value = '';
	formId.value = '';
	formId.value = "FORM-" + id;
	characteristicDropdown.innerHTML = "";
	subcharacteristicDropdown.innerHTML = "";
	clearInputFiledCreateForm();
	/*alert("Please don't reload page while creating form otherwise you lose your data.")*/
	populateFormDropdown();
});
$('.editFormBtn').on('click', function() {
	formId.value = '';
	/*alert("Please don't reload page while creating form otherwise you lose your data.")*/
	populateFormDropdown();
});
function charDropdown(selectedModuleName) {
	$.ajax({
		url: "/populateCharacteristicByModuleName",
		method: 'POST',
		data: { moduleName: selectedModuleName },
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			/*console.log(response)*/
			if (response.length == 0) {
				characteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
				subcharacteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
				$('.selectpicker').selectpicker('refresh');
			} else {
				characteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
				subcharacteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
				response.forEach(function(characteristicNames) {
					const option = document.createElement("option");
					option.value = characteristicNames;
					option.textContent = characteristicNames.characteristicName;
					option.value = characteristicNames.characteristicId;
					characteristicDropdown.appendChild(option);
					$('.selectpicker').selectpicker('refresh');

				});
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred populate characteristic name into dropdown box.')
			}
		}
	});
}
function subCharDropdown(selectedSubCharacteristicName) {
	$.ajax({
		url: "/populatesubCharacteristicByCharacteristicName",
		method: 'POST',
		data: { characteristicName: selectedSubCharacteristicName },
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			/*console.log(response)*/
			if (response.length == 0) {
				subcharacteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
				$('.selectpicker').selectpicker('refresh');
			} else {
				subcharacteristicDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';

				response.forEach(function(subcharacteristicNames) {
					const option = document.createElement("option");
					option.value = subcharacteristicNames;
					option.textContent = subcharacteristicNames.subCharacteristicName;
					option.value = subcharacteristicNames.subCharacteristicId;
					subcharacteristicDropdown.appendChild(option);
					$('.selectpicker').selectpicker('refresh');

				});
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred populate subcharacteristic name into dropdown box.')
			}
		}
	});
}
moduleDropdown.addEventListener("change", () => {
	const selectedModuleName = moduleDropdown.options[moduleDropdown.selectedIndex]?.text || "";
	charDropdown(selectedModuleName);
});
characteristicDropdown.addEventListener("change", () => {
	const selectedSubCharacteristicName = characteristicDropdown.options[characteristicDropdown.selectedIndex]?.text || "";
	subCharDropdown(selectedSubCharacteristicName);
});