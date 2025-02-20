console.log("Login script running")
const email = document.getElementById("username");
const pass = document.getElementById("password");
const loginBtn = document.getElementById("LoginBtn");

// Get CSRF token and header name from meta tags
const csrfToken = document.querySelector("meta[name='_csrf']").getAttribute("content");
const csrfHeader = document.querySelector("meta[name='_csrf_header']").getAttribute("content");

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
		beforeSend: function(xhr) {
			xhr.setRequestHeader(csrfHeader, csrfToken);
		},
		success: (response) => {
			console.log("loginJValid Response:", response.message);
		},
		error: (response) => {
			if (response.status === 400) {
				loginBtn.setAttribute("type", "button");
				const errorResponse = JSON.parse(response.responseText);
				document.getElementById('msg').style.display = 'block';
				document.querySelector("#msg .errors").textContent = errorResponse.message;
			} else if (response.status === 500) {
				loginBtn.setAttribute("type", "button");
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			}
		}
	});
	document.getElementById('msg').style.display = 'none';
});