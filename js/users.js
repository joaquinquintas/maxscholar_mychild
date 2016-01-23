$(document).ready(function() {
	$('#max_user_create').click(function(e) {
		$('.content .print-button ').css('display','none');
		$( "#fist-name-create-user" ).val("");
		$( "#last-name-create-user" ).val("");
		$( "#user-name-create-user" ).val("");
		$( "#password-create-user" ).val("");
		$( "#repassword-create-user" ).val("");
		$( "#level-create-user" ).val("no");
		$( "#level-phonics-create-user" ).val("no");
		$( "#type-create-user" ).val("no");
	});
	// CREATE USER   ------------------
	$("#craeteUserConfirmation").click(function(e){
		e.preventDefault();
		console.log("Click Create User");
		var errors = false;
		var errors_list = []
		
		
		
		
		var first_name = $( "#fist-name-create-user" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#last-name-create-user" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		var user_name = $( "#user-name-create-user" ).val();
		var user_name = user_name.split(' ').join('');
		
		
		var password = $( "#password-create-user" ).val();
		var repassword = $( "#repassword-create-user" ).val();
		var save_password = false;
		if(password.length == 0){
			errors_list.push( "<li>Password is required</li>");
		}else{
			if(password != repassword){
				errors_list.push( "<li>Password mismatch</li>");
				errors = true;
			}
		}
		
		var user_type = $( "#type-create-user" ).val();
		var pre_test = $( "#pretest-create-user" ).val();
		var level = $( "#level-create-user" ).val();
		var level_phonics = $( "#level-phonics-create-user" ).val();
		var save_level = level != "no"
		var save_phonics_level = level_phonics != "no"
		var save_user_type = user_type != "no"
		if(pre_test=="Yes"){
			pre_test = true;
		}else{
			pre_test= false;
		}
		
		
		var reading_hl = $( "#reading_hl-create-user" ).val();
		var pre_test_phonics = $( "#pretest_phonics-create-user" ).val();
		


		if(reading_hl=="Yes"){
			reading_hl = true;
		}else{
			reading_hl= false;
		}
		if(pre_test_phonics=="Yes"){
			pre_test_phonics = true;
		}else{
			pre_test_phonics= false;
		}
		
		if (user_name == ""){
			errors_list.push( "<li>Username is required</li>" );
			errors = true;
		}
		
		$.ajax({type: "GET", url: validateUsername+"?username="+user_name}).
    	fail(function(response){
    		errors_list.push( "<li>Username already taken</li>" );
			errors = true;
    	}).complete(function(response){
    		
    		if (errors){
    			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
    			$("#CreateUserModal .modal-body span").html(message);
    			localStorage.setItem("errors_in_user_creation", "true");
    			$('#CreateUserModal').modal('show');
    			
    		}else{
    			localStorage.setItem("errors_in_user_creation", "false");
    			var to_send_data = { first_name: first_name, last_name:last_name, username:user_name, pre_test:pre_test,
    					do_reading_hl:reading_hl, do_phonics_pretest:pre_test_phonics};
    				to_send_data.password = password;
    				
    			if(save_level == true){
    				to_send_data.level = level;
    			}
    			if (save_phonics_level == true){
    				to_send_data.phonics_level = level_phonics;
    			}
    			if(save_user_type == true){
    				to_send_data.user_type = user_type;
    			}
    			school_pk = localStorage.getItem("school_pk");
    			
    			to_send_data.school_id = school_pk;
    			
    			$.ajax({type: "POST",  url: getStudentList, data: JSON.stringify(to_send_data) }).
    	        
    	        done(function(resp){
    	        	console.log('Good Creation')
    				$("#CreateUserModal .modal-body span").html("Your new user has been created successfully");
    	        	$('#CreateUserModal').modal('show');
    	        	
    	        }).fail(function(response){
    	        	$("#CreateUserModal .modal-body span").html('There are no more licenses to assign. Please contact us for more information.');
    	        	$('#CreateUserModal').modal('show');
    	    	});
    		}
    		
    		
    	});

		
		
		
		
	});
	
	$(".content #CreateUserModal .modal-content .modal-footer .close-btn").click(function(){
		console.log(localStorage.getItem("errors_in_user_creation") );
		if (localStorage.getItem("errors_in_user_edition") == "false" ){


			$("#max_user_list").trigger( "click" );
			
		}
		
	});
	
	$(".content #SaveEditUserModal .modal-content .modal-footer .close-btn").click(function(){
		console.log(localStorage.getItem("errors_in_user_edition") );
		if (localStorage.getItem("errors_in_user_edition") == "false" ){


			$("#max_user_list").trigger( "click" );

			
		}
		
	});
	
	$(".content #SaveEditTeacherModal .modal-content .modal-footer .close-btn").click(function(){
		console.log(localStorage.getItem("errors_in_user_edition") );
		if (localStorage.getItem("errors_in_user_edition") == "false" ){


			$("#max_user_list").trigger( "click" );

			
		}
		
	});
	
	// END CREATE USER   ------------------
	// EDIT USER   ------------------
	$('#user-list').on('click', '#edit-user-action',  function(e) {
		e.preventDefault();
		$('.content  .edit-user-outer').css('display','block');
		$('.content  .edit-teacher-outer').css('display','none');
		
		$('.content  .all-user-outer').css('display','none');
		$('.edit-user-outer ul').css('display','none');
		$('#editConfirmation').css('display','none');
		
		$('.edit-user-outer h2').html("Loading ...");
		
		var user_selected = this.dataset.userEditPk;
		localStorage.setItem("user_selected_to_edit", user_selected);
		$.ajax({type: "GET",  url: getStudentDetail+user_selected}).
		fail(function(resp){
            console.log('Error in Get Student')
        }).
        done(function(data){
        	console.log(data);
        	data = JSON.parse(data);
        	
        	$.each($("#level-edit-user").children(), function(i){
        		if ($(this).val() == data.level.pk){
        			$(this).attr("selected","selected");
        		}
        	});
        	$.each($("#level-phonics-edit-user").children(), function(i){
        		if ($(this).val() == data.phonics_level.pk){
        			$(this).attr("selected","selected");
        		}
        	});
        	$.each($("#type-edit-user").children(), function(i){
        		if ($(this).val() == data.type.pk){
        			$(this).attr("selected","selected");
        		}
        	});
        	
        	if(data.level.pk == "no"){
    			$("#level-edit-user #no").attr("selected","selected");
			}
        	
        	if(data.phonics_level.pk == "no"){
    			$("#level-phonics-edit-user #no").attr("selected","selected");
			}
    		
        	if(data.type.pk == "no"){
    			$("#type-edit-use #no").attr("selected","selected");
			}
        	
    		$("#fist-name-edit-user").val(data.first_name);
        	$("#last-name-edit-user").val(data.last_name);
        	$("#user-name-edit-user").val(data.username);
        	console.log(data);
        	if(data.do_pretest == false){
        		
        		$("#pretest-edit-user #no").attr("selected","selected");
        	}
        	else{
        		$("#pretest-edit-user #yes").attr("selected","selected");
        	}
        	if(data.do_phonics_pretest == false){
        		$("#pretest_phonics-edit-user #no").attr("selected","selected");
        	}
        	else{
        		$("#pretest_phonics-edit-user #yes").attr("selected","selected");
        	}

            if(data.reading_interim == false) {
        		$("#interim-edit-user #no").attr("selected","selected");
            } else {
        		$("#interim-edit-user #yes").attr("selected","selected");
            }

            if (data.phonics_pretest_done == false) {
                $("#interim-edit-user").attr("disabled","disabled").parent().css("opacity", "0.3");
            } else {
                $("#interim-edit-user").attr("enabled","enabled");
            }

        	if(data.do_reading_hl == false){
        		$("#reading_hl-edit-user #no").attr("selected","selected");
        	}
        	else{
        		$("#reading_hl-edit-user #yes").attr("selected","selected");
        	}
        	
        	$( "#password-edit-user" ).val("********");
    		$( "#repassword-edit-user" ).val("********");
    		$('.edit-user-outer h2').html("");
        	$('.edit-user-outer ul').css('display','block');
        	$('#editConfirmation').css('display','block');
    
        	
    		
        	
        	
        });
		
		
	});
	
	
	$("#editConfirmation").click(function(e){
		var select_user = localStorage.getItem("user_selected_to_edit");
		e.preventDefault();
		console.log("Click Saved Edited User");
		var errors = false;
		var errors_list = []
		
		var first_name = $( "#fist-name-edit-user" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#last-name-edit-user" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		
		var password = $( "#password-edit-user" ).val();
		var repassword = $( "#repassword-edit-user" ).val();
		var save_password = false;
		if(password.indexOf("*")== -1  && password.length>0){
			if(password != repassword){
				errors_list.push( "<li>Password mismatch</li>");

				errors = true;
			}else{
				save_password = true;
			}
		}
		
		var user_type = $( "#type-edit-user" ).val();
		
		var pre_test = $( "#pretest-edit-user" ).val();
		var reading_hl = $( "#reading_hl-edit-user" ).val();
		var reading_interim = $( "#interim-edit-user" ).val();
		var pre_test_phonics = $( "#pretest_phonics-edit-user" ).val();
		
		var level = $( "#level-edit-user" ).val();
		var save_level = level != "no"
		var phonics_level = $( "#level-phonics-edit-user" ).val();
		var save_phonics_level = phonics_level != "no"
		var save_user_type = user_type != "no"
		
		console.log(pre_test);
		console.log(reading_hl);
		console.log(pre_test_phonics);
		
		if(pre_test=="Yes"){
			pre_test = true;
		}else{
			pre_test= false;
		}
		if(reading_hl=="Yes"){
			reading_hl = true;
		}else{
			reading_hl= false;
		}
		if(reading_interim=="Yes"){
			reading_interim = true;
		}else{
			reading_interim= false;
		}
		
		if(pre_test_phonics=="Yes"){
			pre_test_phonics = true;
		}else{
			pre_test_phonics= false;
		}
		
		var user_name = $( "#user-name-edit-user" ).val();
		var user_name = user_name.split(' ').join('');
		
		if (user_name == ""){
			errors_list.push( "<li>Username is required</li>" );
			errors = true;
		}
		
		$.ajax({type: "GET", url: validateUsername+"?user_id="+select_user+"&username="+user_name}).
    	fail(function(response){
    		errors_list.push( "<li>Username already taken</li>" );
			errors = true;
    	}).complete(function(response){
    		if (errors){
    			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
    			$("#SaveEditUserModal .modal-body span").html(message);
    			localStorage.setItem("errors_in_user_edition", "true");
    			$('#SaveEditUserModal').modal('show');
    			
    		}else{
    			localStorage.setItem("errors_in_user_edition", "false");
    			var to_send_data = { first_name: first_name, last_name:last_name, username:user_name, 
    					pre_test:pre_test, reading_interim:reading_interim,do_phonics_pretest:pre_test_phonics, do_reading_hl:reading_hl};
    			if(save_password == true){
    				to_send_data.password = password;
    			}
    			if(save_level == true){
    				to_send_data.level = level;
    			}
    			if(save_phonics_level == true){
    				to_send_data.phonics_level = phonics_level;
    			}
    			if(save_user_type == true){
    				to_send_data.user_type = user_type;
    			}
    			//Redirect close to allClases.
    			var pk = localStorage.getItem("selected_clase");
    			$.ajax({type: "PUT",  url: getStudentDetail+select_user, data: JSON.stringify(to_send_data) }).
    	        fail(function(resp){
    				$("#SaveEditUserModal .modal-body span").html("Internal Error, Please try again later.");
    	        	$('#SaveEditUserModal').modal('show');
    	            
    	        }).
    	        done(function(resp){
    	        	console.log('Good saving')
    				$("#SaveEditUserModal .modal-body span").html("The user has been modified successfully");
    	        	$('#SaveEditUserModal').modal('show');
    	        	
    	        });
    		}
    	});
			
	});
	

	// END EDIT USER ------------------
	
	$('#user-list').on('click', '#report-user-action',  function(e) {
		e.preventDefault();
		$(".user-tab-title").removeClass("active");
		$(".reports-tab-title").addClass("active");
		$(".individual-title").addClass("active");
		$("#users").removeClass("active");
		//$(".user-tab-right").css('display','none');
		$('.content #class-detail-message').css('display','block');
		$("#reports").addClass("active");
		$("#individual").addClass("active");
		var user_selected = this.dataset.userReportPk;
		$("#report_individual_selector").val(undefined);
		localStorage.setItem("individual_report_student_id", user_selected);
		var from_date = new Date();
		from_date.setDate(from_date.getDate()-7);
		var to_date = new Date();

		
		$("#invidiual_report_from_day").val(from_date.getUTCDate());
		$("#invidiual_report_from_month").val(from_date.getUTCMonth() + 1);
		$("#invidiual_report_from_year").val(from_date.getUTCFullYear());
		
		$("#invidiual_report_to_day").val(to_date.getUTCDate());
		$("#invidiual_report_to_month").val(to_date.getUTCMonth() + 1);
		$("#invidiual_report_to_year").val(to_date.getUTCFullYear());
	
		$( "#generate_individual_report" ).trigger( "click" );
		
	});
	
	
	// LIST USER ------------------
	$('#max_user_list').click(function(){
		$('#user-list').html("");
		$('#allusersTitle').html("Loading ...");
		school_pk = localStorage.getItem("school_pk");
		toSend = {school_id:school_pk};
		$.ajax({type: "GET",  url: getStudentSearch, data:toSend}).
			done(function(data) {
				count = 1;
				$.each( data, function( key, val ) {
					if (val.first_name =="" && val.last_name ==""){
						name = val.username;
					}else{
						name = val.last_name +' '+ val.first_name;
					}
					tr ='<tr id="' + val.pk + '">'+
                    '<td width="55%"><span>'+count+'-</span>'+ name+'</td>'+
                     '<td class="removeOnPrint" width="11%"><a href="#" data-user-edit-pk="' + val.pk + '" id="edit-user-action" class="edit-user"><img src="images/edit-icon.png" alt="" title=""></a></td>'+
                      '<td class="removeOnPrint" width="11%"><a href="#" data-user-delete-pk="' + val.pk + '" data-toggle="modal" data-target="#deleteUserModal" class="delete-user"><img src="images/chosse-member-icon.png" alt="" title=""></a></td>'+
                      '<td class="removeOnPrint"><a href="#" data-user-report-pk="' + val.pk + '" id="report-user-action" class="user-report">see report</a></td>'+ 
                      '</tr>';
				$('#user-list').append(tr);
				count = count + 1;
				});
				
				if(data.length == 0){
					$('#allusersTitle').html("No Users");
				}else{
					$('#allusersTitle').html("Users in your school :");
					preparePrint("#allusers");
				}
				
			});
		
		
		$.ajax({type: "GET",  url: getAdminsFromSchool, data:toSend}).
		done(function(data) {
			$('#teacher-list').html("")
			data = JSON.parse(data);
			count = 1;
			$.each( data, function( key, val ) {
				
				tr ='<tr id="' + val.pk + '">'+
                '<td width="55%"><span>'+count+'-</span>'+ val.name+'</td>'+
                 '<td class="removeOnPrint" width="11%"><a href="#" data-user-edit-pk="' + val.pk + '" id="edit-user-action" class="edit-user"><img src="images/edit-icon.png" alt="" title=""></a></td>'+
                  '<td class="removeOnPrint" width="11%"><a href="#" data-user-delete-pk="' + val.pk + '" data-toggle="modal" data-target="#deleteTeacherModal" class="delete-user"><img src="images/chosse-member-icon.png" alt="" title=""></a></td>'+
                  '</tr>';
			$('#teacher-list').append(tr);
			count = count + 1;
			});
			
			if(data.length == 0){
				$('#allTeachers').html("No Teachers");
			}else{
				$('#allTeachers').html("Teachers in your school :");
				preparePrint("#allusers");
			}
			
		});
		
	});
	
	// END LIST USER ------------------
	
	
	// EDIT TEACHER   ------------------
	$('#teacher-list').on('click', '#edit-user-action',  function(e) {
		e.preventDefault();
		$('.content  .edit-teacher-outer').css('display','none');
		$('.content  .edit-user-outer').css('display','none');
		$('.content  .all-user-outer').css('display','none');
		$('.edit-user-outer ul').css('display','none');
		$('#editTeacherConfirmation').css('display','none');
		
		$('.edit-teacher-outer h2').html("Loading ...");
		
		var user_selected = this.dataset.userEditPk;
		localStorage.setItem("user_selected_to_edit", user_selected);
		$.ajax({type: "GET",  url: getTeacherDetail+user_selected}).
		fail(function(resp){
            console.log('Error in Get Teachers')
        }).
        done(function(data){
        	console.log(data);        	
        	
    		$("#teacher-fist-name-edit-user").val(data.first_name);
        	$("#teacher-last-name-edit-user").val(data.last_name);
        	$("#teacher-user-name-edit-user").val(data.username);
        	$("#teacher-email-edit-user").val(data.email);
        	
        	
        	$('.edit-teacher-outer h2').html("");
        	$('.content  .edit-teacher-outer').css('display','block');
        	$('.edit-user-outer ul').css('display','block');
        	$('#editTeacherConfirmation').css('display','block');
    
        	
    		
        	
        	
        });
		
		
	});
	
	$("#editTeacherConfirmation").click(function(e){
		var select_user = localStorage.getItem("user_selected_to_edit");
		e.preventDefault();
		console.log("Click Saved Edited User");
		var errors = false;
		var errors_list = []
		
		var first_name = $( "#teacher-fist-name-edit-user" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#teacher-last-name-edit-user" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		
		var password = $( "#teacher-password-edit-user" ).val();
		var repassword = $( "#teacher-repassword-edit-user" ).val();
		var save_password = false;
		if(password.indexOf("*")== -1  && password.length>0){
			if(password != repassword){
				errors_list.push( "<li>Password mismatch</li>");

				errors = true;
			}else{
				save_password = true;
			}
		}
		
		
		var user_name = $( "#teacher-user-name-edit-user" ).val();
		var user_name = user_name.split(' ').join('');
		
		if (user_name == ""){
			errors_list.push( "<li>Username is required</li>" );
			errors = true;
		}
		
		var email = $( "#teacher-email-edit-user" ).val();
		
		if (email == ""){
			errors_list.push( "<li>Email is required</li>" );
			errors = true;
		}else{
			if(!IsEmail(email)){
				//$("#class_m_email_error").html("Invalid Email.")
				errors_list.push( "<li>Invalid Email</li>" );
				errors = true;
			}
		}
		
		
		$.ajax({type: "GET", url: validateUsername+"?user_id="+select_user+"&username="+user_name}).
    	fail(function(response){
    		errors_list.push( "<li>Username already taken</li>" );
			errors = true;
    	}).complete(function(response){
    		if (errors){
    			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
    			$("#SaveEditTeacherModal .modal-body span").html(message);
    			localStorage.setItem("errors_in_user_edition", "true");
    			$('#SaveEditTeacherModal').modal('show');
    			
    		}else{
    			localStorage.setItem("errors_in_user_edition", "false");
    			var to_send_data = { first_name: first_name, last_name:last_name, username:user_name, email:email};
    			if(save_password == true){
    				to_send_data.password = password;
    			}

    			//Redirect close to allClases.
    			var pk = localStorage.getItem("selected_clase");
    			$.ajax({type: "PUT",  url: getTeacherDetail+select_user, data: JSON.stringify(to_send_data) }).
    	        fail(function(resp){
    				$("#SaveEditTeacherModal .modal-body span").html("Internal Error, Please try again later.");
    	        	$('#SaveEditTeacherModal').modal('show');
    	            
    	        }).
    	        done(function(resp){
    	        	console.log('Good saving')
    				$("#SaveEditTeacherModal .modal-body span").html("The teacher has been modified successfully");
    	        	$('#SaveEditTeacherModal').modal('show');
    	        	
    	        });
    		}
    	});
			
	});
	
	function IsEmail(email) {
		  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  return regex.test(email);
		};
		
		
		// DELETE TEACHER -------------------
		$('#deleteTeacherModal').on('show.bs.modal', function(e) {
			  var user_selected = e.relatedTarget.dataset.userDeletePk;
			  localStorage.setItem("selected_user_to_delete", parseInt(user_selected));
			});
		
		$(".content #deleteTeacherModal .modal-content .modal-footer .enter-pass").click(function(){
			
			console.log("Delete!");
			to_delete_user_pk = localStorage.getItem("selected_user_to_delete");
			console.log(to_delete_user_pk);
			
			$.ajax({type: "DELETE",  url: getTeacherDetail+to_delete_user_pk}).
				fail(function(resp){
		            console.log('Error in Delete')
		        }).
		        done(function(data){
		        	id= "#teacher-list #"+to_delete_user_pk
		        	$(id).remove();
		        	$('#deleteTeacherModal').modal('hide');
		        	count = 0;
		        	$( "#teacher-list" ).children().each(function () {
		        		count = count + 1;
		        		$(this).find("span").html(count+"-")
		        		
		        	});
		        	if (count==0){
		        		$('#allTeachers').html("No Users");
		        	}
		        });
		});
		
	// DELETE USER -------------------
	$('#deleteUserModal').on('show.bs.modal', function(e) {
		  var user_selected = e.relatedTarget.dataset.userDeletePk;
		  localStorage.setItem("selected_user_to_delete", parseInt(user_selected));
		});
	
	$(".content #deleteUserModal .modal-content .modal-footer .enter-pass").click(function(){
		
		console.log("Delete!");
		to_delete_user_pk = localStorage.getItem("selected_user_to_delete");
		console.log(to_delete_user_pk);
		
		$.ajax({type: "DELETE",  url: getStudentDetail+to_delete_user_pk}).
			fail(function(resp){
	            console.log('Error in Delete')
	        }).
	        done(function(data){
	        	id= "#user-list #"+to_delete_user_pk
	        	$(id).remove();
	        	$('#deleteUserModal').modal('hide');
	        	count = 0;
	        	$( "#user-list" ).children().each(function () {
	        		count = count + 1;
	        		$(this).find("span").html(count+"-")
	        		
	        	});
	        	if (count==0){
	        		$('#allusersTitle').html("No Users");
	        	}
	        });
	});
	
	// END DELETE USER ------------------
	
});
