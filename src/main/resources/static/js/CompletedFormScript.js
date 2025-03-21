console.log("Completed form script running")
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
const FormDes = document.getElementById("FormDes");
const FormTitle = document.getElementById("FormTitle");
const questionAsnwerDiv = $("#all_question_preview").find(".modal-body .questionAnsDivs");
$(document).on("click", ".dateView", function() {
	const fid = $(this).data('id');
	$.ajax({
		url: `/fetchFAns/${fid}`,
		method: 'POST',
		contentType: 'application/json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
			$(".preloader").show();
		},
		success: function(response) {
			console.log(response);
			if ($("#all_question_preview .modal-body .questionAnsDivs").length > 0) {
				$("#all_question_preview .modal-body .questionAnsDivs .card-body").remove();
			}
			response.forEach((row, index) => {
				FormTitle.innerHTML = row[0];
				FormDes.innerHTML = row[1];
				let rowDiv = `
				          <div class="card-body">
				              <div class="row pl-2 pr-2">
				                  <div class="col-xl-1 col-lg-1 col-sm-2 colmspadding">
				                      <span class="question">Q : ${index + 1}</span>
				                  </div>
				                  <div class="col-xl-11 col-lg-11 col-sm-10 colmspadding">
				                      <div class="form-group mb-0 text-justify">
				                          <p class="font-weight-700 mb-1 text-justify">
				                              <span class="text-danger">${row[3] == 1 ? "*" : ""}</span>${row[2]}
				                          </p>
				                          <p class="mb-1">${row[4]}</p>
				                      </div>
				                      <div class="form-group mb-0">
				                          <div class="row pl-2 pr-2">
				                              <div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
				                                  <p class="font-weight-700 mb-1 text-justify">Answer</p>
				                                  <p class="mb-1 text-justify">${row[5]}</p>
				                              </div>
				                          </div>
				                      </div>
				                  </div>
				              </div>
				          </div>
				      `;
				questionAsnwerDiv.append(rowDiv);
			});
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure("Server error occurred while fetching form data.")
			}
		},
		complete: function() {
			$(".preloader").hide();
		}
	});
});