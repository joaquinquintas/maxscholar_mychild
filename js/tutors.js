$(document).ready(function() {
	$('.tutors').click(function(){

		$('#tutors').css('display', 'block');
		$('#myprofile').css('display', 'block');
		$("#message").val("");
		$("#subject").val("");
		$("#subject").focus();
		
		
	});
	

	$("#send").click(function(e){

		message = $("#message").val();
		subject = $("#subject").val();
		
			e.preventDefault();
			data = {message:message, subject:subject}
			to_send = JSON.stringify(data);
			$.ajax({type: "POST",  url: getContact, data: to_send}).
	        fail(function(resp){
				$("#TutorSessionSave .modal-body span").html("Internal Error, Please try again later.");
	        	$('#TutorSessionSave').modal('show');
	            
	        }).
	        done(function(resp){

	        	$("#TutorSessionSave .modal-body span").html("Message sent!<br> We are going to contact you soon!");
	        	$('#TutorSessionSave').modal('show');
	        });

			

	})
});