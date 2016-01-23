
function post_maxwords_pre_suf_data(field, value, group_id, type){

		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "11421";
		$.ajax({type: "POST",  url: getMaxwordsPreSufReport, data: JSON.stringify({ field: field, value:value, 
			group_id:group_id, user_id:studen_pk, type:type}) }).
		done(function(resp){
		//Nothings happends
		
		})
	};

function post_maxwords_spelling_data(field, value, rule_id){

	studen_pk = localStorage.getItem("individual_report_student_id");
	//studen_pk = "25922";
	$.ajax({type: "POST",  url: getMaxwordsSpellingReport, data: JSON.stringify({ field: field, value:value, 
		rule_id:rule_id, user_id:studen_pk}) }).
	done(function(resp){
	//Nothings happends
	
	})
};

function post_maxwords_clover_final_comment(value){
	studen_pk = localStorage.getItem("individual_report_student_id");
	//studen_pk = "15536";
	$.ajax({type: "POST",  url: getMaxwordsCloverReportFinal, data: JSON.stringify({ value: value, user_id:studen_pk}) }).
	done(function(resp){
	//Nothings happends
	
	});
};


function post_maxwords_clover_data(field, value, group_id, chapter_id){

		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "15536";
		$.ajax({type: "POST",  url: getMaxwordsCloverReport, data: JSON.stringify({ field: field, value:value, 
			group_id:group_id, chapter_id:chapter_id, user_id:studen_pk}) }).
		done(function(resp){
		//Nothings happends
		
		})
	};

	
function populate_table_prefixes_table(data){
		group_id = data.group_id;
		selector = "#prefixes_"+group_id;
		$(selector + " .sentences").html(data.sentences);
		$(selector + " .exercise").html(data.score);
		if (data.details.sound_rule_mastery == "true"){
			img = $('<img>').attr("src","images/check-mark-icon.png");
			$(selector + " .sound_rule_mastery").html("");
			$(selector + " .sound_rule_mastery").append(img);
		}
		
		if(data.details.comment !=null){
			$(selector + " .comment").removeAttr('placeholder');
			$(selector + " .comment").val(data.details.comment);
		}

	};

function populate_table_suffixes_table(data){
	group_id = data.group_id;
	selector = "#suffixes_"+group_id;
	$(selector + " .sentences").html(data.sentences);
	$(selector + " .exercise").html(data.score);
	if (data.details.sound_rule_mastery == "true"){
		img = $('<img>').attr("src","images/check-mark-icon.png");
		$(selector + " .sound_rule_mastery").html("");
		$(selector + " .sound_rule_mastery").append(img);
	}
	
	if(data.details.comment !=null){
		$(selector + " .comment").removeAttr('placeholder');
		$(selector + " .comment").val(data.details.comment);
	}

};
function populate_table_clover_table(data){
	chapter_id = data.chapter_id;
	$.each( data.details, function( key, val ) {
		selector = "#clover_"+chapter_id+"_"+val.id;
		if (val.sound_rule_mastery == true){
			img = $('<img>').attr("src","images/check-mark-icon.png");
			$(selector + " .sound_rule_mastery").html("");
			$(selector + " .sound_rule_mastery").append(img);
		}
		if(val.wpm != null){
			$(selector + " .wpm").removeAttr('placeholder');
			$(selector + " .wpm").val(val.wpm);
		}
		if(val.comment !=null){
			$(selector + " .comment").removeAttr('placeholder');
			$(selector + " .comment").val(val.comment);
		}
	});
}

function populate_table_spelling_table(data){
	selector = "#spelling_" + data.rule_id;
	$(selector + " .questions").html(data.question_score);
	$(selector + " .exercise").html(data.score);
	
	console.log(data.details);
	console.log(data.details.sound_rule_mastery);
	console.log(true);
	if (data.details.sound_rule_mastery == "true"){
		console.log("is true!");
		img = $('<img>').attr("src","images/check-mark-icon.png");
		$(selector + " .sound_rule_mastery").html("");
		$(selector + " .sound_rule_mastery").append(img);
	}
	if(data.details.wpm != null){
		$(selector + " .wpm").removeAttr('placeholder');
		$(selector + " .wpm").val(data.details.wpm);
	}
	if(data.details.comment !=null){
		$(selector + " .comment").removeAttr('placeholder');
		$(selector + " .comment").val(data.details.comment);
	}

	

}

$(document).ready(function() {
	$('#clover-table-detail').find('input:text').val(''); 
	$('#speeling-table-detail').find('input:text').val('');  
	$('#pre_suf-table-detail').find('input:text').val(''); 


	
	$('#prefixes_col').on('click', function(e) {
		e.preventDefault();
		if($(this).text() == 'Hide all (13)'){
			$(this).css('background' , 'url(../images/show-all-icon.png) left center no-repeat;');
		}else{
			$(this).css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
		}
		$(this).text(function(i,v) {
			if(v == 'Hide all (13)'){
				$(this).css('background' , 'url(../images/show-all-icon.png) left center no-repeat;');
			}else{
				$(this).css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
			}
			return v === 'Hide all (13)' ?  'Show all (13)'  : 'Hide all (13)';
		});
		$('.prefixes_table ').slideToggle('slow');
		$('.search-filed-top ').css('opacity','1');
		});
		
		$('#suffixes_col').on('click', function(e) {
			e.preventDefault();
			$(this).text(function(i,v) {
				if(v == 'Hide all (5)'){
					$(this).css('background' , 'url(../images/show-all-icon.png) left center no-repeat;');
				}else{
					$(this).css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
				}
				return v === 'Hide all (5)' ?  'Show all (5)'  : 'Hide all (5)';
				
			});
			$('.suffixes_table').slideToggle('slow');
			$('.search-filed-top ').css('opacity','1');
		});
		
		
	
	$('#doble_vowel_groups').on('click', function(e) {
	e.preventDefault();
	$(this).text(function(i,v) {
		return v === 'Hide all (31)' ?  'Show all (31)'  : 'Hide all (31)';
		$('#doble_vowel_groups').css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
	});
	$('.doble_vowels_table ').slideToggle('slow');
	$('.search-filed-top ').css('opacity','1');
	});
	
	$('#r_controlled_groups').on('click', function(e) {
		e.preventDefault();
		$(this).text(function(i,v) {
			return v === 'Hide all (13)' ?  'Show all (13)'  : 'Hide all (13)';
			$('#r_controlled_groups').css('background' , 'url(../images/hide-all-icon.png) left center no-repeat;');
		});
		$('.r_controlled_table ').slideToggle('slow');
		$('.search-filed-top ').css('opacity','1');
	});
	

	$("#clover-table-detail .sound_rule_mastery").click( function(e){
		e.preventDefault();
		var tag_name = $(this).children().get(0).tagName;
		$(this).html("");
		
		if(tag_name == "A"){
			$(this).append($("<img>").attr("src","images/check-mark-icon.png"));
			value_to_post = true
		}else{
			$(this).append($('<a>').attr("href","#").append("Click to Check"));
			value_to_post = false
		}
		
		group_id = $(this).parent().attr('data-group');
		chapter_id = $(this).parent().attr('data-chapter');
		post_maxwords_clover_data("sound_rule_mastery", value_to_post, group_id, chapter_id);

		
	});


	$(".wpm, .comment").focus(function(e){
		e.preventDefault();
		console.log("focus!!");
		$(this).removeAttr('placeholder');
		
		
	});

	
	$("#clover-table-detail").on("focusout", ".final_clover_review_comment", function(e){
		e.preventDefault();
		value_to_post = $(this).val();
		if( value_to_post == ""){
			$(this).attr('placeholder', "Type");
			value_to_post =null;
		}
		
		post_maxwords_clover_final_comment(value_to_post);
	});
	$("#clover-table-detail").on("focusout", ".wpm, .comment", function(e){
		e.preventDefault();
		option_to_post = $(this).attr('class');
		value_to_post = $(this).val();
		if( value_to_post == ""){
			$(this).attr('placeholder', "Type");
			value_to_post =null;
		}
		group_id = $(this).parent().parent().attr('data-group');
		chapter_id = $(this).parent().parent().attr('data-chapter');
		post_maxwords_clover_data(option_to_post, value_to_post, group_id, chapter_id);
		
		
		
	});
	
	
	$("#speeling-table-detail").on("focusout", ".wpm, .comment", function(e){
		e.preventDefault();
		option_to_post = $(this).attr('class');
		value_to_post = $(this).val();
		if( value_to_post == ""){
			$(this).attr('placeholder', "Type");
			value_to_post =null;
		}
		rule_id = $(this).parent().parent().attr('data-id');
		post_maxwords_spelling_data(option_to_post, value_to_post, rule_id);
		
		
		
	});
	
	
	$("#pre_suf-table-detail").on("focusout", ".comment", function(e){
		e.preventDefault();
		option_to_post = $(this).attr('class');
		value_to_post = $(this).val();
		if( value_to_post == ""){
			$(this).attr('placeholder', "Type");
			value_to_post =null;
		}
		group_id = $(this).parent().parent().attr('data-id');
		type = $(this).parent().parent().attr('data-type');
		post_maxwords_pre_suf_data(option_to_post, value_to_post, group_id, type);
		
		
		
	});
	$("#pre_suf-table-detail .sound_rule_mastery").click( function(e){
		e.preventDefault();
		var tag_name = $(this).children().get(0).tagName;
		$(this).html("");
		
		if(tag_name == "A"){
			$(this).append($("<img>").attr("src","images/check-mark-icon.png"));
			value_to_post = true
		}else{
			$(this).append($('<a>').attr("href","#").append("Click to Check"));
			value_to_post = false
		}
		
		group_id = $(this).parent().attr('data-id');
		console.log(group_id);
		type = $(this).parent().attr('data-type');
		post_maxwords_pre_suf_data("sound_rule_mastery", value_to_post, group_id, type);

		
	});
	$("#speeling-table-detail .sound_rule_mastery").click( function(e){
		e.preventDefault();
		var tag_name = $(this).children().get(0).tagName;
		$(this).html("");
		
		if(tag_name == "A"){
			$(this).append($("<img>").attr("src","images/check-mark-icon.png"));
			value_to_post = true
		}else{
			$(this).append($('<a>').attr("href","#").append("Click to Check"));
			value_to_post = false
		}
		
		rule_id = $(this).parent().attr('data-id');
		console.log(rule_id);
		post_maxwords_spelling_data("sound_rule_mastery", value_to_post, rule_id);

		
	});
	
	
	$("#spelling_report").click(function(e){
		$("#speeling-table-detail").css("display","none");
		e.preventDefault();
		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "25922";
		to_send={user_id:studen_pk};
		
		$.ajax({type: "GET", url: getMaxwordsSpellingReport, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			$.each( data.spellings, function( key, val ) {
				populate_table_spelling_table(val)
				
				
			});
			$("#speeling-table-detail").css("display","block");
		});
		
		
		
	});
	
	
	$("#pre_suf_report").click(function(e){
		$("#pre_suf-table-detail").css("display","none");
		e.preventDefault();
		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "11421";
		to_send={user_id:studen_pk};
		
		$.ajax({type: "GET", url: getMaxwordsPreSufReport, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			$.each( data.prefixes, function( key, val ) {
				populate_table_prefixes_table(val)
				
				
			});
			$.each( data.suffixes, function( key, val ) {
				populate_table_suffixes_table(val)
				
				
			});
			$("#pre_suf-table-detail").css("display","block");
		});
		
		
		
	})
	
	
	$("#maxwords_ind").click(function(e){
		
		e.preventDefault();
		$("#clover-table-detail").css("display","none");
		studen_pk = localStorage.getItem("individual_report_student_id");
		//studen_pk = "15536";
		to_send={user_id:studen_pk};
		
		$.ajax({type: "GET", url: getMaxwordsCloverReport, data:to_send}).
		done(function(data){
			
			data = JSON.parse(data);
			final_score = data["final"].score;
			$("#final_score").html(final_score);
			final_time = data["final"].time;
			$("#final_time").html(final_time);
			final_comment = data["final"].details.comment;
			if(final_comment != null){
				$(".final_clover_review_comment").val(final_comment);
				$(".final_clover_review_comment").removeAttr('placeholder');
			}else{
				
			}
			
			$.each( data.clovers, function( key, val ) {

				if(val.chapter_id == 2){
					selector = ".closed_syllables_clover_score";
					$(selector).html(val.score);
					
				}
				if(val.chapter_id == 3){
					selector = ".consonant_le_clover_score";
					$(selector).html(val.score);
				}
				if(val.chapter_id == 4){
					selector = ".open_syllables_clover_score";
					$(selector).html(val.score);
				}
				if(val.chapter_id == 5){
					selector = ".doble_vowels_clover_score";
					$(selector).html(val.score);
				}
				if(val.chapter_id == 6){
					selector = ".vowel_consonant_clover_score";
					$(selector).html(val.score);
				}
				if(val.chapter_id == 7){
					selector = ".r_controlled_clover_score";
					$(selector).html(val.score);
				}
				
				populate_table_clover_table(val);
				
			});
			
			$.each( data.reviews, function( key, val ) {
				selector = "#review_chap_"+val.chapters;
				console.log(selector);
				$(selector).html(val.score+" %");
			});
			$("#clover-table-detail").css("display","block");
		});
	});
	
	$("#class_words_report").click(function(e){
		e.preventDefault();
			
		start_date = localStorage.getItem("class_report_start_date");
		end_date = localStorage.getItem("class_report_end_date");
		class_pk = localStorage.getItem("class_id_report");
		
		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
		
		$.ajax({type: "GET", url: getClassMaxwordsReport, data:to_send}).
		done(function(data){
			
			$("#words_class_report").html("");
			data = JSON.parse(data);
			sum_time = 0;
			sum_clover = 0;
			sum_spelling = 0;
			sum_pre_suf = 0;
			sum_latin = 0;
			sum_greek = 0;
			
			$.each( data.reports, function( key, val ) {
				sum_time = sum_time + val.time.value;
				sum_clover = sum_clover + val.clover.value;
				sum_spelling = sum_spelling + val.spelling.value;
				sum_pre_suf = sum_pre_suf + val.pre_suf.value;
				sum_latin = sum_latin + val.latin.value;
				sum_greek = sum_greek + val.greek.value;
				
				tr = '<tr>' +
                '<td width="14.6%">'+ val.student.name +'</td>'+
                '<td width="14.2%"> '+ val.time.value+'</td>'+
                '<td width="14.2%">'+ val.clover.value+' </td>'+
                '<td width="14.2%"> '+ val.spelling.value+'</td>'+
                '<td width="14.2%">'+ val.pre_suf.value+' </td>'+
                '<td width="14.2%"> '+ val.latin.value+'</td>'+
                '<td width="14.2%">'+ val.greek.value+' </td>'+
                '</tr>';
				$("#words_class_report").append(tr);
			});
			
			total = data.reports.length;
			
			tr = '<tr class="average">' +
            '<td width="14.6%">Average</td>'+
            '<td width="14.2%"> '+ getAvg(sum_time, total) +'</td>'+
            '<td width="14.2%">'+ getAvg(sum_clover, total) +' </td>'+
            '<td width="14.2%"> '+ getAvg(sum_spelling, total)+'</td>'+
            '<td width="14.2%">'+ getAvg(sum_pre_suf, total)+' </td>'+
            '<td width="14.2%"> '+ getAvg(sum_latin, total)+'</td>'+
            '<td width="14.2%">'+ getAvg(sum_greek, total)+' </td>'+
            '</tr>';
			
			$("#words_class_report").append(tr);
		});
		
		
		//container6
		
	});
	
function getAvg(sum, total){
	return  (sum/total).toFixed(1);
}
});