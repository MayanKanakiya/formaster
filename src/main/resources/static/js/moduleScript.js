console.log("Running module script");
const addFormBtn = document.getElementById("addFormBtb");
const moduleDropdown = document.getElementById("moduleDropdown");
const characteristicDropdown = document.getElementById("characteristicDropdown")
const subcharacteristicDropdown = document.getElementById("subcharacteristicDropdown")
const recurranceDropdown = document.getElementById("recurranceDropdown");
const monthDropdown = document.getElementById("monthDropdown");


var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

//Below method for populate module dropdown when page load
addFormBtn.addEventListener("click", () => {
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
				moduleDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
			recurranceDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			response.recurrance.forEach(function(recurranceData) {
				const option = document.createElement("option");
				option.textContent = recurranceData.recurranceName;
				recurranceDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
			monthDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			response.month.forEach(function(monthData) {
				const option = document.createElement("option");
				option.textContent = monthData.monthName;
				monthDropdown.appendChild(option);
				$('.selectpicker').selectpicker('refresh');
			});
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred populate module names into dropdown box.");
			}
		}
	});
});
moduleDropdown.addEventListener("change", () => {
	const selectedModuleName = moduleDropdown.options[moduleDropdown.selectedIndex].text;
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
					characteristicDropdown.appendChild(option);
					$('.selectpicker').selectpicker('refresh');
				});
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred populate characteristic name into dropdown box.");
			}
		}
	});
});
characteristicDropdown.addEventListener("change", () => {
	const selectedSubCharacteristicName = characteristicDropdown.options[characteristicDropdown.selectedIndex].text;
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
					subcharacteristicDropdown.appendChild(option);
					$('.selectpicker').selectpicker('refresh');
				});
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred populate subcharacteristic name into dropdown box.");
			}
		}
	});
});
