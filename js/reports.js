
$(document).ready(function() {
	var from_date = new Date();
	from_date.setDate(from_date.getDate()-7);
	var to_date = new Date();

	
	$("#invidiual_report_from_day").val(from_date.getUTCDate());
	$("#invidiual_report_from_month").val(from_date.getUTCMonth() + 1);
	$("#invidiual_report_from_year").val(from_date.getUTCFullYear());
	
	$("#invidiual_report_to_day").val(to_date.getUTCDate());
	$("#invidiual_report_to_month").val(to_date.getUTCMonth() + 1);
	$("#invidiual_report_to_year").val(to_date.getUTCFullYear());
	
	$('.lcs_switch').removeClass('lcs_on');
	$('.lcs_switch').addClass('lcs_off');
	
	$("#see_maxphonics_individual_report").click(function(e){
		e.preventDefault();
		$( ".lcs_wrap" ).trigger( "click" );
		$('.lcs_switch').removeClass('lcs_off');
		$('.lcs_switch').addClass('lcs_on');
		$('.max-read-individual').removeClass('active');
		$('.max-phonics').addClass('active');
		$('#maxread-indivdual').removeClass('active');
		$('#maxphonics-indivdual').addClass('active');
		$( "#maxphonics_ind" ).trigger( "click" );
	});
	
	$(".see-detail-report-btn a").click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 0);
		$( ".lcs_wrap" ).trigger( "click" );
		preparePrint(".indvidual-detail-left");
		$('.lcs_switch').removeClass('lcs_off');
		$('.lcs_switch').addClass('lcs_on');

		});
	
	$("#individual_report").click(function(e){
		$("#report_info_text").html("Loading ...");
		$('.indvidual-detail-left').css('display','none');
    	$('.individual-tab-detail').css('display','none');
		$("#report_individual_selector").html("");
		$("#individual .individual-tab-detail").css("display", "none");
		school_pk = localStorage.getItem("school_pk");
		toSend = {school_id:school_pk};
		$.ajax({type: "GET",  url: getStudentList, data:toSend }).
	    done(function(resp){
	    	$.each( resp, function( key, val ) {
	    		if (val.first_name == "" && val.last_name == ""){
	    			name = val.username;
	    		}else{
	    			name = val.last_name+" "+val.first_name ;
	    		}
	    	var o = new Option(name, val.pk);
			$("#report_individual_selector").append(o);
	    	});
	    	$("#individual .individual-tab-detail").css("display", "block");
	    	$('.indvidual-detail-left').css('display','none');
	    	$('.individual-tab-detail').css('display','block');
	    	$("#report_info_text").html("");
	    });
		
	});
	
	$("#individual_maxreading").on("click", "#not_clickable", function(e){
		e.preventDefault();
	})
	
	$("#generate_individual_report").click(function(e){
		$('.content .individual-tab-detail').css('display','none');
		$('.content .indvidual-detail-left').css('display','none');
		$('.content #indvidual-detail-message').css('display','block');
		user_pk = $("#report_individual_selector").val();
		
		if (user_pk == undefined){
			user_pk = localStorage.getItem("individual_report_student_id");
		}
		
		from_day = $("#invidiual_report_from_day").val();
		from_month = $("#invidiual_report_from_month").val();
		from_year = $("#invidiual_report_from_year").val();
		
		if (from_day == null){
			var from_date = new Date();
			from_date.setDate(from_date.getDate()-7);
			from_day = from_date.getUTCDate();
		}
		
		to_day = $("#invidiual_report_to_day").val();
		console.log(to_day);
		if (to_day == null){
			var to_date = new Date();
			to_day = to_date.getUTCDate();
		}
		to_month = $("#invidiual_report_to_month").val();
		to_year = $("#invidiual_report_to_year").val();
		
		start_date = from_year+"-"+from_month+"-"+from_day;
		end_date = to_year+"-"+to_month+"-"+to_day;
		
		$("#invidual_report_user_name").html("");
		$("#invidual_report_user_username").html("");
		$("#invidual_report_user_level").html("");
		$("#invidual_report_user_type").html("");
		$("#invidual_report_user_date").html("");
		$("#invidual_report_user_pretest").html("");
		$("#invidual_report_user_last_login").html("");
		
		localStorage.setItem("individual_report_start_date", start_date);
		localStorage.setItem("individual_report_end_date", end_date);
		localStorage.setItem("individual_report_student_id", user_pk);
		
		
		
		to_send={start_date:start_date, end_date:end_date, student_id:user_pk}

		$.ajax({type: "GET",  url: getScoreAvg, data:to_send}).
				done(function(data){
					data = JSON.parse(data);
					$("#ind_time").html(data.times_per_week.value);
					$("#ind_score_reading").html(data.maxreading.value);
					$("#ind_score_words").html(data.maxwords.value);
					$("#ind_score_places").html(data.maxplaces.value);
					$("#ind_score_bios").html(data.maxbios.value);
					$("#ind_score_music").html(data.maxmusic.value);
					
					$('#ind_per_reading').removeClass();
					$('#ind_per_words').removeClass();
					$('#ind_per_places').removeClass();
					$('#ind_per_bios').removeClass();
					$('#ind_per_music').removeClass();
					
					$("#ind_per_reading").html(data.maxreading.eval.label);
					$('#ind_per_reading').addClass(data.maxreading.eval.id);
					$("#ind_per_words").html(data.maxwords.eval.label);
					$('#ind_per_words').addClass(data.maxwords.eval.id);
					$("#ind_per_places").html(data.maxplaces.eval.label);
					$('#ind_per_places').addClass(data.maxplaces.eval.id);
					$("#ind_per_bios").html(data.maxbios.eval.label);
					$('#ind_per_bios').addClass(data.maxbios.eval.id);
					$("#ind_per_music").html(data.maxmusic.eval.label);
					$('#ind_per_music').addClass(data.maxmusic.eval.id);
				});
		
		$("#container10").hide();
		$.ajax({type: "GET",  url: getIndividualReportUsage, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			logs = [{name: "MAXREADING", y: data.maxreading,drilldown: "MAXREADING"},
			        {name: "MAXPHONICS", y: data.maxphonics,drilldown: "MAXPHONICS"},
			        {name: "MAXWORDS", y: data.maxwords,drilldown: "MAXWORDS"},
			        {name: "MAXPLACES", y: data.maxplaces,drilldown: "MAXPLACES"},
			        {name: "MAXBIOS", y: data.maxbios,drilldown: "MAXBIOS"},
			        {name: "MAXMUSIC", y: data.maxmusic,drilldown: "MAXMUSIC"}]
						
			// Create the chart
			$('#container10').highcharts({
			chart: {
			type: 'column',
			backgroundColor: '#f2f2f2'

			},

			colors: ['#47c1c8', '#1488c9', '#9b5bb8', '#eac84c', '#25a89a', 
			'#ef655f', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'] ,
			xAxis: {
			type: 'category'
			},

			legend: {
			enabled: false,
			floating:false
			},
			credits: {
			enabled: false
			},
			tooltip: {
				headerFormat: '<b>{point.key}</b><br />',
				pointFormat: '{point.y} %'
			},
			plotOptions: {
			series: {

			borderWidth: 0,
			dataLabels: {
					enabled: true,
					format: '{point.y:.1f}%',
						backgroundColor: '#f84f4f',
					borderRadius:'50%'  
				}
			}
			},


			series: [{

				colorByPoint: true,
				data: logs
				}],
			drilldown: {
				series: []
			}

			});
			$("#container10").show();
		});
		
		$.ajax({type: "GET",  url: getIndividualReportReading, data:to_send}).
		done(function(data){
			start_date = from_month +"/"+from_day+"/"+from_year;
			end_date = to_month +"/"+to_day+"/"+to_year;
			data = JSON.parse(data);
			$("#invidual_report_user_name").html(data.student.first_name +" "+ data.student.last_name);
			$("#invidual_report_user_username").html(data.student.username);
			$("#invidual_report_user_level").html(data.student.level.name);
			$("#invidual_report_user_type").html(data.student.type.name);
			$("#invidual_report_user_date").html(start_date+" - "+end_date);
			$("#invidual_report_user_pretest").html(data.student.pretest_score + " %");
			$("#invidual_report_user_last_login").html(data.student.last_login);
			
			$("#individual_maxreading").html("");
			$("#individual_book_avg").html("");
			$("#individual_reading_ptest").html("");
			$("#individual_reading_interim").html("");
			$("#individual_maxreading_hl_modals").html("");
			
			$("#container12").hide();
			$("#container13").hide();
			$("#container14").hide();
			$("#containerMaxVocab").hide();


            if(data.reading_ptest){
                if (Object.keys(data.reading_ptest).length > 0) {
                    $("#reading_ptest_head").show();
                     $("#individual_reading_ptest").html("<tr><td>"+data.reading_ptest.starting_level+"</td><td>"+data.reading_ptest.ending_level+"</td><td>"+data.reading_ptest.score+"</td><td>"+data.reading_ptest.created+"</td></tr>");
                } else {
                    $("#reading_ptest_head").hide();
                    $("#individual_reading_ptest").html("<tr><td colspan='3'>STUDENT HAS NO READING PRE-TEST</td></tr>");
                }
            } else {

                    $("#reading_ptest_head").hide();
                    $("#individual_reading_ptest").html("<tr><td colspan='3'>STUDENT HAS NO READING PRE-TEST</td></tr>");
	    }

            if(data.reading_interim){
                if (Object(data.reading_interim).length > 0) {
                    $("#reading_interim_head").show();
                    $("#individual_reading_interim").html("");
                    var obj = data.reading_interim;
                    for (var i = 0; i < obj.length; i++) {
                        $("#individual_reading_interim").append("<tr><td>"+obj[i].starting_level+"</td><td>"+obj[i].ending_level+"</td><td>"+obj[i].score+"</td><td>"+obj[i].created+"</td></tr>");
                    };

                } else {
                    $("#reading_interim_head").hide();
                    $("#individual_reading_interim").html("<tr><td colspan='3'>STUDENT HAS NO READING INTERIM-TESTS</td></tr>");
                }
            } else {
                    $("#reading_interim_head").hide();
                    $("#individual_reading_interim").html("<tr><td colspan='3'>STUDENT HAS NO READING INTERIM-TESTS</td></tr>");
	    }

		
			if(!(data.vocab.definitions.won == 0 && data.vocab.definitions.lost == 0)){
				$("#containerMaxVocab").show();
				var chart = new Highcharts.Chart({
					chart: {
					renderTo: 'containerMaxVocab',
					type:'pie',
					backgroundColor: '#f2f2f2'

					},
					title: {
						text: 'Definitions'
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
					name: 'Definitions',
					data: [
					['Lost',   data.vocab.definitions.lost],
					{
					name: 'Won',
					y: data.vocab.definitions.won,
					sliced: true,
					selected: true
					},


					]
					}]
					});
			}
			
			if(!(data.vocab.wordsearch.won == 0 && data.vocab.wordsearch.lost == 0)){
				$("#container14").show();
				var chart = new Highcharts.Chart({
					chart: {
					renderTo: 'container14',
					type:'pie',
					backgroundColor: '#f2f2f2'

					},
					title: {
						text: 'Wordsearch'
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
					name: 'Wordsearch',
					data: [
					['Lost',   data.vocab.wordsearch.lost],
					{
					name: 'Won',
					y: data.vocab.wordsearch.won,
					sliced: true,
					selected: true
					},


					]
					}]
					});
			}
			if(!(data.vocab.hangman.won == 0 && data.vocab.hangman.lost == 0)){
				$("#container13").show();
				var chart = new Highcharts.Chart({
					chart: {
					renderTo: 'container13',
					type:'pie',
					backgroundColor: '#f2f2f2'
					},
					title: {
						text: 'Hangman'
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
					name: 'Hangman',
					data: [
					['Lost',   data.vocab.hangman.lost],
					{
					name: 'Won',
					y: data.vocab.hangman.won,
					sliced: true,
					selected: true
					},


					]
					}]
					});
			}
			if(!(data.vocab.wiseguy.won == 0 && data.vocab.wiseguy.lost == 0)){
				$("#container12").show();
				var chart = new Highcharts.Chart({
					chart: {
					renderTo: 'container12',
					type:'pie',
					backgroundColor: '#f2f2f2'
					},
					title: {
					text: 'Wiseguy'
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
					name: 'Wiseguy',
					data: [
					['Lost',   data.vocab.wiseguy.lost],
					{
					name: 'Won',
					y: data.vocab.wiseguy.won,
					sliced: true,
					selected: true
					},


					]
					}]
					});

					 
			}
			preparePrint("#report_to_print");
			$('.content .indvidual-detail-left').css('display','block');
			/***
			levelk = data.level["level-k"]
			level1 = data.level["level-1"]
			level2 = data.level["level-2"]
			level3 = data.level["level-3"]
			level4 = data.level["level-4"]
			level5 = data.level["level-5"]
			level6 = data.level["level-6"]
			level7 = data.level["level-7"]
			level8 = data.level["level-8"]
			level9 = data.level["level-9"]
			level10 = data.level["level-10"]
			level11 = data.level["level-11"]
			level12 = data.level["level-12"]
			
			$('#container18').highcharts({
				chart: {
				renderTo: 'container18',

				backgroundColor: '#f2f2f2'

				},
				credits: {
					enabled: false
				},
				xAxis: {

					categories: ["Level K", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6",
					             "Level 7", "Level 8", "Level 9", "Level 10", "Level 11", "Level 12"]    

				},

				yAxis: {
					tickPositions: [0, 10, 20, 30,40,50,60,70,80,90, 100],
					ceiling: 100,
					type: 'linear',
					floor: 0,
					labels: {
		                format: '{value} %'
		            }
				},

				tooltip: {
					headerFormat: '<b>{point.key}</b><br />',
					pointFormat: '{point.y} %'
				},

				series: [{
					data: [levelk, level1, level2, level3, level4, level5, level6, level7, level8,
					       level9, level10, level11,level12],
				}]
				});
				
				***/
			
			$('#container11').highcharts({
				chart: {
				type: 'column',
				backgroundColor: '#f2f2f2'
				},
				colors: [ '#ee8984','#84b4ea'] ,
				title: {
				text: 'Stacked column chart'
				},
				xAxis: {
				categories: ['Main Idea', 'Detail', 'Inference', 'Compare', 'Vocabulary']
				},
				yAxis: {
				min: 0,
				max: 100,
				title: {
				text: 'Total fruit consumption'
				},
				stackLabels: {
				enabled: true,
				style: {
				fontWeight: 'bold',
				color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				}
				}
				},
				legend: {
				align: 'right',
				x: -30,
				verticalAlign: 'top',
				y: 25,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
				},
				credits: {
				enabled: false
				},
				plotOptions: {
				column: {
				stacking: 'normal',
				dataLabels: {
				enabled: true,
				color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
				style: {
				textShadow: '0 0 3px black'
				}
				}
				}
				},
				series: [
				{
				name: 'Incorrect',
				data: [data.comprehension.main_idea.incorrect, data.comprehension.detail.incorrect,
				       data.comprehension.inference.incorrect ,data.comprehension.compare.incorrect,
				       data.comprehension.vacabulary.incorrect]
				},{
				name: 'Correct',
				data: [data.comprehension.main_idea.correct, data.comprehension.detail.correct,
				       data.comprehension.inference.correct ,data.comprehension.compare.correct,
				       data.comprehension.vacabulary.correct]
				} ]
				});
			
			var books = {};
			var books_name = {};

			if(data.scores.length < 1) {$("#maxread-indivdual").hide();}

			$.each( data.scores, function( key, val ) {
				
				avg_score = val.avg;
				//Iterate and aggregate by Book
				if (!(val.exercise.book.pk in books )){
					books[val.exercise.book.pk] = [];
					books_name[val.exercise.book.pk] = {"name": val.exercise.book.title, "level":val.exercise.book.level.name};
						
		
				}
				
				books[val.exercise.book.pk].push(avg_score)

				
				tr = '<tr><td width="10%">'+ val.exercise.book.level.name+'</td>'+
                      '<td width="12%">'+ val.exercise.book.title+'</td>'+
                      '<td width="14%">'+val.exercise.title +'</td>'+
                      '<td width="8%" class="no-highlighting">'+ val.hl_score+'</td>'+
                      '<td width="10%">'+val.quiz_score +'</td>'+
                      '<td width="33%">';
			console.log("hl score: "+val.hl_score);
                 if (val.hl_text!= undefined && val.hl_text !="" && val.hl_text !=null){    
                      a_highlight = '<a href="#" data-toggle="modal" data-target="#HL_'+val.exercise.pk+'" >Highlighting </a> ';
                 }else{
                     a_highlight = '<a href="#" id="not_clickable">Highlighting </a> ';

                 }
				tr = tr + a_highlight;
				 if (val.outline!= undefined && val.outline.outline !=""){
	            	 a_outline = '<a href="#" data-toggle="modal" data-target="#OUT_'+val.exercise.pk+'"> Outline </a> ';
	             }else{
	            	 a_outline = '<a href="#" id="not_clickable"> Outline </a> ';
	            	 
	             }
	             tr = tr + a_outline; 
	             
				if (val.summary!= undefined && val.summary.summary !=""){
					a_summary = '<a href="#" data-toggle="modal" data-target="#SUM_'+val.exercise.pk+'">Summary </a></td>';
					
				}else{
					a_summary = '<a href="#" id="not_clickable"> Summary </a></td>';
				}
				tr = tr + a_summary;     
	            
                      
                 end_tr ='<td width="12%">'+val.created +'</td></tr>';
                 tr = tr +  end_tr
                      
				modal = '<div class="modal fade" id="HL_'+val.exercise.pk+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                '<div class="modal-activity-hl"><div class="modal-content-activity">'+
                '<div class="modal-body">'+val.hl_text+'</div>'+
                '<div class="modal-footer"><button type="button" class="close-btn" data-dismiss="modal">Close</button></div>'+
                '</div></div></div>';
				
				$("#individual_maxreading").append(tr);
				$("#individual_maxreading_hl_modals").append(modal);
				if (val.summary!= undefined && val.summary.summary !=""){
					modal = '<div class="modal fade" id="SUM_'+val.exercise.pk+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	                '<div class="modal-activity"><div class="modal-content-activity">'+
	                '<div class="modal-body">'+val.summary.summary+'</div>'+
	                '<div class="modal-footer"><button type="button" class="close-btn" data-dismiss="modal">Close</button></div>'+
	                '</div></div></div>';
					$("#individual_maxreading_hl_modals").append(modal);
				}
				
				if (val.outline!= undefined && val.outline.outline !=""){
					modal = '<div class="modal fade" id="OUT_'+val.exercise.pk+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
	                '<div class="modal-activity"><div class="modal-content-activity">'+
	                '<div class="modal-body">'+val.outline.outline+'</div>'+
	                '<div class="modal-footer"><button type="button" class="close-btn" data-dismiss="modal">Close</button></div>'+
	                '</div></div></div>';
					$("#individual_maxreading_hl_modals").append(modal);
				}

				
		    	});
			

			for (var key in books) {
				scores = books[key];
				sum_scores = 0;
				var scores_length = scores.length;
				for (var i = 0; i < scores_length; i++) {
					sum_scores = sum_scores +scores[i];
				}
				avg_score = sum_scores/scores_length;
				avg_score = Math.round( avg_score * 10 ) / 10;
				
				tr_book = '<tr><td width="33%">'+books_name[key].name+'</td>'+
	            '<td width="33%">'+books_name[key].level+'</td>';
		
				if(avg_score ==100){
					tr_book = tr_book + '<td class="full-score" width="33%">'+avg_score+'%</td></tr>';
				}else{
					tr_book = tr_book + '<td width="33%">'+avg_score+'%</td></tr>';
				}
			            
				$("#individual_book_avg").append(tr_book);
			}
			
			
			
			
			
			$('.content #indvidual-detail-message').css('display','none');
			
			
			
		});
		
		
	});
	
	
	$("#maxplaces_ind").click(function(){
		start_date = localStorage.getItem("individual_report_start_date");
		end_date = localStorage.getItem("individual_report_end_date");
		user_pk = localStorage.getItem("individual_report_student_id");
		
		to_send={start_date:start_date, end_date:end_date, student_id:user_pk}
		
		$.ajax({type: "GET",  url: getIndividualReportPlaces, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			$('#maxplaces_individual_list').html("");
			$.each( data.places.places, function( key, val ) {
				tr = '<tr>'+
					 '<td width="33%">'+val.name+'</td>'+
                     '<td width="33%">'+val.score+'</td>'+
                     '<td width="33%">'+val.finished+'</td>'+
                  	 '</tr>';
				$("#maxplaces_individual_list").append(tr);
				
			});
			tr = '<tr class="average">'+
			 '<td width="33%">AVERAGE</td>'+
            '<td width="33%">'+data.places.avg_score+'</td>'+
            '<td width="33%">-</td>'+
         	 '</tr>';
			$("#maxplaces_individual_list").append(tr);
			
		});
		
	});
	
	$("#maxbios_ind").click(function(){
		start_date = localStorage.getItem("individual_report_start_date");
		end_date = localStorage.getItem("individual_report_end_date");
		user_pk = localStorage.getItem("individual_report_student_id");
		
		to_send={start_date:start_date, end_date:end_date, student_id:user_pk}
		
		$.ajax({type: "GET",  url: getIndividualReportBios, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			console.log(data);
			$('#maxbios_individual_list').html("");
			$.each( data.bios.bios, function( key, val ) {
				tr = '<tr>'+
					 '<td width="33%">'+val.name+'</td>'+
                     '<td width="33%">'+val.score+'</td>'+
                     '<td width="33%">'+val.finished+'</td>'+
                  	 '</tr>';
				$("#maxbios_individual_list").append(tr);
				
			});
			tr = '<tr class="average">'+
			 '<td width="33%">AVERAGE</td>'+
            '<td width="33%">'+data.bios.avg_score+'</td>'+
            '<td width="33%">-</td>'+
         	 '</tr>';
			$("#maxbios_individual_list").append(tr);
			
		});
		
	});
	
	$("#maxmusic_ind").click(function(){
		start_date = localStorage.getItem("individual_report_start_date");
		end_date = localStorage.getItem("individual_report_end_date");
		user_pk = localStorage.getItem("individual_report_student_id");
		
		to_send={start_date:start_date, end_date:end_date, student_id:user_pk}
		
		$.ajax({type: "GET",  url: getIndividualReportMusic, data:to_send}).
		done(function(data){
			data = JSON.parse(data);
			console.log(data);
			
			$("#maxmusic_individual_list").html("");
			show_music_avg = false;
			
			for (var key in data.music.scores) {
				show_music_avg = true;
				tr = '<tr>'+
				 '<td width="25%">'+key+'</td>'+
                '<td width="25%">'+data.music.scores[key].identify+'</td>'+
                '<td width="25%">'+data.music.scores[key].filler+'</td>'+
                '<td width="25%">'+data.music.scores[key].piano+'</td>'+
             	 '</tr>';
			$("#maxmusic_individual_list").append(tr);
			}
			if(show_music_avg){
				tr = '<tr class="average">'+
				 	   '<td width="25%">AVERAGE</td>'+
			           '<td width="25%">'+data.music.avg.identify+'</td>'+
			           '<td width="25%">'+data.music.avg.filler+'</td>'+
			           '<td width="25%">'+data.music.avg.piano+'</td>'+
	        	 '</tr>';
				$("#maxmusic_individual_list").append(tr);
			}else{
				tr = '<tr class="average">'+
				 '<td width="25%">NO RESULTS</td>'+
	        	 '</tr>';
				$("#maxmusic_individual_list").append(tr);
			}
			
			
		});
		
	});
	
	
	
	
});
