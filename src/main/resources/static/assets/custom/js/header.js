var usertype = localStorage.getItem("email");

document.write("<div class='topbar-main'>");
document.write("<div class='container-fluid colmspadding'>");
document.write("<div class='logo'>");
document.write("<a href='javascript:void(0)' class='logo'>");
document.write("<img src='assets/images/e5logo.png' alt='' height='38' class='logo-large'>");
document.write("</a>");
document.write("</div>");
document.write("<div class='menu-extras topbar-custom'>");
document.write("<ul class='list-unstyled topbar-right-menu float-left mb-0'>");
document.write("<li class='menu-item'>");
document.write("<a class='navbar-toggle nav-link'>");
document.write("<div class='lines'>");
document.write("<span></span>");
document.write("<span></span>");
document.write("<span></span>");
document.write("</div>");
document.write("</a>");
document.write("</li>");
document.write("</ul>");
document.write("<ul class='list-unstyled topbar-right-menu float-right mb-0'>");

// document.write("<li class='notification-list hide-phone displaynone mr-2'>");
// document.write("<select class='selectpicker m-t-7' data-style='lineheight12 bg-transfer headerselect'>");
// document.write("<option selected='selected' value='' data-icon='fa fa-globe'>Language</option>");
// document.write("<option value='BST' data-icon='fa fa-language'>English</option>");
// document.write("<option value='CRP' data-icon='fa fa-language'>Gujarati</option>");
// document.write("</select>");
// document.write("</li>");

document.write("<li class='dropdown notification-list'>");
document.write("<a class='nav-link dropdown-toggle waves-effect nav-user' data-toggle='dropdown' href='#' role='button' aria-haspopup='false' aria-expanded='false'>");
document.write("<img src='assets/images/users/face.jpg' alt='user' class='rounded-circle'> <span class='ml-1 pro-user-name'>" + usertype + " <i class='mdi mdi-chevron-down'></i> </span>");
document.write("</a>");
document.write("<div class='dropdown-menu dropdown-menu-right profile-dropdown zoomIn animated'>");
document.write("<a href='/profile' class='dropdown-item notify-item border-0'>");
document.write("<i class='fa fa-user'></i> <span>Profile</span>");
document.write("</a>");
document.write("<a href='javascript:void(0)' class='dropdown-item notify-item border-0' data-toggle='modal' data-target='.changepasswordmodal'>");
document.write("<i class='fa fa-key'></i> <span>Change Password</span>");
document.write("</a>");

document.write("<a href='javascript:void(0)' class='dropdown-item notify-item border-0' onclick='logoutUser()'>");
document.write("<i class='fa fa-sign-out'></i> <span>Logout</span>");
document.write("</a>");

document.write("</div>");
document.write("</li>");
document.write("</ul>");
document.write("</div>");
document.write("<div class='clearfix'></div>");
document.write("</div>");
document.write("</div>");
function logoutUser() {
    var csrfToken = document.querySelector('meta[name="_csrf"]');
    if (!csrfToken) {
        alert("CSRF token not found! Logout may not work correctly.");
        return;
    }
    
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "/logout";
    
    var csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_csrf";
    csrfInput.value = csrfToken.content;
    
    form.appendChild(csrfInput);
    document.body.appendChild(form);
    form.submit();
}	