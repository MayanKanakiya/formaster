console.log("Fill form script running...")
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
const fillFormDropdown = document.getElementById("fillFormDropdown");
