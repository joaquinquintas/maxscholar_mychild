
$(document).ready(function() {
	
	selector = ".license"
		$(selector).click(function(e){
			e.preventDefault();
			$('.content .print-button ').css('display','none');
		});
	$(".printButton1").click(function(e){
		e.preventDefault();
		//Popup("<div style='display:block'class='"+$(".myDivToPrint").attr('class') +"'>"+$(".myDivToPrint").html()+"</div>");

		
		$(".myDivToPrint").print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: "css/print.css",
            noPrintSelector: ".no-print",
            iframe: false,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,

            timeout: 250
    });
		
	});
	

	$(".printButton").click(function(e){
		e.preventDefault();
		printDashboard();
		})
	
	
});

function printDashboard() {
    window.print();
}

/**
 * 
 * $(".myDivToPrint").printElement({pageTitle:'Classes',printMode:'popup',
            overrideElementCSS:[
                        		'../css/bootstrap.min.css',
                        		'../css/style.css',
                        		]
                                    });
 * **/


    
function Popup(data) {
	
    var mywindow = window.open();
    mywindow.document.open("text/html");
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<link href="css/bootstrap.min.css" rel="stylesheet">');  
    mywindow.document.write('<link rel="stylesheet" href="css/datepicker.css">');  
    mywindow.document.write('<link rel="stylesheet" href="css/lc_switch.css">');  
    mywindow.document.write('<link href="css/introjs.css" rel="stylesheet">'); 
    mywindow.document.write('<link href="css/print.css" rel="stylesheet">');
    
    mywindow.document.write('<link href="js/magicsuggest/magicsuggest-min.css" rel="stylesheet">');  
    mywindow.document.write('<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">'); 
    mywindow.document.write('</head><body>');
    mywindow.document.write(data);
    
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.print();
    mywindow.onfocus = function () {
    	mywindow.close(); // Close the window
    }
}
