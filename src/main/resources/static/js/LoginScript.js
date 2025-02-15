console.log("Login script running")
const email = document.getElementById("email");
const pass = document.getElementById("password");
const loginBtn = document.getElementById("LoginBtn");

loginBtn.addEventListener("click", () => {

	if (email.value.trim().length == 0) {
		document.getElementById('msg').style.display = 'block';
		document.querySelector("#msg .errors").textContent = "Please enter your email";
		return;
	}
	if (pass.value.trim().length == 0) {
		document.getElementById('msg').style.display = 'block';
		document.querySelector("#msg .errors").textContent = "Please enter your password";
		return;
	}
	document.getElementById('msg').style.display = 'none';
	const loginJValid = {
		email: email.value,
		pass: pass.value
	}
	$.ajax({
		url: '/loginjvalid',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(loginJValid),
		success: function(response) {
			console.log(response.message);
			
			
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				document.getElementById('msg').style.display = 'block';
				document.querySelector("#msg .errors").textContent = errorResponse.message;
			} else if (response.status === 500) {
				alert("Internal server side error : Java validation");
			}
		}
	})
	document.getElementById('msg').style.display = 'none';
});