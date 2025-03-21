function showAlertSuccess(message) {
	$.toast({
		heading: 'Success!',
		text: message,
		position: 'top-right',
		loaderBg: '#3b98b5',
		icon: 'success',
		hideAfter: 3000,
		stack: 1,
		className: 'custom-toast'
	});
}
function showAlertFailure(message) {
	$.toast({
		heading: 'Error!',
		text: message,
		position: 'top-right',
		loaderBg: '#bf441d',
		icon: 'error',
		hideAfter: 3000,
		stack: 1,
		className: 'custom-toast'
	});
}
function showDeleteConfirmation(onConfirm) {
    $.confirm({
        title: 'Delete Record..!',
        content: 'Please be sure before deleting record',
        theme: 'material',
        icon: 'fa fa-warning',
        type: 'red',
        buttons: {
            delete: {
                text: 'Delete',
                btnClass: 'btn-red',
                action: function() {
                    if (typeof onConfirm === "function") {
                        onConfirm();
                    }
                }
            },
            cancel: {
                text: 'Cancel',
                action: function() {
                    console.log("Delete canceled!");
                }
            }
        }
    });
}
/*$.toast({
	heading: 'Oh snap!',
	text: 'Change a few things up and try submitting again.',
	position: 'top-right',
	loaderBg: '#bf441d',
	icon: 'error',
	hideAfter: 3000,
	stack: 1
});
$.toast({
	heading: 'Holy guacamole!',
	text: 'You should check in on some of those fields below.',
	position: 'top-right',
	loaderBg: '#da8609',
	icon: 'warning',
	hideAfter: 3000,
	stack: 1
});*/
