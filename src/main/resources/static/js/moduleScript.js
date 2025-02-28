console.log("Running module script");
const addFormBtn = document.getElementById("addFormBtb");
const moduleDropdown = document.getElementById("moduleDropdown");


var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

//Below method for populate module dropdown when page load
addFormBtn.addEventListener("click", () => {
	$.ajax({
		url: "/populateModuleDropdown",
		method: 'POST',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			console.log(response)
			moduleDropdown.innerHTML = '<option value="0" selected="selected">Select</option>';
			
			response.forEach(function(moduleNames) {
				const option = document.createElement("option");
				option.value = moduleNames;
				option.textContent = moduleNames.moduleName;
				moduleDropdown.appendChild(option);
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
})