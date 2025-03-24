console.log("Fill form script running...")
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
const fillFormDropdown = document.getElementById("fillFormDropdown");
const searchbtn = document.getElementById("searchbtn");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const resetDropdown = document.getElementById("resetDropdown");
let answerArray = [];
let isValid = true;
let answerData;
searchbtn.addEventListener("click", () => {
	if (fillFormDropdown.value == 0) {
		showAlertFailure('Please select form name');
		return;
	} else {
		$.ajax({
			url: `/fetchFData/${fillFormDropdown.value}`,
			method: 'POST',
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader(header, token);
				$(".preloader").show();
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
						answerArray.push(que)
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
													                        <input type="radio" id="choice${index + 1}" value="${choice}" name="choiceRadio" class="custom-control-input">
													                        <label class="custom-control-label font-weight-300 m-t-5" for="choice${index + 1}">
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
													${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
														<div
															class="col-xl-3 col-lg-3 col-sm-3 col-xs-12 colmspadding">
															<div class="custom-control custom-checkbox displayblock">
																<input type="checkbox" value="${choice}" class="custom-control-input"
																	id="choiceckbox${index + 1}"> <label
																	class="custom-control-label font-weight-300 m-t-5"
																	for="choiceckbox${index + 1}">${choice}</label>
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
							let row = `<div class="card mb-2 queshadow" id="question-${index}">
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
																		${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
																		        <input type="text" class="form-control singleTxt" name="singleTxt" maxlength="50" minlength="3"
																		            placeholder="${choice == '1' ? 'Enter Answer with all characters' :
											choice == '2' ? 'Enter Answer with only characters' :
												choice == '3' ? 'Enter Answer with only alphabets' :
													choice == '4' ? 'Enter Answer with alphabet & number' : 'Enter Your Answer'}">
																		    `).join('')
									: ''
								}

																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 4) {
							let row = `<div class="card mb-2 queshadow" id="question-${index}">
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
																${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
																        <textarea class="form-control textareasize multiTxt" maxlength="50" minlength="3" name="multiTxt" placeholder="${choice == '1' ? 'Enter Answer with all characters' :
											choice == '2' ? 'Enter Answer with only characters' :
												choice == '3' ? 'Enter Answer with only alphabets' :
													choice == '4' ? 'Enter Answer with alphabet & number' : 'Enter Your Answer'
										}"></textarea>`).join('')
									: ''}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>`;
							previewQueBody.append(row);
						} else if (que.queType == 5) {
							let row = `<div class="card mb-2 queshadow" id="question-${index}">	
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
					                                            <option value="0" selected="selected">Select</option>
																${que.questions && que.questions.length > 0
									? que.questions.map((choice, index) => `
										                        <option value="${choice}">${choice}</option>
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
							let row = `<div class="card mb-2 queshadow" id="question-${index}">
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
													                        <option value="${choice}">${choice}</option>
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
																	<input type="text" class="form-control datepicker"
																		placeholder="dd/mm/yyyy" id="date_from"> <span
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
					showAlertFailure(errorResponse.message)
				} else if (response.status === 500) {
					showAlertFailure('Server error occurred while fetching form data.')
				}
			},
			complete: function() {
				$(".preloader").hide();
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
$(document).on("click", "#cancelBtn", function() {
	$("#all_question_preview .all_question_preview_div").remove();
	clearFillForm();
});
resetDropdown.addEventListener("click", () => {
	$("#all_question_preview .all_question_preview_div").remove();
	clearFillForm();
});
$(document).on("click", "#submitBtn", function() {
	/*console.log("Answer Array with values:", answerArray);*/
	let storedAnswers = [];
	console.log(answerArray)
	for (let i = 0; i < answerArray.length; i++) {
		let obj = { quelabel: answerArray[i].quelabel, answer: "", fid: fillFormDropdown.value };

		if (answerArray[i].queType == "7") {
			let dateValue = $("#date_from").val();
			if (answerArray[i].quereq == 1) {
				if (dateValue.length === 0) {
					showAlertFailure('Date cannot be empty!');
					return false;
				}

				let datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
				if (!datePattern.test(dateValue)) {
					showAlertFailure('Please enter a valid date in dd/mm/yyyy format!');
					return false;
				}
			}
			obj.answer = dateValue;
		}
		else if (answerArray[i].queType == "1") {
			let selectedOption = $("input[name='choiceRadio']:checked").val();
			if (answerArray[i].quereq == 1) {
				if (!selectedOption) {
					showAlertFailure('Please select one radio button!');
					return false;
				}
			}
			if (selectedOption == undefined) {
				obj.answer = '';
			} else {
				obj.answer = selectedOption;
			}
		}
		else if (answerArray[i].queType == "2") {
			let selectedCheckboxes = [];
			$("input[type='checkbox']:checked").each(function() {
				selectedCheckboxes.push($(this).val());
			});
			if (answerArray[i].quereq == 1) {
				if (selectedCheckboxes.length === 0) {
					showAlertFailure('Please select at least one checkbox!');
					return false;
				}
			}
			obj.answer = selectedCheckboxes.join(", ");
		}
		else if (answerArray[i].queType == "3") {
			let questionContainer = document.getElementById(`question-${i}`);
			if (!questionContainer) {
				return false;
			}
			let textInputs = questionContainer.querySelectorAll(".singleTxt");
			let textValue;

			for (let index = 0; index < textInputs.length; index++) {
				textValue = textInputs[index].value.trim();
				if (answerArray[i].quereq == 1) {
					if (!textValue) {
						showAlertFailure(`Input text cannot empty`);
						return false;
					}

					let pattern;
					let questionType = answerArray[i].questions ? answerArray[i].questions[index] : "";

					switch (questionType) {
						case "1":
							pattern = /^[\s\S]+$/;
							break;
						case "2":
							pattern = /^[a-zA-Z]+$/;
							break;
						case "3":
							pattern = /^[a-zA-Z\s]+$/;
							break;
						case "4":
							pattern = /^[a-zA-Z0-9]+$/;
							break;
						default:
							pattern = /^[\s\S]+$/;
					}
					if (!pattern.test(textValue)) {
						showAlertFailure(`Please enter text into specify format`);
						return false;
					}
				}
			}
			obj.answer = textValue;
		} else if (answerArray[i].queType == "4") {
			let questionContainer = document.getElementById(`question-${i}`);
			let textareas = questionContainer.querySelectorAll(".multiTxt");
			let textareaValue;

			for (let index = 0; index < textareas.length; index++) {
				textareaValue = textareas[index].value.trim();
				if (answerArray[i].quereq == 1) {
					if (!textareaValue) {
						showAlertFailure(`Textarea input cannot be empty!`);
						return false;
					}

					let pattern;
					let questionType = answerArray[i].questions ? answerArray[i].questions[index] : "";

					switch (questionType) {
						case "1":
							pattern = /^[\s\S]+$/;
							break;
						case "2":
							pattern = /^[a-zA-Z]+$/;
							break;
						case "3":
							pattern = /^[a-zA-Z\s]+$/;
							break;
						case "4":
							pattern = /^[a-zA-Z0-9]+$/;
							break;
						default:
							pattern = /^[\s\S]+$/;
					}

					if (!pattern.test(textareaValue)) {
						showAlertFailure(`Please enter text into specify format`);
						return false;
					}
				}
			}
			obj.answer = textareaValue;
		} else if (answerArray[i].queType == "5") {

			let questionContainer = document.getElementById(`question-${i}`);
			let selectElement = questionContainer.querySelector(".selectpicker")
			let selectedValue = selectElement.value;
			if (answerArray[i].quereq == 1) {
				if (selectedValue === "0") {
					showAlertFailure("Please select dropdown");
					return false;
				}
			}
			if (selectedValue === "0") {
				obj.answer = '';
			} else {
				obj.answer = selectedValue;
			}

		} else if (answerArray[i].queType == "6") {

			let questionContainer = document.getElementById(`question-${i}`);
			let selectElement = questionContainer.querySelector(".selectpicker");

			let selectedItems = [];
			for (let option of selectElement.selectedOptions) {
				if (option.value !== "0") {
					selectedItems.push(option.text.trim());
				}
			}
			if (answerArray[i].quereq == 1) {
				if (selectedItems.value === "0") {
					showAlertFailure("Please select(multiple select) valid dropdown option!");
					return false;
				}
			}
			obj.answer = selectedItems.join(", ");
		}
		storedAnswers.push(obj);
	}
	console.log("Stored Answers:", storedAnswers);
	$.ajax({
		url: "/saveAnswer",
		method: 'POST',
		data: JSON.stringify({ answersList: storedAnswers }),
		contentType: "application/json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader(header, token);
			$(".preloader").show();
		},
		success: function(response) {
			console.log(response)
			showAlertSuccess(response.message)
			setTimeout(() => {
				window.location.href = "/fill-forms";
			}, 4000);
		},
		error: function(response) {
			if (response.status === 400) {
				const errorResponse = JSON.parse(response.responseText);
				showAlertFailure(errorResponse.message)
			} else if (response.status === 500) {
				showAlertFailure('Server error occurred while saving create form.')
			}
		},
		complete: function() {
			$(".preloader").hide();
		}
	});
});
$(document).on("focus", ".datepicker", function() {
	$(this).datepicker({
		autoclose: true,
		todayHighlight: true,
		format: "dd/mm/yyyy",
		clearBtn: true
	}).datepicker("show");
});