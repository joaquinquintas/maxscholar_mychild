$(document).ready(function() {
	$('.license').click(function(){
		$('.license-notice p').html("Loading ...");
		school_pk = localStorage.getItem("school_pk");
		toSend = {school_id:school_pk};
		$.ajax({type: "GET",  url: getLicense, data:toSend}).
			done(function(data) {
				data = JSON.parse(data);
				$('.license-notice p').html("Your school is currently using <span>"+ data.used+" out of "+ data.total+"</span> purchased licenses.");
			});
		
	});
});