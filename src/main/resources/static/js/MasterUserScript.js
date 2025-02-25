console.log("Master User Script Running");
const mst_ufname = document.getElementById("fname");
const mst_ulname = document.getElementById("lname");
const email = document.getElementById("email");
const cno = document.getElementById("cno");
const gender = document.getElementById("gender");
const validfrom = document.getElementById("valid_from");
const validto = document.getElementById("valid_to");
const roles = document.getElementById("roles");
const userSaveBtn = document.getElementById("userSaveBtn");
const cancelBtn = document.getElementById("cancelBtn");

userSaveBtn.addEventListener("click", () => {
	if (mst_ufname.value.trim().length == 0) {
		alert("Please enter first name");
		return;
	}
	if (!/^(?! )[A-Za-z]+( [A-Za-z]+)*$/.test(mst_ufname.value)) {
		alert("Enter first name without any extra spaces..");
		mst_ufname.value = '';
		return;
	}
	if (mst_ufname.value.trim().length <= 1) {
		alert("First name more than 1 characters");
		return;
	}
	if (mst_ulname.value.trim().length == 0) {
		alert("Please enter last name");
		return;
	}
	if (!/^(?! )[A-Za-z]+( [A-Za-z]+)*$/.test(mst_ulname.value)) {
		alert("Enter last name without any extra spaces..");
		mst_ulname.value = '';
		return;
	}
	if (mst_ulname.value.trim().length <= 2) {
		alert("Last name more than 2 characters");
		return;
	}
	if (email.value.trim().length == 0) {
		alert("Please enter email")
		return;
	}
	if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
		alert("Please enter valid Email...")
		return;
	}
	if (cno.value.trim().length > 0) {
		if (cno.value.trim().length < 10) {
			alert("Contact number should be 10 digit");
			return;
		}
	}
	if (gender.value === "0") {
		alert("Please select gender");
		return;
	}
	if (validfrom.value.trim().length > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(validfrom.value)) {
			alert("Invalid date format. Please use DD/MM/YYYY.");
			validfrom.value = '';
			return;
		}
	}
	if (validfrom.value.trim().length > 0) {
		if (validto.value.trim().length == 0) {
			alert("Please enter Valid to date")
			return;
		}
	}
	if (validto.value.trim().lengt > 0) {
		if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.test(validto.value)) {
			alert("Invalid date format. Please use DD/MM/YYYY.");
			validto.value = '';
			return;
		}
	}
	if (validto.value.trim().length > 0) {
		if (validfrom.value.trim().length == 0) {
			alert("Please enter Valid from date")
			return;
		}
	}
	if (roles.value === "0") {
		alert("Please select user role");
		return;
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
	} s
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
