console.log("Master User Script Running");
const mst_ufname = document.getElementById("fname");
const mst_ulname = document.getElementById("lname");
const email = document.getElementById("email");
const cno = document.getElementById("cno");
const gender = document.getElementById("gender");
const userImg = document.getElementById("userImg");
const add_edit_userimg = document.getElementById("add_edit_userimg");
const removeImgBtn = document.getElementById("removeImgBtn");
const addUserBtn = document.getElementById("addUserBtn");
const validfrom = document.getElementById("valid_from");
const validto = document.getElementById("valid_to");
const roles = document.getElementById("roles");
const userSaveBtn = document.getElementById("userSaveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const hiddenuid = document.getElementById("hiddenuid");

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

function ClientSideValidation() {
	if (mst_ufname.value.trim().length == 0) {
		alert("Please enter first name");
		return false;
	}
	if (!/^(?! )[A-Za-z]+( [A-Za-z]+)*$/.test(mst_ufname.value)) {
		alert("Enter first name without any extra spaces..");
		mst_ufname.value = '';
		return false;
	}
	if (mst_ufname.value.trim().length <= 1) {
		alert("First name more than 1 characters");
		return false;
	}
	if (mst_ulname.value.trim().length == 0) {
		alert("Please enter last name");
		return false;
	}
	if (!/^(?! )[A-Za-z]+( [A-Za-z]+)*$/.test(mst_ulname.value)) {
		alert("Enter last name without any extra spaces..");
		mst_ulname.value = '';
		return false;
	}
	if (mst_ulname.value.trim().length <= 2) {
		alert("Last name more than 2 characters");
		return false;
	}
	if (email.value.trim().length == 0) {
		alert("Please enter email")
		return false;
	}
	if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
		alert("Please enter valid Email...")
		return false;
	}
	if (cno.value.trim().length > 0) {
		if (cno.value.trim().length < 10) {
			alert("Contact number should be 10 digit");
			return false;
		}
	}
	if (gender.value === "0") {
		alert("Please select gender");
		return false;
	}
	if (validfrom.value.trim().length > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(validfrom.value)) {
			alert("Invalid date format. Please use DD/MM/YYYY.");
			validfrom.value = '';
			return false;
		}
	}
	if (validfrom.value.trim().length > 0) {
		if (validto.value.trim().length == 0) {
			alert("Please enter Valid to date")
			return false;
		}
	}
	if (validto.value.trim().lengt > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(validto.value)) {
			alert("Invalid date format. Please use DD/MM/YYYY.");
			validto.value = '';
			return false;
		}
	}
	if (validto.value.trim().length > 0) {
		if (validfrom.value.trim().length == 0) {
			alert("Please enter Valid from date")
			return false;
		}
	}
	if (roles.value === "0") {
		alert("Please select user role");
		return false;
	}
	return true;
}

userSaveBtn.addEventListener("click", () => {
	if (!ClientSideValidation()) {
		return;
	}
	const userAddJData = {
		fname: mst_ufname.value,
		lname: mst_ulname.value,
		email: email.value,
		cno: cno.value,
		gender: gender.value,
		validfrom: validfrom.value,
		validto: validto.value,
		urole: roles.value,
		image: userImg.value
	}
	$.ajax({
		url: '/userMstJValid',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(userAddJData),
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			console.log("User Master server side validation successful:", response.message);
			const userAddEditData = new FormData();
			userAddEditData.append("id", hiddenuid.value.trim());
			userAddEditData.append("fname", mst_ufname.value);
			userAddEditData.append("lname", mst_ulname.value);
			userAddEditData.append("email", email.value);
			userAddEditData.append("cno", cno.value);
			userAddEditData.append("gender", gender.value);
			userAddEditData.append("validfrom", validfrom.value);
			userAddEditData.append("validto", validto.value);
			userAddEditData.append("urole", roles.value);

			if (userImg.files.length > 0) {
				userAddEditData.append("imageFile", userImg.files[0]);
			} else if (userImg.files.length === 0 && hiddenuid.value.trim().length === 0) {
				userAddEditData.append("imageFile", "");
			} else {
				let imgSrc = add_edit_userimg.src;
				if (imgSrc.includes("assets/images/users/default_user.png")) {
					userAddEditData.append("imageFile", "");
				}
			}

			const apiUrl = hiddenuid.value.trim().length == 0 ? '/addUserMst' : '/updateUserMst';

			$.ajax({
				url: apiUrl,
				method: 'POST',
				contentType: 'application/json',
				data: userAddEditData,
				processData: false,
				contentType: false,
				beforeSend: function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success: function(response) {
					alert(response.message);
					clearInputFiled();
					window.location.href = '/master-users';
				},
				error: function(response) {
					if (response.status === 400) {
						const errorResponse = JSON.parse(response.responseText);
						alert(errorResponse.message);
					} else if (response.status === 500) {
						alert("Server error occurred while processing user. Try again later.");
					}
				}
			});

		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred. Try again later.");
			}
		}
	});
});
userImg.addEventListener('change', () => {
	if (userImg.files.length > 0) {
		const fileName = userImg.files[0].name;
		const idxDot = fileName.lastIndexOf(".") + 1;
		const extFile = fileName.substr(idxDot).toLowerCase();

		if (!["jpg", "jpeg", "png"].includes(extFile)) {
			alert("Only jpg/jpeg and png files are allowed!");
			userImg.value = '';
		}
	}
});
//Only enter Characters
mst_ufname.addEventListener("input", () => {
	if (mst_ufname.value.trim().length > 6) {
		mst_ufname.value = mst_ufname.value.slice(0, 6);
	}
	if (!/^[a-zA-Z\s]+$/.test(mst_ufname.value)) {
		mst_ufname.value = mst_ufname.value.slice(0, -1);
	}
});
mst_ulname.addEventListener("input", () => {
	if (mst_ulname.value.trim().length > 10) {
		mst_ulname.value = mst_ulname.value.slice(0, 10);
	}
	if (!/^[a-zA-Z\s]+$/.test(mst_ulname.value)) {
		mst_ulname.value = mst_ulname.value.slice(0, -1);
	}
});
//Only enter numbers
cno.addEventListener("input", () => {
	if (!/^\d+$/.test(cno.value)) {
		cno.value = cno.value.slice(0, -1);
	}
	if (cno.value.trim().length > 10) {
		cno.value = cno.value.slice(0, 10);
	}
});
validfrom.addEventListener('input', () => {
	if (!/^[\d\/]*$/.test(validfrom.value)) {
		validfrom.value = validfrom.value.slice(0, -1);
	}
});
validto.addEventListener('input', () => {
	if (!/^[\d\/]*$/.test(validto.value)) {
		validto.value = validto.value.slice(0, -1);
	}
});
$(document).ready(function() {
	$('#valid_from').datepicker({
		format: "dd/mm/yyyy",
		autoclose: true
	});
	$('#valid_to').datepicker({
		format: "dd/mm/yyyy",
		autoclose: true
	});

	$('#valid_from').on('change', function() {
		const validFrom = $(this).val().trim();
		const [fromDay, fromMonth, fromYear] = validFrom.split('/').map(Number);
		const fromDate = new Date(fromYear, fromMonth - 1, fromDay);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (fromDate.getTime() !== today.getTime()) {
			alert("You must select today's date for 'Valid From'.");
			$(this).val('');
			return;
		}

		$('#valid_to').datepicker('setStartDate', today);
	});

	$('#valid_to').on('change', function() {
		const validFrom = $('#valid_from').val().trim();
		const validTo = $(this).val().trim();

		if (validFrom.length === 0) {
			alert("Please enter 'Valid From' date first.");
			$(this).val('');
			return;
		}

		const [fromDay, fromMonth, fromYear] = validFrom.split('/').map(Number);
		const [toDay, toMonth, toYear] = validTo.split('/').map(Number);

		const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
		const toDate = new Date(toYear, toMonth - 1, toDay);

		if (toDate <= fromDate) {
			alert("'Valid To' date must be a future date after 'Valid From'.");
			$(this).val('');
		}
	});
});
//Clear input filed
cancelBtn.addEventListener("click", () => {
	clearInputFiled();
});
function clearInputFiled() {
	mst_ufname.value = "";
	mst_ulname.value = "";
	email.value = "";
	cno.value = "";
	gender.value = "0";
	$('.selectpicker').selectpicker('refresh');
	validfrom.value = "";
	validto.value = "";
	roles.value = "0";
	$('.selectpicker').selectpicker('refresh');
}
$('.deletebtn').on('click', function() {
	const uid = $(this).data('id');
	if (confirm("Are you sure want to delete data?")) {
		$.ajax({
			url: `/deleteudata/${uid}`,
			method: 'DELETE',
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success: function(response) {
				console.log(response.message);
				$(`#row-${uid}`).remove();
				alert("User data deleted successfully!!");
				window.location.href = '/master-users';
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					alert(errorResponse.message);
				} else if (response.status === 500) {
					alert("Server error occurred. Try again later.");
				}
			}
		});
	}
});
$('.editbtn').on('click', function() {
	const uid = $(this).data('id');
	$.ajax({
		url: `/fetchUData/${uid}`,
		method: 'POST',
		contentType: 'application/json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function(response) {
			console.log(response);
			if (response.length > 0) {
				const user = response[0];
				hiddenuid.value = user.id;
				mst_ufname.value = user.fname;
				mst_ulname.value = user.lname;
				email.value = user.email;
				cno.value = user.cno;
				if (user.gender = "male") {
					gender.value = "Male";
				} else {
					gender.value = "Female";
				}
				$('.selectpicker').selectpicker('refresh');
				validfrom.value = user.validfrom;
				validto.value = user.validto;
				roles.value = user.urole;
				$('.selectpicker').selectpicker('refresh');
				if (user.image) {
					add_edit_userimg.src = user.image;
				} else {
					add_edit_userimg.src = "assets/images/users/default_user.png";
				}
			}
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				alert(errorResponse.message);
			} else if (response.status === 500) {
				alert("Server error occurred while fetching user data.");
			}
		}
	});
});
addUserBtn.addEventListener("click", () => {
	add_edit_userimg.src = "assets/images/users/default_user.png";
	hiddenuid.value = "";
	clearInputFiled();
})
userImg.addEventListener("change", (event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			add_edit_userimg.src = e.target.result;
		};
		reader.readAsDataURL(file);
	} else {
		add_edit_userimg.src = "assets/images/users/default_user.png";
	}
});
removeImgBtn.addEventListener("click", () => {
	userImg.value = "";
	add_edit_userimg.src = "assets/images/users/default_user.png";
});