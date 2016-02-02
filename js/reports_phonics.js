$(document).ready(function() {


$("#maxphonics_ind").click(function(){
	$("#phonics_table").css("display","none");
	$(".constant-table-detail h2").css("display","block");
	$( "li.active .phonics_apps" ).trigger( "click" );
	
	start_date = localStorage.getItem("individual_report_start_date");
	end_date = localStorage.getItem("individual_report_end_date");
	user_pk = localStorage.getItem("individual_report_student_id");
	
	to_send={start_date:start_date, end_date:end_date, user_id:user_pk}
	
	$.ajax({type: "GET", url: getMaxphonicsGamesReport, data:to_send}).
	done(function(data){
		data = JSON.parse(data);
		prepare_word_builder_chart(data.maxwordbuilder);
		prepare_memory_chart(data.memory);
		prepare_spacerhyming_chart(data.spacerhyming);
		prepare_withinwords_chart(data.withinwords);
	});
	
	
	});



$(".phonics_apps").click(function(e){
	
	$("#phonics_table").css("display","none");
	e.preventDefault();
	var chapters = $(this).data("chapters");
	var chapters_list = chapters.split(",");
	$(this).parent().parent().children().removeClass('active');
	$(this).parent().addClass("active");
	$('#chapters').html("");
	
	chapters_list.forEach(function(item, i) {
		var li = $('<li>');
		if(item.indexOf('-') === -1){
			exer_list = item.split("");
		}else{
			exer_list = item.split("-");
		}
		exer = exer_list.join(",");
		
		if(i==0){
			 li.attr('class','active');
			 active_list = exer_list;
			 
			
		}
		
		$('#chapters').append(
				   li.append(
				        $('<a>').attr('href','#').attr(
				        		"class","phonics_chapters").attr('data-exercises', exer).append(
				            item
				)));
		  
	});
	createTable(active_list);
	
})




$("#chapters").on("click", ".phonics_chapters", function(e){
	$("#phonics_table").css("display","none");
	e.preventDefault();
	var exercises = $(this).data("exercises");
	var exercises_list = exercises.split(",");
	$(this).parent().parent().children().removeClass('active');
	$(this).parent().addClass("active");
	createTable(exercises_list);
	
	});

function createTable(exercises_list){
	$(".constant-table-detail h2").css("display","block");
	app_id = $("#apps").children( ".active" ).eq(0).children('a').data("app");
	capther_slug = $("#chapters").children( ".active" ).eq(0).children('a').html();

	user_pk = localStorage.getItem("individual_report_student_id");
	//user_pk = 3;
	
	to_send={ user_id:user_pk,capther_slug:capther_slug, app_id:app_id}
	
	$.ajax({type: "GET", url: getIndividualReportPhonics, data:to_send}).
	done(function(data){
		data = JSON.parse(data);
		$("#phonics_table_content").html("");
		exercises_list.forEach(function(item, i) {
			visual_drill = false;
			handwriting_drill = false;
			auditory_drill = false;
			sound_blending_drill = false;
			fluency_drill = null;
			sight_words = null;
			controlled_readers = false;
			comments = null;
			
			$.each( data, function( key, val ) {

				if (val.term == item){
					visual_drill = val.visual_drill;
					handwriting_drill = val.handwriting_drill;
					auditory_drill = val.auditory_drill;
					sound_blending_drill = val.sound_blending_drill;
					fluency_drill = val.fluency_drill;
					sight_words = val.sight_words;
					controlled_readers = val.controlled_readers;
					comments = val.comments;
					
					return false
					
				}
			});
			
			
			img = $('<img>').attr("src","images/check-mark-icon.png");
			click = "-"
			
			var tr = $('<tr>');
			tr.append($('<td>').attr('class','exercise_letter').attr('width','8%').append(item));

			if(visual_drill == true){
				img = $('<img>').attr("src","images/check-mark-icon.png");
				tr.append($('<td>').attr('class','visual_drill').attr('width','11.5%').append(img));

			}else{
				click = "-"
				tr.append($('<td>').attr('class','visual_drill').attr('width','11.5%').append(click));

			}
			if (handwriting_drill == true){
				img = $('<img>').attr("src","images/check-mark-icon.png");
				tr.append($('<td>').attr('class','handwriting_drill').attr('width','11.5%').append(img));
			}else{
				click = "-"
				tr.append($('<td>').attr('class','handwriting_drill').attr('width','11.5%').append(click));
			}
			
			if (auditory_drill == true){
				img = $('<img>').attr("src","images/check-mark-icon.png");
				tr.append($('<td>').attr('class','auditory_drill').attr('width','11.5%').append(img));
			}else{
				click = "-"
				tr.append($('<td>').attr('class','auditory_drill').attr('width','11.5%').append(click));
			}
			
			if(sound_blending_drill == true){
				img = $('<img>').attr("src","images/check-mark-icon.png");
				tr.append($('<td>').attr('class','sound_blending_drill').attr('width','11.5%').append(img));
			}else{
				click = "-"
				tr.append($('<td>').attr('class','sound_blending_drill').attr('width','11.5%').append(click));
			}
			
			
			
			if(fluency_drill == null){
				tr.append($('<td>').attr('width','11.5%').append("-"));
			}else{
				tr.append($('<td>').attr('width','11.5%').append(fluency_drill));
			}
			
			if(sight_words == null){
				tr.append($('<td>').attr('width','11.5%').append("-"));
				}else{
				tr.append($('<td>').attr('width','11.5%').append(sight_words));
			}
			
			if(controlled_readers == true){
				img = $('<img>').attr("src","images/check-mark-icon.png");
				tr.append($('<td>').attr('class','controlled_readers').attr('width','11.5%').append(img));
			}else{
				click = "-"
				tr.append($('<td>').attr('class','controlled_readers').attr('width','11.5%').append(click));

			}
			
			if(comments == null){
				tr.append($('<td>').attr('width','11.5%').append("-"));
			}else{
				tr.append($('<td>').attr('width','11.5%').append(comments));
			}
			
			$("#phonics_table_content").append(tr);
		});
		$("#phonics_table").css("display","block");
		$(".constant-table-detail h2").css("display","none");
		
	});
	
	
}





function prepare_word_builder_chart(data){
	var chart = new Highcharts.Chart({
		chart: {
		renderTo: 'container20',
		type:'pie',
		backgroundColor: '#f2f2f2'
		},
		title: {
		text: 'Max Word Builder'
		},
		colors: [ '#ee8984','#84b4ea'] ,
		credits: {
		enabled: false
		},
		plotOptions: {
		series: {
		dataLabels: {
		enabled: true,
		formatter: function() {
		return Math.round(this.percentage*100)/100 + ' %';
		},
		distance: -30,
		color:'white'
		}
		}
		},

		series: [{
		type: 'pie',
		name: 'Max Word Builder',
		data: [
		['Incorrect',   data.incorrect],
		{
		name: 'Correct',
		y: data.correct,
		sliced: true,
		selected: true
		},


		]
		}]
		});
}
function prepare_memory_chart(data){
	var chart = new Highcharts.Chart({
		chart: {
		renderTo: 'containerMaxphonicGame4',
		type:'pie',
		backgroundColor: '#f2f2f2'

		},
		title: {
			text: 'Max Memory'
			},
		colors: [ '#ee8984','#84b4ea'] ,
		credits: {
		enabled: false
		},
		plotOptions: {
		series: {
		dataLabels: {
		enabled: true,
		formatter: function() {
		return Math.round(this.percentage*100)/100 + ' %';
		},
		distance: -30,
		color:'white'
		}
		}
		},

		series: [{
		type: 'pie',
		name: 'Max Memory',
		data: [
		['Incorrect',   data.incorrect],
		{
		name: 'Correct',
		y: data.correct,
		sliced: true,
		selected: true
		},


		]
		}]
		});
}
function prepare_spacerhyming_chart(data){
	var chart = new Highcharts.Chart({
		chart: {
		renderTo: 'container21',
		type:'pie',
		backgroundColor: '#f2f2f2'
		},
		title: {
			text: 'Max Space Rhyming'
			},
		colors: [ '#ee8984','#84b4ea'] ,
		credits: {
		enabled: false
		},
		plotOptions: {
		series: {
		dataLabels: {
		enabled: true,
		formatter: function() {
		return Math.round(this.percentage*100)/100 + ' %';
		},
		distance: -30,
		color:'white'
		}
		}
		},

		series: [{
		type: 'pie',
		name: 'Max Space Rhyming',
		data: [
		['Incorrect',   data.incorrect],
		{
		name: 'Correct',
		y: data.correct,
		sliced: true,
		selected: true
		},


		]
		}]
		});
}
function prepare_withinwords_chart(data){
	var chart = new Highcharts.Chart({
		chart: {
		renderTo: 'container22',
		type:'pie',
		backgroundColor: '#f2f2f2'
		
		},
		title: {
			text: 'Max Words Within Words'
			},
		colors: [ '#ee8984','#84b4ea'] ,
		credits: {
		enabled: false
		},
		plotOptions: {
		series: {
		dataLabels: {
		enabled: true,
		formatter: function() {
		return Math.round(this.percentage*100)/100 + ' %';
		},
		distance: -30,
		color:'white'
		}
		}
		},

		series: [{
		type: 'pie',
		name: 'Max Words Within Words',
		data: [
		['Incorrect',   data.incorrect],
		{
		name: 'Correct',
		y: data.correct,
		sliced: true,
		selected: true
		},


		]
		}]
		});
}

});