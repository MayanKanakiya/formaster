console.log("Fill form script running...")
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
const fillFormDropdown = document.getElementById("fillFormDropdown");
const searchbtn = document.getElementById("searchbtn");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const resetDropdown = document.getElementById("resetDropdown");
/*ID's selection for preview question*/
$(document).on("click", "#cancelBtn", function() {
	$("#all_question_preview .all_question_preview_div").remove();
	clearFillForm();
});
resetDropdown.addEventListener("click", () => {
	$("#all_question_preview .all_question_preview_div").remove();
	clearFillForm();
});
searchbtn.addEventListener("click", () => {
	if (fillFormDropdown.value == 0) {
		alert("Please select form name");
		return;
	} else {
		$.ajax({
			url: `/fetchFData/${fillFormDropdown.value}`,
			method: 'POST',
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success: function(response) {
				console.log(response);
				if (response.length > 0) {
					let formData = response[0];
					if ($("#all_question_preview .all_question_preview_div").length === 0) { 
					    $("#all_question_preview").append(`
						<div class="col-xl-12 col-lg-12 col-sm-12 colmspadding all_question_preview_div">
					        <div class="card">
					            <div class="card-header">
					                <h5 class="mb-0 font-bold mt-0">Fill Form</h5>
					            </div>
					            <div class="card-body" style="background-color: #F3F3F3;">
					            
					            </div>
					        </div></div>
					    `);
					}
					let previewQueBody = $("#all_question_preview .card-body");
					if ($("#all_question_preview .card-body div").length > 0) {
						$("#all_question_preview .card-body div.card").remove();
					}
					let formTitle = `
					<div class="row card">
									<div class="col-xl-12 col-lg-12 col-sm-12">
										<div class="detailsbg">
											<div class="row pr-2 pl-2">
												<div
													class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
													<p class="mb-1 font-weight-600">
														<span class="font-weight-700">Form Title:</span> <span id="previewFtitle">${formData.titletxt}</span>
													</p>

													<p class="mb-0 font-weight-600">
														<span class="font-weight-700">Description:</span> <span id="previewFDes">${formData.textdes}</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>`;
					previewQueBody.append(formTitle);
					formData.queData.forEach((que, index) => {
						let queWithLabel = { ...que, quelabel: `Q : ${index + 1}` };
						if (que.queType == 1) {
							let row = `
								<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>
												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0 text-justify">
														<p class="font-weight-700 mb-1 text-justify">
															<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span>${que.queName}
														</p>
														<p class="mb-1">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        ${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
													                <div class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
													                    <div class="custom-control custom-radio">
													                        <input type="radio" id="choice${index}" name="choicetwo" class="custom-control-input">
													                        <label class="custom-control-label font-weight-300 m-t-5" for="choice${index}">
													                            ${choice}
													                        </label>
													                    </div>
													                </div>
													            `).join('')
									: ''
								}
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>
								`;
							previewQueBody.append(row);
						} else if (que.queType == 2) {
							let row = `	<div class="card mb-2 queshadow">
									<div class="card-body">
										<div class="row pl-2 pr-2">
											<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
												<span class="question">${queWithLabel.quelabel}</span>
											</div>

											<div
												class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
												<div class="form-group mb-0">
													<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
													</p>
													<p class="mb-1 text-justify">${que.queDes}</p>
												</div>

												<div class="form-group mb-0">
													<div class="row pl-2 pr-2">
													${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
														<div
															class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
															<div class="custom-control custom-checkbox displayblock">
																<input type="checkbox" class="custom-control-input"
																	id="choiceckbox${index}"> <label
																	class="custom-control-label font-weight-300 m-t-5"
																	for="choiceckbox${index}">${choice}</label>
															</div>
														</div>
														`).join('')
									: ''
								}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 3) {
							let row = `<div class="card mb-2 queshadow">
												<div class="card-body">
													<div class="row pl-2 pr-2">
														<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
															<span class="question">${queWithLabel.quelabel}</span>
														</div>

														<div
															class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
															<div class="form-group mb-0">
																<p class="font-weight-700 mb-1 text-justify">
																	<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span>${que.queName}
																</p>
																<p class="mb-1 text-justify">${que.queDes}</p>
															</div>
															<div class="form-group mb-0">
																<div class="row pl-2 pr-2">
																	<div
																		class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																		<input type="text" class="form-control"
																			placeholder="Enter Your Answer">
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 4) {
							let row = `<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
															<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>

													<div class="form-group mb-0">
														<div class="row pl-2 pr-2">
															<div
																class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																<textarea class="form-control textareasize"
																	placeholder="Enter Your Answer"></textarea>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 5) {
							let row = `<div class="card mb-2 queshadow">	
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
															<select class="selectpicker" data-style="lineheight12 bg-transfer"
					                                            data-live-search="true">
					                                            <option value="" selected="selected">Select</option>
																${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
										                        <option value="${index}">${choice}</option>
										                    `).join('')
									: ''
								}
					                                        </select>
													        </div>
													    </div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
							$('.selectpicker').selectpicker('refresh');
						} else if (que.queType == 6) {
							let row = `<div class="card mb-2 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>
													<div class="form-group mb-0">
													    <div class="row pl-2 pr-2">
													        <div class="col-xl-7 col-lg-12 col-sm-12 col-xs-12 colmspadding">
													            <select class="selectpicker" multiple
													                data-selected-text-format="count"
													                data-style="btn-light bg-transfer"
													                data-actions-box="true">
													                <option value="0" selected="selected">Select</option>
													                ${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
													                        <option value="${index}">${choice}</option>
													                    `).join('')
									: ''
								}
													            </select>
													        </div>
													    </div>
													</div>

												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
							$('.selectpicker').selectpicker('refresh');
						} else if (que.queType == 7) {
							let row = `<div class="card mb-0 queshadow">
										<div class="card-body">
											<div class="row pl-2 pr-2">
												<div class="col-xl-1 col-lg-1 col-sm-2 col-xs-12 colmspadding">
													<span class="question">${queWithLabel.quelabel}</span>
												</div>

												<div
													class="col-xl-11 col-lg-11 col-sm-10 col-xs-12 colmspadding">
													<div class="form-group mb-0">
														<p class="font-weight-700 mb-1 text-justify">
														<span class="text-danger">${que.quereq == 1 ? "*" : ""}</span> ${que.queName}
														</p>
														<p class="mb-1 text-justify">${que.queDes}</p>
													</div>

													<div class="form-group mb-0">
														<div class="row pl-2 pr-2">
															<div
																class="col-xl-3 col-lg-12 col-sm-12 col-xs-12 colmspadding">
																<div class="input-group date">
																	<input type="text" class="form-control"
																		placeholder="dd/mm/yyyy" id="allpreview_date"> <span
																		class="input-group-addon inputgroups"> <i
																		class="mdi mdi-calendar"></i>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
						}
					});
					let row = `<div class="card mb-0 queshadow">
												<div class="card-body">
													<div class="row pl-2 pr-2 text-center">
														<div
															class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
															<a class="btn btn-success btn-padding mr-2" id="submitBtn"><i
																class="fa fa-floppy-o mr-2"></i>Submit</a> <a
																class="btn btn-success btn-padding mr-2"><i
																class="fa fa-print mr-2"></i>Print</a> <a
																class="btn btn-success btn-padding"  id="cancelBtn"><i
																class="fa fa-times mr-2"></i>Cancel</a>
														</div>
													</div>
												</div>
											</div>`;
					previewQueBody.append(row);
				}
			},
			error: function(response) {
				if (response.status === 400) {
					const errorResponse = JSON.parse(response.responseText);
					alert(errorResponse.message);
				} else if (response.status === 500) {
					alert("Server error occurred while fetching form data.");
				}
			}
		});
	}
});
function clearFillForm() {
	fillFormDropdown.value = "0";
	$('.selectpicker').selectpicker('refresh');
	if ($("#all_question_preview .card-body div").length > 0) {
		$("#all_question_preview .card-body div.card").remove();
	}
}
