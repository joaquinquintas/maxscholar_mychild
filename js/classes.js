$(document).ready(function() {
	
	$('.add-student ul').slimScroll({
        height: '420px'
    });
	
	$('.classes-tab-title').click(function(){
		$('.content .delete ').css('display','block');
	});

	


	$('#deleteModal').on('show.bs.modal', function(e) {
		  var clase_selected = e.relatedTarget.dataset.clasePk;
		  localStorage.setItem("selected_clase_to_delete", parseInt(clase_selected));
		});
	
	$(".content #deleteModal .modal-content .modal-footer .enter-pass").click(function(){
		
		console.log("Delete!");
		to_delete_class_pk = localStorage.getItem("selected_clase_to_delete");
		console.log(to_delete_class_pk);
		
		$.ajax({type: "DELETE",  url: getClassDetail+to_delete_class_pk}).
			fail(function(resp){
	            console.log('Error in Delete')
	        }).
	        done(function(data){
	        	id= ".delete-class #"+to_delete_class_pk
	        	$(id).remove();
	        	$('#deleteModal').modal('hide');
	        	count = 0;
	        	$( "#clases-to-delete" ).children().each(function () {
	        		count = count + 1;
	        	});
	        	if (count==0){
	        		$('.delete-class').find("span").html("No Classes");
	        	}
	        });
	});
	
	// END DELETE CLASE ------
	
	// CREATE CLASE ----------
	
	$(".createclass-tab-title").click(function(){
		$('.content .print-button ').css('display','none');
		$('.create-class-detail').css('display', 'none');
		$('#createclass').css('display', 'block');
		$('#createclass .message').css('display', 'block');
		$('.modify-classes-tab-title').css('display', 'none');
		$('.content .create-class-detail .all-member-detail .choose-member').css('display', 'block');
		school_pk = localStorage.getItem("school_pk");
		toSend = {school_id:school_pk};
		
		$.ajax({type: "GET",  url: getAdminsFromSchool, data:toSend} ).done(function(response){
    		
    		teacher_selection_modify = $('#magicsuggest_create').magicSuggest({
        		allowFreeEntries:false,
        		data: JSON.parse(response),
        		valueField: 'pk',
                displayField: 'name',
                placeholder: 'Type Here',
            });
    		
    	});
		
		school_pk = localStorage.getItem("school_pk");
		$( "#clase_student_list_create" ).html("");
		$( "#class_password_create" ).val("");
		 $( "#class_repassword_create" ).val("");
		 $( "#class_email_create" ).val("");
		 $( "#class_name_create" ).val("");
		 $("#search-student-create").val("");
		toSend = {school_id:school_pk};
		$.ajax({type: "GET",  url: getStudentList,data:toSend }).
        
        done(function(resp){
        	
        	$('#createclass .message').css('display', 'none');
        	$('.create-class-detail').css('display', 'block');
        	//Use the clase response Obj
        	var students = [];
        	$.each( resp, function( key, val ) {
        		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +" data-user-pk="+val.pk+" href='#'>"+ val.last_name +' '+ val.first_name+'</a></li>' );
        		$( "#student-add-class-list-created" ).html(students.join( "" ));
        	  });
        	
        	
        	
        });
		
		
	});
	
	$("#search-student-create-button").click(function(){
		$( "#student-add-class-list-created" ).html( "Searching ..." );
		var pk = localStorage.getItem("selected_clase");
		var student_name = $( "#search-student-create" ).val();
		school_pk = localStorage.getItem("school_pk");
		$.ajax({type: "GET",  url: getStudentSearch+"?username="+student_name+"&school_id="+school_pk }).
        
        done(function(resp){
        	if (resp.length > 0 ){
        		//Use the clase response Obj
            	var students = [];
            	$.each( resp, function( key, val ) {
            		students.push( "<li><a class='user-to-add' data-user-last-name="+ val.last_name +" data-user-first-name="+ val.first_name +"  data-user-pk="+val.pk+" href='#'>"+ val.last_name +' '+ val.first_name+'</a></li>' );
            		$( "#student-add-class-list-created" ).html(students.join( "" ));
            	  });
        	}else{
        		$( "#student-add-class-list-created" ).html( "No Results" );
        	}
        	

        });
	});
	
	$("#save-created-class").click(function(e){
		e.preventDefault();
		console.log("Click Saved Clase");
		var errors = false;
		var errors_list = []
		
		var class_name = $( "#class_name_create" ).val();
		if (class_name == ""){
			errors_list.push( "<li>Class Name is required</li>" );
			errors = true;
		}
		var teacher = teacher_selection_modify.getValue();
		var password = $( "#class_password_create" ).val();
		var repassword = $( "#class_repassword_create" ).val();
		
		if(password != repassword){
			//$("#class_m_password_error").html("Password mismatch.")
			errors_list.push( "<li>Password mismatch</li>");

			errors = true;
		}
		var email = $( "#class_email_create" ).val().replace(/ /g,'').split(",");
		
		console.log("email");
		console.log(email);
		
		if(!IsEmail(email)){
			//$("#class_m_email_error").html("Invalid Email.")
			errors_list.push( "<li>Invalid Email</li>" );
			errors = true;
		}
		
		if (errors){
			var message = "<p>Errors:</p><br/><ul>"+errors_list.join( "" ) +"</ul>"
			$("#savedCreateClassModal .modal-body span").html(message);
			localStorage.setItem("errors_in_class_creation", "true");
			$('#savedCreateClassModal').modal('show');
			
		}else{
			//SaveItems
			localStorage.setItem("errors_in_class_creation", "false");
			//SaveStudents
			//Recorrer  todos los items de clase_student_list_modify y guardarlos
			var users_class = []
			$( "#clase_student_list_create" ).children().each(function () {
				users_class.push($( this ).find("a").attr("data-user-pk"));
				
			});
			
			$( "#clase_student_list_create" ).html("");
			$( "#class_password_create" ).val("");
			 $( "#class_repassword_create" ).val("");
			 $( "#class_email_create" ).val("");
			 $( "#class_name_create" ).val("");
			 $("#search-student-create").val("");
			 //teacher_selection_modify.empty();
			 teacher_selection_modify.removeFromSelection(teacher_selection_modify.getSelection(), true);
			school_pk = localStorage.getItem("school_pk");
			
			//Redirect close to allClases.
			$.ajax({type: "POST",  url: allClasses, data: JSON.stringify({ class_name: class_name, school_id:school_pk, 
									password:password, email:email, teachers:teacher, students: users_class}) }).
	        fail(function(resp){
				$("#savedCreateClassModal .modal-body span").html("Internal Error, Please try again later.");
	        	$('#savedCreateClassModal').modal('show');
	            
	        }).
	        done(function(resp){
	        	console.log('Good saving')
				$("#savedCreateClassModal .modal-body span").html("Your class has been created successfully");
	        	$('#savedCreateClassModal').modal('show');
	        	
	        });
		}
		
		
	});

	

	

	


	$('.choose-member').slimScroll({
		height: '500px'
		});

	

	
	$(".classes").click(function(){
		$( "#student-add-class-list" ).html( "Loading ..." );
		$("#tutors").css('display','none');
		$("#individual").css('display','none');
		$("#createclass").css('display','block');
		$(".choose-member").css('display','block');
		
		$.ajax({type: "GET",  url: getNews}).
        
        done(function(resp){
        	//resp = JSON.parse(response);
        	console.log(resp.length);
        	if (resp.length > 0 ){
        		//Use the clase response Obj
            	var students = [];
            	$.each( resp, function( key, val ) {
            		console.log(val.title);
            		students.push( "<li><h1><a target='blank' href="+host+"/blog/"+val.slug+">"+ val.title +'</a></h1><img class="news-img" src='+host+val.image+'/><p class="news-p">'+val.description+'</p></li>' );
            		$( "#clase_student_list_create" ).html(students.join( "" ));
            	  });
        	}else{
        		$( "#clase_student_list_create" ).html( "No Results" );
        	}
        	$( "#clase_student_list_create" ).css('display','block');
        	$(".message").css('display','none');
        });
	});

	
	
});