$(document).ready(function() {

	$(".material").click(function(){
		tutors
		$('#tutors').css('display','none');
		$('#materailother').css('display','block');
		$('.content ul.print-button ').css('display','none');
	});

		  $("#maxhelp_list a").click(function() {
		    var theModal = $(this).data( "target" ),
		    videoSRC = $(this).attr( "data-theVideo" ), 
		    videoSRCauto = "https://www.youtube.com/embed/"+videoSRC+"?rel=0&VQ=HD720&autoplay=1" ;
		    $(theModal+' iframe').attr('src', videoSRCauto);
		    $(theModal+' button.close').click(function () {
		        $(theModal+' iframe').attr('src', videoSRC);
		    });   
		  });

	


	
});