$(document).ready(function() {
	$('.tutors').click(function(){

		$('#tutors').css('display', 'block');
		$('#myprofile').css('display', 'block');
		$("#message").val("");
		$("#subject").val("");
		$("#subject").focus();
		
		
	});
	

	$("#send").click(function(e){

			
		
			e.preventDefault();
			data = {note:notes, hour_start:hour_start, minutes_start:minutes_start, period_start:period_start,
					hour_end:hour_end, minutes_end:minutes_end, period_end:period_end, session_date:session_date}
			to_send = JSON.stringify(data);
			$.ajax({type: "POST",  url: setSession+rel_pk, data: to_send}).
	        fail(function(resp){
				$("#TutorSessionSave .modal-body span").html("Internal Error, Please try again later.");
	        	$('#TutorSessionSave').modal('show');
	            
	        }).
	        done(function(resp){

	    		
	        });

			

	})
});