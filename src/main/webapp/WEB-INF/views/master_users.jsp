<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="com.formaster.loginuser.UserDTO"%>
<%@page import="java.io.File"%>
<!DOCTYPE html>
<html lang="en">

<head>

<title>Users</title>
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
	href="assets/custom/plugins/icheck/css/icheck.css">
<link rel="stylesheet" type="text/css"
	href="assets/custom/plugins/icheck/css/custom.css">
<link rel="stylesheet" type="text/css"
	href="assets/custom/plugins/icheck/css/checkboxes-radios.css">
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

			<div id="portfolio_details">
				<div class="row">
					<div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
						<div id="accordion1" role="tablist" aria-multiselectable="true"
							class="mb-2">
							<div class="card collapse-icon accordion-icon-rotate">
								<div class="card-header" role="tab" id="headingOne1">
									<h5 class="mb-0 mt-0">
										<a data-toggle="collapse" data-parent="#accordion1"
											href="#collapseOne1" class="text-dark atag ml-4"
											aria-expanded="true" aria-controls="collapseOne1"
											id="searchcollapse"> Search Criteria </a>
									</h5>
								</div>

								<div id="collapseOne1" class="collapse show" role="tabpanel"
									aria-labelledby="headingOne1">
									<div class="card-body pl-3 pr-3">

										<div class="row">
											<div
												class="col-xl-2 col-lg-2 col-sm-4 col-xs-12 colmspadding">
												<div class="form-group mb-0">
													<label class="mb-1">Name</label> <input type="text"
														class="form-control" id="searchTxt">
												</div>
											</div>

											<div
												class="col-xl-2 col-lg-2 col-sm-4 col-xs-12 colmspadding">
												<div class="form-group mb-0">
													<label class="mb-1">Role</label> <select
														class="selectpicker" data-style="lineheight12 bg-transfer"
														data-live-search="true" id="searchRole">
														<option value="0" selected="selected">Select</option>
														<option value="Admin">Admin</option>
														<option value="User">User</option>
													</select>
												</div>
											</div>

											<div
												class="col-xl-2 col-lg-3 col-sm-3 col-xs-12 mb-0 btntop colmspadding">
												<div class="form-group mb-0">
													<a
														class="save_form_details btn btn-success text-white btn-padding"
														id="searchbtn"><i class="fa fa-search mr-2"></i>Search</a>

													<a
														class="show-details-table btn btn-danger text-white btn-padding ml-1"
														id="searchReset"><i class="fa fa-refresh mr-2"></i>Reset</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
						<div class="card">
							<div class="card-header">
								<div class="row">
									<div class="col-xl-8 col-lg-8 col-sm-8">
										<h5 class="mb-0 font-bold m-t-5">Users</h5>
									</div>
									<div class="col-xl-4 col-lg-4 col-sm-4">
										<a href="javascript:void(0)"
											class="btn btn-warning waves-effect float-right btn-padding client_add_btn"
											id="addUserBtn"><i class="fa fa-plus"></i> Add Users</a>
									</div>
								</div>
							</div>

							<div class="card-body">
								<div class="row">
									<div class="col-xl-12 col-lg-12 col-sm-12">
										<table id="users_datatable"
											class="table nowrap table-custom-hover">
											<thead>
												<tr>
													<th>User Name</th>
													<th>Email Id</th>
													<th>Contact No.</th>
													<th>Valid From</th>
													<th>Valid To</th>
													<th>Gender</th>
													<th>Role</th>
													<th>Active</th>
													<th class="text-center">Action</th>
												</tr>
											</thead>
											<tbody>
												<%
												List<UserDTO> userData = (List<UserDTO>) request.getAttribute("userList");
												if (!userData.isEmpty()) {
													for (UserDTO udata : userData) {
												%>
												<tr id="row-<%=udata.getId()%>">
													<td class="text-center">
														<h2 class="table-avatar">
															<a href="javascript:void(0)" data-toggle="popover"
																data-trigger="hover" data-html="true"
																data-placement="right"
																data-template="<div class='popover fade bs-popover-right' role='tooltip';
																x-placement='right'>
																<div class='arrow'></div>
																<h3 class='popover-header p-0 border_radius6'></h3>
																</div>" data-title="<img
																src='<%=(udata.getImage() != null && !udata.getImage().trim().isEmpty())
		? udata.getImage()
		: "/assets/custom/images/noimage.png"%>'
																width='150' height='150' class='border_radius6'>"
																data-original-title="" title=""> <img
																src="<%=(udata.getImage() != null && !udata.getImage().trim().isEmpty())
		? udata.getImage()
		: "/assets/custom/images/noimage.png"%>"
																alt="" class="img-radius avatar"> </a> <span><%=udata.getFname()%>
																<%=udata.getLname()%> </span>
														</h2>
													</td>
													<td><%=udata.getEmail()%></td>
													<td><%=udata.getCno() != null && !udata.getCno().isEmpty() ? udata.getCno() : "Null"%></td>
													<td><%=udata.getValidfrom() != null && !udata.getValidfrom().isEmpty() ? udata.getValidfrom() : "Null"%></td>
													<td><%=udata.getValidto() != null && !udata.getValidto().isEmpty() ? udata.getValidto() : "Null"%></td>
													<td><%=udata.getGender()%></td>
													<td><%=udata.getUrole() == 1 ? "Admin" : "User"%></td>
													<td><%=udata.getActive() == 1 ? "Yes" : "No"%></td>

													<td class="text-center"><a href="javascript:void(0)"
														data-toggle="tooltip" data-placement="bottom"
														data-original-title="Edit"
														class="text-success fa-size client_add_btn editbtn"
														data-id="<%=udata.getId()%>"><i class="fa fa-pencil"></i></a>
														<!-- class="delete-user-alert" --> <span><a
															href="javascript:void(0)"
															class="text-danger fa-size deletebtn"
															data-toggle="tooltip" data-placement="bottom"
															data-original-title="Delete" data-id="<%=udata.getId()%>">
																<i class="fa fa-trash"></i>
														</a></span></td>
												</tr>
												<%
												}
												} else {
												%>
												<tr>
													<td colspan="9" style="text-align: center;">Table is
														empty.</td>
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

			<div class="row" id="portfolio_add_detail" style="display: none;">
				<div class="col-xl-12 col-lg-12 col-sm-12 colmspadding">
					<div class="card mb-0">
						<div class="card-header">
							<div class="row">
								<div class="col-xl-8 col-lg-8 col-sm-8">
									<h5 class="mb-0 font-bold m-t-5">Add Users</h5>
								</div>
								<div class="col-xl-4 col-lg-4 col-sm-4">
									<a
										class="show_port_table btn btn-warning float-right btn-padding"><i
										class="fa fa-undo mr-1"></i> Move Back</a>
								</div>
							</div>
						</div>

						<div class="card-body pl-2 pr-2 pb-0 pt-0">
							<div class="row pl-2 pr-2">
								<div
									class="col-xl-2 col-lg-3 col-sm-4 col-xs-12 colmspadding text-center">
									<div>
										<img src="" class="mt-2 userimg" width="155"
											id="add_edit_userimg">
									</div>

									<div class="btn btn-success text-white btn-padding mt-2"
										style="position: relative; overflow: hidden;">
										<i class="fa fa-upload mr-2"></i> Upload <input type="file"
											name="file" id="userImg" accept=".jpg,.jpeg,.png"
											style="opacity: 0; right: 0; position: absolute;">
									</div>

									<div class="btn btn-success text-white btn-padding mt-2 ml-1"
										id="removeImgBtn">
										<i class="fa fa-trash mr-2"></i> Remove
									</div>
								</div>

								<div class="col-xl-10 col-lg-9 col-sm-8 col-xs-12 colmspadding">
									<div class="row pl-2 pr-2">
										<div
											class="col-xl-12 col-lg-12 col-sm-12 col-xs-12 colmspadding">
											<h5
												class="mt-1 border-bottom font-weight-600 pb-1 mb-1 text-info">Basic
												Details</h5>
										</div>
									</div>

									<div class="row pl-2 pr-2 pt-1">
										<div class="col-xl-3 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<input type="hidden" class="form-control" id="hiddenuid">
											<div class="form-group">
												<label>First Name<span class="text-danger ml-1">*</span></label>
												<input type="text" class="form-control" id="fname">
											</div>
										</div>

										<div class="col-xl-3 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<div class="form-group">
												<label>Last Name<span class="text-danger ml-1">*</span></label>
												<input type="text" class="form-control" id="lname">
											</div>
										</div>
									</div>

									<div class="row pl-2 pr-2">
										<div class="col-xl-4 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<div class="form-group">
												<label>Email<span class="text-danger ml-1">*</span></label>
												<input type="text" class="form-control" id="email">
											</div>
										</div>

										<div class="col-xl-2 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<div class="form-group">
												<label>Contact No.</label> <input type="text"
													class="form-control" id="cno">
											</div>
										</div>

										<div class="col-xl-2 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<div class="form-group">
												<label>Gender<span class="text-danger ml-1">*</span></label>
												<select class="selectpicker"
													data-style="lineheight12 bg-transfer"
													data-live-search="true" id="gender">
													<option value="0" selected="selected">Select</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</select>
											</div>
										</div>
									</div>

									<div class="row pl-2 pr-2">
										<div class="col-xl-3 col-lg-3 col-sm-5 colmspadding">
											<div class="row pl-2 pr-2">
												<div class="col-xl-6 col-lg-6 col-sm-6 colmspadding">
													<div class="form-group mb-0">
														<label>Valid From</label>
														<div class="input-group date">
															<input type="text" class="form-control"
																placeholder="dd/mm/yyyy" id="valid_from"> <span
																class="input-group-addon inputgroups"> <i
																class="mdi mdi-calendar"></i>
															</span>
														</div>
													</div>
												</div>
												<div class="col-xl-6 col-lg-6 col-sm-6 colmspadding">
													<div class="form-group mb-0">
														<label>Valid To</label>
														<div class="input-group date">
															<input type="text" class="form-control"
																placeholder="dd/mm/yyyy" id="valid_to"> <span
																class="input-group-addon inputgroups"> <i
																class="mdi mdi-calendar"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="col-xl-2 col-lg-4 col-sm-4 col-xs-12 colmspadding">
											<div class="form-group">
												<label>Role<span class="text-danger ml-1">*</span></label> <select
													class="selectpicker" data-style="lineheight12 bg-transfer"
													data-live-search="true" id="roles">
													<option value="0" selected="selected">Select</option>
													<option value="1">Admin</option>
													<option value="2">User</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="text-center border-top mt-1 pt-2 mb-2">
								<!-- save_port_details -->
								<a class="btn btn-success text-white btn-padding"
									id="userSaveBtn"><i class="fa fa-floppy-o mr-2"></i>Save</a> <a
									class="show_port_table btn btn-danger text-white btn-padding ml-1"
									id="cancelBtn"><i class="fa fa-times mr-2"></i>Cancel</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end wrapper -->

	<script src="assets/custom/js/footer.js"></script>

	<!-- jQuery  -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/waves.js"></script>
	<script src="assets/js/jquery.slimscroll.js"></script>

	<!-- Required datatable js -->
	<script
		src="assets/custom/plugins/datatable/js/jquery.dataTables.min.js"></script>
	<script src="assets/custom/plugins/datatable/js/fixcolumn.js"></script>
	<script
		src="assets/custom/plugins/datatable/Responsive/js/dataTables.responsive.js"></script>

	<script src="assets/plugins/bootstrap-select/js/bootstrap-select.js"></script>

	<script src="assets/custom/plugins/icheck/js/icheck.min.js"></script>
	<script src="assets/custom/plugins/icheck/js/checkbox-radio.js"></script>

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
	<script src="/assets/custom/plugins/jquery_toastr/jquery.toast.min.js"></script>
	<script src="js/ToastScript.js"></script>

	<script src="assets/custom/js/commonmodal.js"></script>
	<script>
		$('#valid_from').closest('div').datepicker({
			autoclose : true,
			todayHighlight : true,
			format : "dd/mm/yyyy",
			clearBtn : true
		});

		$('#valid_to').closest('div').datepicker({
			autoclose : true,
			todayHighlight : true,
			format : "dd/mm/yyyy",
			clearBtn : true
		});

		$('.delete-user-alert').on('click', function() {
			$.confirm({
				title : 'Delete Record..!',
				content : 'Please be sure before deleting record',
				theme : 'material',
				icon : 'fa fa-warning',
				type : 'red',
				buttons : {
					omg : {
						text : 'Delete',
						btnClass : 'btn-red',
					},
					close : function() {
					}
				}
			});
		});

		$('#users_datatable').DataTable({
			destroy : true,
			scrollX : true,
			"bAutoWidth" : true,
			paging : true,
			"bLengthChange" : false,
			"columnDefs" : [ {
				"targets" : [ 5 ],
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
	/* 	$("#searchbtn").click(function() {
			$("#searchcollapse").trigger('click');
		}); */
	</script>
	<script src="js/MasterUserScript.js"></script>
</body>

</html>