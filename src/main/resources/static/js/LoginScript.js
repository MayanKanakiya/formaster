console.log("Login script running");

const loginBtn = document.getElementById("LoginBtn");
const loginForm = document.forms["loginForm"];
const email = document.getElementById("username");
const pass = document.getElementById("password");
const errorMsg = document.getElementById('msg');

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

function clientSideValidation() {
	errorMsg.style.display = 'none';

	if (email.value.trim() === "") {
		errorMsg.style.display = 'block';
		document.querySelector("#msg .errors").textContent = "Please enter your email";
		return false;
	}
	if (pass.value.trim() === "") {
		errorMsg.style.display = 'block';
		document.querySelector("#msg .errors").textContent = "Please enter your password";
		return false;
	}
	return true;
}

function handleLogin(event) {
	event.preventDefault();

	if (!clientSideValidation()) {
		return;
	}

	$.ajax({
		url: '/loginjvalid',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({
			email: email.value,
			pass: pass.value
		}),
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			console.log("Login validation successful:", response.message);
			loginForm.submit();
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				errorMsg.style.display = 'block';
				document.querySelector("#msg .errors").textContent = errorResponse.message;
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred. Try again later.')
			}
		}
	});
}

loginBtn.addEventListener("click", handleLogin);
