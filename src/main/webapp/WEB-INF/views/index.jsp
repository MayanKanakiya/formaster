<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
<title>Log In</title>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<meta http-equiv='Cache-Control'
	content='no-cache, no-store, must-revalidate' />
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<meta http-equiv='Pragma' content='no-cache'>
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<link rel="shortcut icon" href="assets/images/favicon.png">
<link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
<link href="assets/css/style.css" rel="stylesheet" type="text/css" />
<script src="assets/custom/plugins/theme/mytheme.js"></script>
<link href="assets/custom/plugins/theme/mytheme.css" rel="stylesheet"
	type="text/css" />
<link href="assets/css/bootstrap.min.css" rel="stylesheet"
	type="text/css" />
<!-- <link href="assets/plugins/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" type="text/css" /> -->
<link rel="stylesheet" type="text/css" href="assets/login/login.css">
</head>
<body>
	<script>
		document.addEventListener("DOMContentLoaded",
				function() {
					var loginError = "${sessionScope.LoginError}";
					if (loginError && loginError !== "null"
							&& loginError.trim() !== "") {
						alert(loginError);
	<%session.removeAttribute("LoginError");%>
		}
				});
	</script>

	<div class="wrapper fadeInDown">
		<div id="formContent">
			<div class="fadeIn first">
				<img src="assets/images/e5logo.png" id="icon" alt="User Icon" />
			</div>
			<form action="/loginForm" method="POST"
				name="loginForm">
				<!-- CSRF Token -->
				<input type="hidden" name="${_csrf.parameterName}"
					value="${_csrf.token}"> <input type="text" id="username"
					class="fadeIn second" name="username" placeholder="Email">

				<!-- Password Field -->
				<input type="password" id="password" class="fadeIn third"
					name="password" placeholder="Password" style="margin-left: 6%;">
				<i class="fa fa-eye field-icon"></i>

				<div class="text-right">
					<a href="/" class="text-dark forpw">Forgot your password?</a>
				</div>

				<div id="msg" class="errormsg mt-0">
					<span class="errors">Incorrect Login details!</span>
				</div>
				<!-- Submit Button -->
				<a class="submit-form-button fadeIn fourth"
					id="LoginBtn" href="javascript:void(0)">Login</a>

			</form>

		</div>
	</div>
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="/assets/custom/plugins/jquery_toastr/jquery.toast.min.js"></script>
	<script src="js/ToastScript.js"></script>
	<!-- <script src="assets/plugins/bootstrap-select/js/bootstrap-select.js"></script> -->
	<script
		src="assets/custom/plugins/showpassword/hideShowPassword.min.js"></script>
	<script src="assets/login/main.js"></script>
	<script>
		$('#username').focus();
		$(document).keypress(function(e) {
			if (e.which == 13) {
				login();
			}
		});

		$('#password + .fa').on('click', function() {
			$(this).toggleClass('fa-eye-slash').toggleClass('fa-eye'); // toggle our classes for the eye icon
			$('#password').togglePassword(); // activate the hideShowPassword plugin
		});
	</script>
	<script src="js/LoginScript.js"></script>
</body>
</html>