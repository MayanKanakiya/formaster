<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.SimpleDateFormat"%>
<!DOCTYPE html>
<html lang="en">

<head>

<title>Completed Form</title>
<meta charset='utf-8' />
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<meta http-equiv='Cache-Control'
	content='no-cache, no-store, must-revalidate' />
<meta http-equiv='X-UA-Compatible' content='IE=edge' />
<meta http-equiv='Pragma' content='no-cache'>

<!-- App favicon -->
<link rel="shortcut icon" href="assets/images/favicon.png">

<!-- Common css -->
<script src="assets/custom/plugins/theme/mytheme.js"></script>
<link rel="stylesheet" type="text/css"
	href="assets/custom/css/import.css">
<link rel="stylesheet" type="text/css"
	href="assets/custom/css/responsive.css">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<script src="assets/js/modernizr.min.js"></script>

</head>

<body
	class="background-image-body background1 square scrollbar-dusty-grass square thin">
	<div class="preloader"></div>
	<!-- Navigation Bar-->
	<header id="topnav">
		<!-- end topbar-main -->
		<%
		String userRole = (String) session.getAttribute("userRole");
		%>
		<script>
   		var usertype = "<%=userRole%>";
		</script>
		<%
		String fname = (String) session.getAttribute("fname");
		%>
		<script>
   		var fname = "<%=fname%>";
		</script>
		<script src="assets/custom/js/header.js"></script>
		<script src="assets/custom/js/menu.js"></script>
	</header>
	<!-- End Navigation Bar-->
	<div class="wrapper wrapper-top">
		<div class="container-fluid">

			<div class="fixed-plugin">
				<div class="dropdown show-dropdown">
					<a href="#" data-toggle="dropdown"> <i class="fa fa-cog fa-2x">
					</i>
					</a>

					<ul class="dropdown-menu">
						<li class="header-title">theme settings</li>
						<li class="adjustments-line"><a href="javascript:void(0)"
							class="switch-trigger active-color">
								<div class="badge-colors ml-auto mr-auto text-center"
									id="themeColorName">
									<span class="badge filter badge-azure purplelable"
										id="bluecolor" title="Blue"></span> <span
										class="badge filter badge-warning yellowlable"
										id="yellowcolor" title="Yellow"></span> <span
										class="badge filter badge-green dbluelable" id="greencolor"
										title="Green"></span> <span
										class="badge filter badge-danger bluelable" id="redcolor"
										title="Red"></span>
								</div>
								<div class="clearfix"></div>
						</a></li>

						<li class="header-title mb-0">Background</li>
						<li class="adjustments-line more-height"><a
							href="javascript:void(0)" class="switch-trigger active-color">
								<div class="badge-colors ml-auto mr-auto text-center"
									id="imagechanges">
									<span class="image-change-button1"> <img
										src="assets/custom/images/theme-background/background1.jpg"
										class="imgactive" alt="BG1">
									</span> <span class="image-change-button2"> <img
										src="assets/custom/images/theme-background/background2.jpg"
										alt="BG2">
									</span> <span class="image-change-button3"> <img
										src="assets/custom/images/theme-background/background3.jpg"
										alt="BG3">
									</span> <span class="image-change-button4"> <img
										src="assets/custom/images/theme-background/background4.jpg"
										alt="BG4">
									</span>
								</div>
						</a></li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
					<div class="card">
						<div class="card-header">
							<h5 class="mb-0 font-bold mt-0">Completed Form</h5>
						</div>

						<div class="card-body">
							<div class="row">
								<div class="col-xl-12 col-lg-12 col-sm-12">
									<table id="form_datatable"
										class="table nowrap table-custom-hover">
										<thead>
											<tr>
												<th>Completed Date</th>
												<th>Form #</th>
												<th>Form Name</th>
												<th>Created By</th>
												<th class="text-center">Preview</th>
											</tr>
										</thead>
										<tbody>
											<%!String formattedDate;%>
											<%
											List<Object[]> formCompletedData = (List<Object[]>) request.getAttribute("formCompletedData");
											Date currentDate = new Date();
											SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

											if (formCompletedData != null) {
												for (Object[] row : formCompletedData) {
													Date submittedDate = (Date) row[0];
													formattedDate = formatter.format(submittedDate);
											%>
											<tr>
												<td><%=formattedDate%></td>
												<td>F0RM-<%=row[1]%></td>
												<td><%=row[2]%></td>
												<td><%=row[3]%> <%=row[4]%></td>
												<td class="text-center"><span data-toggle="modal"
													data-target="#all_question_preview"><a
														href="javascript:void(0)" data-toggle="tooltip"
														data-placement="bottom" data-id="<%=row[1]%>" title=""
														data-original-title="Preview"
														class="text-info fa-size dateView"><i
															class="fa fa-eye"></i></a></span></td>
											</tr>
											<%
											}
											} else {
											%>
											<tr>
												<td colspan="5">No data found</td>
											</tr>
											<%
											}
											%>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal modal-right fade" id="all_question_preview"
		tabindex="-1">
		<div class="modal-dialog modal-right-width">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Question Preview</h4>
					<button type="button" class="close" data-dismiss="modal">
						<span>x</span>
					</button>
				</div>

				<div class="modal-body" style="background-color: #F3F3F3;">
					<div class="card mb-2 queshadow">
						<div class="card-body">
							<div class="row pr-3 pl-3">
								<div class="col-xl-4 col-lg-4 col-sm-4 colmspadding">
									<p class="compact mb-1">
										<span class="font-weight-700">Completed Date</span><span
											class="displayblock font-medium-2" id="showDate"></span>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="detailsbg">
						<div class="row pr-2 pl-2">
							<div class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
								<p class="mb-1 font-weight-600">
									<span class="font-weight-700">Form Title:</span> <span id="FormTitle">Form
										Title</span>
								</p>

								<p class="mb-0 font-weight-600">
									<span class="font-weight-700">Description:</span> <span id="FormDes">Form
										description</span>
								</p>
							</div>
						</div>
					</div>

					<div class="card mb-2 queshadow questionAnsDivs">
				
					</div>
				</div>

				<div class="modal-footer bg-white">
					<a class="btn btn-success float-right btn-padding"
						data-dismiss="modal"><i class="fa fa-times mr-2"></i>Close</a>
				</div>
			</div>
		</div>
	</div>

	<script src="assets/custom/js/footer.js"></script>

	<!-- jQuery  -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/waves.js"></script>
	<script src="assets/js/jquery.slimscroll.js"></script>
	<script src="/assets/custom/plugins/jquery_toastr/jquery.toast.min.js"></script>

	<!-- Required datatable js -->
	<script
		src="assets/custom/plugins/datatable/js/jquery.dataTables.min.js"></script>
	<script src="assets/custom/plugins/datatable/js/fixcolumn.js"></script>
	<script
		src="assets/custom/plugins/datatable/Responsive/js/dataTables.responsive.js"></script>

	<script src="assets/plugins/bootstrap-select/js/bootstrap-select.js"></script>

	<script src="assets/custom/plugins/typeahead/js/bootstrap-typeahead.js"></script>
	<script src="assets/plugins/moment/moment.js"></script>
	<script
		src="assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
	<script
		src="assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>

	<!-- App js -->
	<script src="assets/js/jquery.core.js"></script>
	<script src="assets/js/jquery.app.js"></script>

	<script src="assets/custom/js/custom.js"></script>
	<script src="assets/custom/plugins/image_change/image-change.js"></script>
	<script
		src="assets/custom/plugins/jquery_confirm_v3/jquery-confirm.min.js"></script>
	<script
		src="assets/custom/plugins/jquery_confirm_v3/jquery-confirm-custom.js"></script>

	<script
		src="assets/custom/plugins/jasny-bootstrap/dist/js/jasny-bootstrap.min.js"></script>

	<script src="assets/custom/js/commonmodal.js"></script>
	<script>
	$(document).ready(function() {
	    $(document).on("click", ".dateView", function(event) {
	        event.preventDefault();
	        var rowIndex = $(this).closest("tr").index();
	        var date = $("#form_datatable tr:eq(" + (rowIndex + 1) + ") td:eq(0)").text().trim();
	        $("#showDate").text(date);
	    });
	});
	</script>
	<script>
		$('#ans_date').closest('div').datepicker({
			autoclose : true,
			todayHighlight : true,
			format : "dd/mm/yyyy",
			clearBtn : true
		});

		$('#allpreview_date').closest('div').datepicker({
			autoclose : true,
			todayHighlight : true,
			format : "dd/mm/yyyy",
			clearBtn : true
		});

		$('#date_from').closest('div').datepicker({
			autoclose : true,
			todayHighlight : true,
			format : "dd/mm/yyyy",
			clearBtn : true
		});

		var formtable = $('#form_datatable').DataTable({
			destroy : true,
			scrollX : true,
			"bAutoWidth" : true,
			paging : true,
			"bLengthChange" : false,
			"columnDefs" : [ {
				"targets" : 2,
				"orderable" : false
			} ],
			"pageLength" : 10,
			fixedColumns : {
				rightColumns : 1,
				leftColumns : 0
			},
			language : {
				paginate : {
					next : '<i class="fa fa-angle-double-right">',
					previous : '<i class="fa fa-angle-double-left">'
				}
			},
			"dom" : '<"top"pif>rt<"clear">'
		});

		$("#searchbtn").click(function() {
			$("#searchcollapse").trigger('click');
		});
	</script>
	<script src="js/CompletedFormScript.js"></script>
	<script src="js/ToastScript.js"></script>
</body>

</html>