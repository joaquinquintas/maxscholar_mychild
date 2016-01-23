$(document).ready(function() {
	$('#tutor_my_profile').click(function(){
		$('#my_profile').html("Loading ...");
		$('#my_profile_info').css('display', 'none');
		pk = localStorage.getItem("pk");
		$.ajax({type: "GET",  url: getTutorDetail+pk}).
			done(function(data) {
				console.log(data);
				data = JSON.parse(data);
				$('#my_profile').html("");
				console.log(data.first_name);
				$('#my_profile_first_name').val(data.first_name);
				$('#my_profile_last_name').val(data.last_name);
				$('#my_profile_email').val(data.email);
				$('#my_profile_last_login').val(data.last_login);
				$('#my_profile_address').val(data.address);
				$('#my_profile_city').val(data.city);
				$('#my_profile_state').val(data.state);
				$('#my_profile_zip').val(data.zip_code);
				$('#my_profile_home_phone').val(data.home_phone);
				$('#my_profile_work_phone').val(data.work_phone);
				$('#my_profile_info').css('display', 'block');
			});
		
	});
	
	function IsEmail(email) {
		  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  return regex.test(email);
		};
	
	// CREATE USER   ------------------
	$("#saveTutorProfile").click(function(e){
		e.preventDefault();
		console.log("Click Save Tutor Profile");
		var errors = false;
		var errors_list = []
		
		var first_name = $( "#my_profile_first_name" ).val();
		if (first_name == ""){
			errors_list.push( "<li>First Name is required</li>" );
			errors = true;
		}
		var last_name = $( "#my_profile_last_name" ).val();
		if (last_name == ""){
			errors_list.push( "<li>Last Name is required</li>" );
			errors = true;
		}
		var email = $( "#my_profile_email" ).val();
		

		if(!IsEmail(email)){
			//$("#class_m_email_error").html("Invalid Email.")
			errors_list.push( "<li>Invalid Email</li>" );
			errors = true;
		}
		
		var address = $('#my_profile_address').val();
		var city = $('#my_profile_city').val();
		var state = $('#my_profile_state').val();
		var zip_code = $('#my_profile_zip').val();
		var home_phone = $('#my_profile_home_phone').val();
		var work_phone = $('#my_profile_work_phone').val();
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$("#tutorProfileSave .modal-body span").html(message);
			$('#tutorProfileSave').modal('show');
			
		}else{
			var to_send_data = { first_name: first_name, 
								last_name:last_name, 
								email:email, 
								address:address,
								city:city,
								state:state,
								zip_code:zip_code,
								home_phone:home_phone,
								work_phone:work_phone};
			
			pk = localStorage.getItem("pk");
			$.ajax({type: "PUT",  url: getTutorDetail+pk, data: JSON.stringify(to_send_data) }).
	        fail(function(resp){
				$("#tutorProfileSave .modal-body span").html("Internal Error, Please try again later.");
	        	$('#tutorProfileSave').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good Saving')
				$("#tutorProfileSave .modal-body span").html("Your profile has been saved successfully");
	        	$('#tutorProfileSave').modal('show');
	        	
	        });
		}
		
		
	});
	
	// STUDENT - LIST 
	$("#student_tutor_list").click(function(){
		$("#tutor_list_students").css('display', 'none');
		pk = localStorage.getItem("pk");
		$("#mystudent .allstudent-detail h2").html("Loading ...");
		$.ajax({type: "GET",  url: getStudentTutorList+pk}).
			done(function(data) {
				console.log(data);
				$('#tutor_list_students').html("");
				data = JSON.parse(data);
				if(data.length == 0){
					$("#mystudent .allstudent-detail h2").html("No results");
				}else{
					$("#mystudent .allstudent-detail h2").html("All Students :");
				}
				count = 1;
				$.each( data, function( key, val ) {
					if(val.active){
						cls = "active";
						tl = "Active";
					}else{
						cls = "inactive";
						tl = "Inactive";
					}
					tr ='<tr id="' + val.pk + '">'+
                    '<td width="50%"><span>'+count+'-</span>'+ val.first_name +' '+ val.last_name+'<a href="#" class="'+cls+'">'+tl+'</a></td>'+
                    '<td class="removeOnPrint"  width="25%"><a href="#" id="see_student_report" data-user-rel-pk="'+val.rel_pk+'" class="student-report">See report</a></td>'+
                    '<td width="25%" class="enter-session removeOnPrint"><a href="#" data-user-active="'+val.active+'" data-user-rel-pk="'+val.rel_pk+'" data-user-session-name="'+ val.first_name +' '+ val.last_name+'" data-user-session-username="'+val.username+'" data-user-session-total="'+val.total_session+'" data-user-session-used="'+val.used_session+'" data-user-session-pk="' + val.pk + '">Enter Session</a></td>'+
                    '</tr>';
				$('#tutor_list_students').append(tr);
				count = count + 1;
				});
				
				preparePrint("#mystudent");
				$("#tutor_list_students").css('display', 'block');
				
			});
	});
	
	$("#tutor_list_students").on('click', '.enter-session a', function(e){
		e.preventDefault();
		user_active= this.dataset.userActive;
		console.log(user_active);
		session_user_pk= this.dataset.userSessionPk;
		localStorage.setItem("user_tutor_session_pk", session_user_pk)
		session_user_name= this.dataset.userSessionName;
		localStorage.setItem("user_tutor_session_name", session_user_name)
		session_user_username= this.dataset.userSessionUsername;
		session_user_total_sessions = this.dataset.userSessionTotal;
		session_user_used_sessions = this.dataset.userSessionUsed;
		rel_pk = this.dataset.userRelPk;
		localStorage.setItem("tutor_session_pk", rel_pk);
		console.log("New Session");
		console.log(session_user_pk);
		$("#pre_new_session_user_name").val(session_user_name);
		$("#pre_new_session_user_username").val(session_user_username);
		message = "YOU HAVE COMPLETED " +session_user_used_sessions+" OUT OF " +session_user_total_sessions+" SESSIONS WITH THIS STUDENT.";
		$("#message_sessions_used").html(message);
		$('.content  .allstudent-detail').css('display','none');
		$('.content .enter-session-outer ').css('display','block');
		if (user_active == "true"){
			console.log("YesMore!")
			$("#new_session_outer_btn").show();
			
		}else{
			console.log("NomMore!")
			$("#new_session_outer_btn").hide();
		}
		
		
	})
	

	$("#insert_session_add_another").click(function(e){
		e.preventDefault();
		
		rel_pk = localStorage.getItem("tutor_session_pk");
		
		notes = $("#progress_session_note").val();
		
		session_date = $("#session_date").val();
		
		hour_start = $("#hour_start").val();
		minutes_start = $("#minutes_start").val();
		period_start = $("#period_start").val();
		
		hour_end = $("#hour_end").val();
		minutes_end = $("#minutes_end").val();
		period_end = $("#period_end").val();
		
		
		var errors = false;
		var errors_list = []
		if (session_date == ""){
			errors_list.push( "<li>Date is required</li>" );
			errors = true;
		}
		data = {hour_start:hour_start, minutes_start:minutes_start, period_start:period_start,
				hour_end:hour_end, minutes_end:minutes_end, period_end:period_end}
		to_send = JSON.stringify(data);
		$.ajax({type: "POST", url: validateSessionTime, data:to_send}).
    	fail(function(response){
    		errors_list.push( "<li>Invalid Time</li>" );
			errors = true;
    	}).complete(function(response){

    		if (errors){
    			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
    			$("#TutorSessionSave .modal-body span").html(message);
    			$('#TutorSessionSave').modal('show');
    			
    		}else{
    			data = {note:notes, hour_start:hour_start, minutes_start:minutes_start, period_start:period_start,
    					hour_end:hour_end, minutes_end:minutes_end, period_end:period_end, session_date:session_date}
    			to_send = JSON.stringify(data);
    			$.ajax({type: "POST",  url: setSession+rel_pk, data: to_send}).
    	        fail(function(resp){
    				$("#TutorSessionSave .modal-body span").html("Internal Error, Please try again later.");
    	        	$('#TutorSessionSave').modal('show');
    	            
    	        }).
    	        done(function(resp){
    	        	data = JSON.parse(resp)
    	        	console.log('Good saving')
    	        	session_user_pk= data.student_pk;
    	    		localStorage.setItem("user_tutor_session_pk", session_user_pk)
    	    		session_user_name= data.student_name;
    	    		localStorage.setItem("user_tutor_session_name", session_user_name)
    	    		session_user_username= data.student_username;
    	    		session_user_total_sessions = data.total_session;
    	    		session_user_used_sessions = data.used_sessions;
    	    		active = data.active;
    	    		rel_pk = data.rel_pk;
    	    		localStorage.setItem("tutor_session_pk", rel_pk);

    	    		$("#session_date").val("");
    	    		$("#progress_session_note").val("");
    	    		if (active==true){
    	    			message = "You have completed " +session_user_used_sessions+" out of " +session_user_total_sessions+" sessions with this student.";
    	    			$("#TutorSessionSave .modal-body span").html(message);
    		        	$('#TutorSessionSave').modal('show');
    	    		}else{
    	    			$("#new_session_outer_btn").hide();
    	    			$("#pre_new_session_user_name").val(session_user_name);
    		    		$("#pre_new_session_user_username").val(session_user_username);
    		    		message = "YOU HAVE COMPLETED " +session_user_used_sessions+" OUT OF " +session_user_total_sessions+" SESSIONS WITH THIS STUDENT.";
    		    		$("#message_sessions_used").html(message);
    		    		$('.content  .allstudent-detail').css('display','none');
    		    		$('.content .enter-session-outer ').css('display','block');
    		    		$('.new-session-outer').css('display','none');
    	    		}
    	    		
    	    		
    	    		
    	        });
    		}
    	});
		
		
		
		
		
		
	});
	
	$("#insert_session").click(function(e){
		e.preventDefault();
		
		rel_pk = localStorage.getItem("tutor_session_pk");
		
		notes = $("#progress_session_note").val();
		
		session_date = $("#session_date").val();
		
		hour_start = $("#hour_start").val();
		minutes_start = $("#minutes_start").val();
		period_start = $("#period_start").val();
		
		hour_end = $("#hour_end").val();
		minutes_end = $("#minutes_end").val();
		period_end = $("#period_end").val();
		
		
		var errors = false;
		var errors_list = []
		if (session_date == ""){
			errors_list.push( "<li>Date is required</li>" );
			errors = true;
		}
		data = {hour_start:hour_start, minutes_start:minutes_start, period_start:period_start,
				hour_end:hour_end, minutes_end:minutes_end, period_end:period_end}
		to_send = JSON.stringify(data);
		
		$.ajax({type: "POST", url: validateSessionTime, data:to_send}).
    	fail(function(response){
    		errors_list.push( "<li>Invalid Time</li>" );
			errors = true;
    	}).complete(function(response){
    		if (errors){
    			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
    			$("#TutorSessionSave .modal-body span").html(message);
    			$('#TutorSessionSave').modal('show');
    			
    		}else{
    			data = {note:notes, hour_start:hour_start, minutes_start:minutes_start, period_start:period_start,
    					hour_end:hour_end, minutes_end:minutes_end, period_end:period_end, session_date:session_date}
    			to_send = JSON.stringify(data);
    			$.ajax({type: "POST",  url: setSession+rel_pk, data: to_send}).
    	        fail(function(resp){
    				$("#TutorSessionSave .modal-body span").html("Internal Error, Please try again later.");
    	        	$('#TutorSessionSave').modal('show');
    	            
    	        }).
    	        done(function(resp){
    	        	data = JSON.parse(resp)
    	        	console.log('Good saving')
    	        	session_user_pk= data.student_pk;
    	    		localStorage.setItem("user_tutor_session_pk", session_user_pk)
    	    		session_user_name= data.student_name;
    	    		localStorage.setItem("user_tutor_session_name", session_user_name)
    	    		session_user_username= data.student_username;
    	    		session_user_total_sessions = data.total_session;
    	    		session_user_used_sessions = data.used_sessions;
    	    		active = data.active;
    	    		if (active==false){
    	    			$("#new_session_outer_btn").hide();
    	    		}else{
    	    			$("#new_session_outer_btn").show();
    	    		}
    	    		rel_pk = data.rel_pk;
    	    		localStorage.setItem("tutor_session_pk", rel_pk);
    	    		console.log("New Session");
    	    		console.log(session_user_pk);
    	    		$("#pre_new_session_user_name").val(session_user_name);
    	    		$("#pre_new_session_user_username").val(session_user_username);
    	    		message = "YOU HAVE COMPLETED " +session_user_used_sessions+" OUT OF " +session_user_total_sessions+" SESSIONS WITH THIS STUDENT.";
    	    		$("#message_sessions_used").html(message);
    	    		$('.content  .allstudent-detail').css('display','none');
    	    		$('.content .enter-session-outer ').css('display','block');
    	    		$('.new-session-outer').css('display','none');
    	    		
    	        });
    		}
    		
    	});
		
		
		
		
		
		
	});
	
	
	function processReport(e, dataset){
		e.preventDefault();
		
		$('#tutor_user_report').html("");
		$("#report_student_name").html("");
		$('.allstudent-detail').css('display','none');
		$('.content .complete-report ').css('display','block');
		rel_pk = localStorage.getItem("tutor_session_pk");
		if (rel_pk == null){
			rel_pk= dataset.userRelPk;
		}
		$("#report_student_name_label").html("");
		$("#report_title").html("Loading ... ");
		$.ajax({type: "GET",  url: getSessionReport+rel_pk}).
		done(function(data) {
			console.log(data);
			
			data = JSON.parse(data);
			if(data.sessions.length == 0){
				$("#report_title").html("No results");
			}else{
				$("#report_title").html("REPORTS ");
			}
			$.each( data.sessions, function( key, val ) {
				
				tr ='<tr width="100%">'+
                	'<td class="callender-left" id="report_calendar">'+
                	'<a href="#">'+ val.date.day+'</a>'+
                	'<span>'+ val.date.month+' <br> '+ val.date.year+'</span>' +
                	'</td>'+
                	'<td class="report-description" id="report_note">'+
                	'<p>'+ val.note+'</p></td>'+
                	'</tr>';
			$('#tutor_user_report').append(tr);
			});
			
			$("#report_student_name").html(data.student.name);
			$("#report_student_name_label").html("Student Name : ");
			console.log(data.sessions.length);
			
			
			$("#tutor_user_report").css('display', 'table-footer-group');
		});
	};
	

	$("#tutor_list_students").on('click', '#see_student_report', function(e){
		processReport(e, this.dataset);
	});
	
	$("#see_report_from_detail").click(function(e){
		$(".enter-session-outer").css("display", "none");
		processReport(e);
	});
	
	$("#tutor_session_list").click(function(e){
		
		
		e.preventDefault();
		preparePrint("#session_tutors");
		$("#table_session_list").css('display', 'none');
		pk = localStorage.getItem("pk");
		$("#tutor_sessions_lists_title").html("Loading ...");
		$.ajax({type: "GET",  url: getSessionsList+pk}).
			done(function(data) {
				console.log(data);
				$('#table_session_list').html("");
				data = JSON.parse(data);
				if(data.sessions.length == 0){
					$("#tutor_sessions_lists_title").html("No results");
				}else{
					$("#tutor_sessions_lists_title").html("All Sessions : ");
				}
				$.each( data.sessions, function( key, val ) {
					
					tr ='<tr>'+
                    '<td width="75%">'+val.student.first_name+ ' '+ val.student.last_name+'</td>'+
                    '<td width="25%">'+val.time+'</td>'+
                    '</tr>';
				$('#table_session_list').append(tr);
				});
				
				tr = '<tr>'+
                	'<td width="75%" class="session-total">Total</td>' +
                	'<td width="25%" style="color:#f7931e; font-weight:bold;">'+ data.total_time+'</td> </tr>';
				
				$('#table_session_list').append(tr);
				console.log(data.sessions.length);
				
				
				$("#table_session_list").css('display', 'table-footer-group');
			});
	});
	
	$(".content .enter-session-outer a.decoument-session").click(function(){


		$('.content .enter-session-outer').css('display','none');
		$('.content .new-session-outer').css('display','block');
		$('.content .complete-report ').css('display','none');
		$("#progress_session_note").val("");
	
	});
	
	$("#new_session_btn").click(function(e){

			
		
			e.preventDefault();
			pk = localStorage.getItem("user_tutor_session_pk");
			name = localStorage.getItem("user_tutor_session_name");
			$("#new_session_user_name").html(name);
			$("#minutes_start").html("");
			$("#minutes_end").html("");
			var o = new Option("00" , 0);
			o.setAttribute("selected", "selected");
			$("#minutes_start").append(o);
			var o1 = new Option("00" , 0);
			o1.setAttribute("selected", "selected");
			$("#minutes_end").append(o1);
			var o = new Option("01" , 1);
			$("#minutes_start").append(o);
			var o1 = new Option("01" , 1);
			$("#minutes_end").append(o1);
			var o = new Option("02" , 2);
			$("#minutes_start").append(o);
			var o1 = new Option("02" , 2);
			$("#minutes_end").append(o1);
			var o = new Option("03" , 3);
			$("#minutes_start").append(o);
			var o1 = new Option("03" , 3);
			$("#minutes_end").append(o1);
			var o = new Option("04" , 4);
			$("#minutes_start").append(o);
			var o1 = new Option("04" , 4);
			$("#minutes_end").append(o1);
			var o = new Option("05" , 5);
			$("#minutes_start").append(o);
			var o1 = new Option("05" , 5);
			$("#minutes_end").append(o1);
			
			var o = new Option("06" , 6);
			$("#minutes_start").append(o);
			var o1 = new Option("06" , 6);
			$("#minutes_end").append(o1);
			var o = new Option("07" , 7);
			$("#minutes_start").append(o);
			var o1 = new Option("07" , 7);
			$("#minutes_end").append(o1);
			var o = new Option("08" , 8);
			$("#minutes_start").append(o);
			var o1 = new Option("08" , 8);
			$("#minutes_end").append(o1);
			var o = new Option("09" , 9);
			$("#minutes_start").append(o);
			var o1 = new Option("09" , 9);
			$("#minutes_end").append(o1);
			
			for (i = 10; i < 60; i++) { 
				var o = new Option(i , i);
				$("#minutes_start").append(o);
				var o = new Option(i , i);
				$("#minutes_end").append(o);
			}
			

	})
});