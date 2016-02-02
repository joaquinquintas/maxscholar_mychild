$(document).ready(function() {
	
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
	

	csrftoken = Cookies.get('csrftoken');
	sessionId = Cookies.get('maxscholarSessionId');

	
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	
	function setHeader(xhr) {
        // as per HTTP authentication spec [2], credentials must be
        // encoded in base64. Lets use window.btoa [3]
        xhr.setRequestHeader ("Authorization", "Basic " +
                               btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")));
    }
	

		
	$.ajaxSetup({
		  xhrFields: {
		    withCredentials: true
		  }
		});
	
	$.ajax({type: "POST", url: checkloginStatus,  xhrFields: {
	    withCredentials: true
	  }}).
    fail(function(resp){
        console.log('Not loggued.')
        //$('#login-modal').modal('show');
        
        $('.reports-tab-title').removeClass('active');
		 $('#reports').removeClass('active');
		 $('.individual-title').removeClass('active');
		 $('.content .welcome-notice ').css('opacity','0');
		 $('#class').removeClass('active');
		 $('.content ul.print-button ').css('display','none');
		 $('#submenu').css('display','none');
		 $('#login_page').css('display','block');
		 $(".logo").html("<a href='http://maxscholar.com'>MAXSCHOLAR</a>");
		 $('#selected_dashboard_school').css('display','none');
		 $('#menu_items').css('display','none');
		 $(".welcome-notice-outer").hide();
		         
        
    }).
    done(function(resp){
    	resp = JSON.parse(resp);
    	after_login(resp, false)


    });


	
	
	
	$('#user_login_password_page').keypress(function (e) {
		 var key = e.which;
		 
		 if(key == 13)  // the enter key code
		  {
			 $('.enter-pass-login').trigger( "click" );
		    return false;  
		  }
		});
	
	$('#user_login_username_page').focus();
	$(".enter-pass-login").click(function(){

		username = $('#user_login_username_page').val();
		password = $('#user_login_password_page').val();
		function setHeader(xhr) {
	        // as per HTTP authentication spec [2], credentials must be
	        // encoded in base64. Lets use window.btoa [3]
	        xhr.setRequestHeader ("Authorization", "Basic " +
	                               btoa(username + ':' + password));
	    }
	 
	    $.ajax({type: "POST",  url: login,  beforeSend: setHeader}).
	        fail(function(resp){
	        	console.log(resp);
	            console.log('bad credentials.')
	            $( "#error_login_page" ).html("Invalid username and/or password");
	        }).
	        done(function(resp){
	        	resp = JSON.parse(resp);
	        	after_login(resp, false);
	        	});
	});
	
	function after_login(resp, show_intro){


		localStorage.setItem("school_pk", 557);
    	 localStorage.setItem("schools",JSON.stringify(resp.schools) );
    	
    	
    	localStorage.setItem("username", resp.user.username);
    	localStorage.setItem("first_name", resp.user.first_name);
    	localStorage.setItem("last_name",  resp.user.last_name);
    	localStorage.setItem("pk", resp.user.pk);
    	
    	
    	
    	$(".welcome-notice h3").html("Welcome, "+resp.user.first_name +" "+ resp.user.last_name+".");
    	$('#login-modal').modal('hide');
    	
        
        console.log(show_intro);

    		    		
		 $('.reports-tab-title').removeClass('active');
		 $('#reports').removeClass('active');
		 $('.individual-title').removeClass('active');
		 $('.content .welcome-notice ').css('opacity','1');
		 $('#class').removeClass('active');
		 $('.content ul.print-button ').css('display','none');
    		 
    		 
    		 
    		 
   
        
        $('#submenu').css('display','block');
		 $('#login_page').css('display','none');
		 $(".logo").html("<a href='index.html'>DASHBOARD</a>");
		 $('#menu_items').css('display','block');
		 $(".welcome-notice-outer").show();
		 $(".login_page").hide();  
        
    	 	
	}
	
	$("#help_icon").click(function(e){
		e.preventDefault();
		startIntro();
		
	});
	

	
	$(".logout").click(function(e){
		e.preventDefault();
		//call log out function server
		
		$.ajax({type: "POST", url: logout}).
	    fail(function(resp){
	        console.log('Not loggued.')
	        $('#login-modal').modal('show');
	    }).
	    done(function(resp){
	    	localStorage.setItem("username", null);
	    	localStorage.setItem("password", null);
	    	localStorage.setItem("pk", null);
	    	localStorage.setItem("schools", null);
	    	localStorage.setItem("school_pk", null);
	    	
	    	$('.reports-tab-title').removeClass('active');
			 $('#reports').removeClass('active');
			 $('.individual-title').removeClass('active');
			 $('.content .welcome-notice ').css('opacity','0');
			 $('#class').removeClass('active');
			 $('.content ul.print-button ').css('display','none');
			 $('#submenu').css('display','none');
			 $('#login_page').css('display','block');
			 $(".logo").html("<a href='http://maxscholar.com'>MAXSCHOLAR</a>");
			 $('#selected_dashboard_school').css('display','none');
			 $('#menu_items').css('display','none');
			 $(".welcome-notice-outer").hide();
			 $(".login_page").show();  

	    });
		
	});
	
	
	function IsEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (regex.test(email) == false){
			return false
		};
	
		return true
		  
		};
	
	$('#error_forgot').html("");
	$('#forgot_email').val("");
	
	$("#adminModal .close-btn").click(function(e){
		e.preventDefault();
		
		email = $('#forgot_email').val();
		
		if(!IsEmail(email)){
			$('#error_forgot').html("Email invalid")
			return false
		}
		$.ajax({type: "POST", url: forgotPassword, data: JSON.stringify({ email: email}) }).
	    fail(function(resp){
	        console.log('invalid email')
	        $('#error_forgot').html("Email doesn't exist in Maxscholar")
	    }).
	    done(function(resp){
	    	$('#forgot_email').val("");
	    	$('#error_forgot').html("");
	    	$("#adminModal").modal("hide");
	    	$("#ThanksadminModal").modal("show");

	    });
		
	});
	
});