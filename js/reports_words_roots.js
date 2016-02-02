

	
function populate_table_latin(data){
		set_id = data.set_id;
		selector = "#latin_"+set_id;
		$(selector + " .syllabication").html(data.syllabication);
		$(selector + " .definition").html(data.definition);
		$(selector + " .roots_into_words").html(data.roots_into_words);
		$(selector + " .roots_into_sentences").html(data.roots_into_sentences);
		$(selector + " .roots_words").html(data.roots_words);
		$(selector + " .roots_sentences").html(data.roots_sentences);
		
		if(data.comment !=null){
			$(selector + " .comment").html(data.comment);
		}
		if(data.wpm !=null){
			$(selector + " .wpm").html(data.wpm);
		}
		if(data.text !=null){
			selector = selector + "_modal";
			$(selector + " .modal-body").html(data.text);
		}

	};

function populate_greek_latin(data){
	set_id = data.set_id;
	selector = "#greek_"+set_id;
	$(selector + " .syllabication").html(data.syllabication);
	$(selector + " .definition").html(data.definition);
	$(selector + " .roots_into_words").html(data.roots_into_words);
	$(selector + " .roots_into_sentences").html(data.roots_into_sentences);
	$(selector + " .roots_words").html(data.roots_words);
	$(selector + " .roots_sentences").html(data.roots_sentences);
	
	if(data.comment !=null){
		$(selector + " .comment").html(data.comment);
	}
	if(data.wpm !=null){
		$(selector + " .wpm").html(data.wpm);
	}
	if(data.text !=null){
		selector = selector + "_modal";
		$(selector + " .modal-body").html(data.text);
	}

};

$(document).ready(function() {
	$('#latin_roots_table').find('input:text').val('');
	$('#greek_roots_table').find('input:text').val('');



	

	
	
	
	
	$(".see_text").click(function(e){
		e.preventDefault();
		id = $(this).parent().parent().attr('id');
		selector = "#"+id+"_modal";
		$(selector).modal('show');
	});
	$("#greek_roots").click(function(e){
		$("#greek_roots_table").css("display","none");

		e.preventDefault();
		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "23635";
		to_send={user_id:studen_pk};
		
		$.ajax({type: "GET", url: getMaxwordsGreekReport, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			$.each( data, function( key, val ) {
				populate_greek_latin(val)
				
				
			});
			$("#greek_roots_table").css("display","block");
		});
		
		
		
	});
	
	$("#latin_roots").click(function(e){
		$("#latin_roots_table").css("display","none");

		e.preventDefault();
		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "23635";
		to_send={user_id:studen_pk};
		
		$.ajax({type: "GET", url: getMaxwordsLatinReport, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			$.each( data, function( key, val ) {
				populate_table_latin(val)
				
				
			});
			$("#latin_roots_table").css("display","block");
		});
		
		
		
	});

});