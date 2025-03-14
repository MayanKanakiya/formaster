console.log("Fill form script running...")
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
const fillFormDropdown = document.getElementById("fillFormDropdown");
const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", () => {
	if (fillFormDropdown.value == 0) {
		alert("Please select form name");
		return;
	} else {
		$.ajax({
			url: `/fetchFData/${fillFormDropdown.value}`,
			method: 'POST',
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success: function(response) {
				console.log(response);
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					alert(errorResponse.message);
				} else if (response.status === 500) {
					alert("Server error occurred while fetching form data.");
				}
			}
		});
	}
});

localStorage.setItem('name','ajay');

