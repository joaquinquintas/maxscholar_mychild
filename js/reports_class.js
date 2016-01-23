
$(document).ready(function() {
	$('.lcs_switch').removeClass('lcs_on');
	$('.lcs_switch').addClass('lcs_off');
	
	var from_date = new Date();
	from_date.setDate(from_date.getDate()-7);
	var to_date = new Date();

	
	$("#class_report_from_day").val(from_date.getUTCDate());
	$("#class_report_from_month").val(from_date.getUTCMonth() + 1);
	$("#class_report_from_year").val(from_date.getUTCFullYear());
	
	$("#class_report_to_day").val(to_date.getUTCDate());
	$("#class_report_to_month").val(to_date.getUTCMonth() + 1);
	$("#class_report_to_year").val(to_date.getUTCFullYear());
	
	$("#class_report").click(function(e){
		$( "#class_password" ).select();
		$('.reports-detail').css('display','none');
		$( "#error_class_password" ).html("");
		$("#report_class_info_text").html("Loading ...");
		$('.class-tab-detail').css('display','none');
		$("#report_class_selector").html("");
		$("#individual .individual-tab-detail").css("display", "none");
		school_pk = localStorage.getItem("school_pk");
		toSend = {school_id:school_pk};
		
		$.ajax({type: "GET",  url: allClasses, data:toSend}).
        fail(function(resp){
            console.log('bad credentials.')
        }).
        done(function(data){
        	$.each( data, function( key, val ) {
    	    	var o = new Option(val.name , val.pk);
    			$("#report_class_selector").append(o);
    	    	});
        	
        	$("#report_class_info_text").html("");
        	$('.class-tab-detail').css('display','block');
        	
        });
		
	});
	
	$('#class_password').keypress(function (e) {
		 var key = e.which;
		 
		 if(key == 13)  // the enter key code
		  {
			 $('.class-tab-detail button').trigger( "click" );
		    return false;  
		  }
		});  
	
	
	$("#class_score_report_table").on('click', '.maxphonic_class_to_ind', function(e){
		e.preventDefault();
		$(".class-inner-tab-title").removeClass("active");
		$(".individual-title").addClass("active");
		$('.class-tab-detail').css('display','none');
    	$('.reports-detail').css('display','none');
    	$('.content #class-detail-message').css('display','block');
    	
    	//this.dataset.userReport;
		//$("#report_individual_selector").val("22707");
		localStorage.setItem("individual_report_student_id", this.dataset.userReport);
		
		start_year = localStorage.getItem("class_report_start_year");
		start_month = localStorage.getItem("class_report_start_month");
		start_day = localStorage.getItem("class_report_start_day");
		end_year = localStorage.getItem("class_report_end_year");
		end_month = localStorage.getItem("class_report_end_month");
		end_day = localStorage.getItem("class_report_end_day");
		
		$("#invidiual_report_from_day").val(start_day);
		$("#invidiual_report_from_month").val(start_month);
		$("#invidiual_report_from_year").val(start_year);
		
		$("#invidiual_report_to_day").val(end_day);
		$("#invidiual_report_to_month").val(end_month);
		$("#invidiual_report_to_year").val(end_year);
		$( "#generate_individual_report" ).trigger( "click" );
		
		$("#class").removeClass("active");
		$(".individual-tab-detail").css('display','none');
		$("#individual").addClass("active");
		$( "#maxphonics_ind" ).trigger( "click" );
		
		
	})
	
	
	$("#class_score_report_table").on('click', '.report_class_user_list', function(e){
		e.preventDefault();
		$(".class-inner-tab-title").removeClass("active");
		$(".individual-title").addClass("active");
		$('.class-tab-detail').css('display','none');
    	$('.reports-detail').css('display','none');
    	$('.content #class-detail-message').css('display','block');
    	
    	//this.dataset.userReport;
		//$("#report_individual_selector").val("22707");
		localStorage.setItem("individual_report_student_id", this.dataset.userReport);
		
		start_year = localStorage.getItem("class_report_start_year");
		start_month = localStorage.getItem("class_report_start_month");
		start_day = localStorage.getItem("class_report_start_day");
		end_year = localStorage.getItem("class_report_end_year");
		end_month = localStorage.getItem("class_report_end_month");
		end_day = localStorage.getItem("class_report_end_day");
		
		$("#invidiual_report_from_day").val(start_day);
		$("#invidiual_report_from_month").val(start_month);
		$("#invidiual_report_from_year").val(start_year);
		
		$("#invidiual_report_to_day").val(end_day);
		$("#invidiual_report_to_month").val(end_month);
		$("#invidiual_report_to_year").val(end_year);
		$( "#generate_individual_report" ).trigger( "click" );
		
		$("#class").removeClass("active");
		$(".individual-tab-detail").css('display','none');
		$("#individual").addClass("active");
		
	})
	
	$(".class-tab-detail button").click(function(e){

		class_pk = $("#report_class_selector").val();
		
		class_password = $("#class_password").val();
		
		$.ajax({type: "POST",  url: checkClassPassword, data: { password: class_password, pk:class_pk } }).
        fail(function(resp){
        	console.log(resp)
            console.log('Bad password')
            console.log(resp.responseJSON.non_field_errors[0]);
            $( "#error_class_password" ).html(resp.responseJSON.non_field_errors[0]);
            $( "#class_password" ).select();
        })
        .done(function(resp){
        	$('.class-tab-detail').css('display','none');
        	$('.reports-detail').css('display','none');
        	$('.content #class-detail-message').css('display','block');
    		
    		from_day = $("#class_report_from_day").val();
    		from_month = $("#class_report_from_month").val();
    		from_year = $("#class_report_from_year").val();
    		
    		to_day = $("#class_report_to_day").val();
    		to_month = $("#class_report_to_month").val();
    		to_year = $("#class_report_to_year").val();
    		
    		
    		
    		$("#report_class_name").html("");
    		$("#report_teacher_name").html("");
    		$("#report_class_email").html("");
    		$("#report_class_dates").html("");
    		$("#report_class_online").html("");

    		
    		
			start_date = from_month +"/"+from_day+"/"+from_year;
			end_date = to_month +"/"+to_day+"/"+to_year;
			$("#report_class_name").html(resp.name);
			var teachers = []
				$.each( resp.teachers, function( key, val ) {
					teachers.push( val.first_name + " " + val.last_name)
	    	    	});
	        	
			$("#report_teacher_name").html(teachers.join());
			$("#report_class_email").html(resp.email.join( ", " ));
			$("#report_class_dates").html(start_date+" - "+end_date);

			start_date = from_year+"-"+from_month+"-"+from_day;
    		end_date = to_year+"-"+to_month+"-"+to_day;
    		
    		localStorage.setItem("class_report_start_date", start_date);
    		localStorage.setItem("class_report_start_year", from_year);
    		localStorage.setItem("class_report_start_month", from_month);
    		localStorage.setItem("class_report_start_day", from_day);
    		localStorage.setItem("class_report_end_date", end_date);
    		localStorage.setItem("class_report_end_year", to_year);
    		localStorage.setItem("class_report_end_month", to_month);
    		localStorage.setItem("class_report_end_day", to_day);
    		
    		localStorage.setItem("class_id_report", class_pk);
    		
    		
    		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
    		
    		reading_class_count = 0;
    		words_class_count = 0;
    		places_class_count = 0;
    		bios_class_count = 0;
    		music_class_count = 0;
    		
    		$.ajax({type: "GET", url: getClassScoreAvg, data:to_send}).
    		done(function(data){
    			$("#class_score_report_table").html("");
    			data = JSON.parse(data);
    			$("#report_class_online").html(data.online);

    			class_time_sum = 0;
    			class_maxreading_sum = 0;
    			class_maxwords_sum = 0;
    			class_maxplaces_sum = 0;
    			class_maxbios_sum = 0;
    			class_maxmusic_sum = 0;
    			
    			insa_count = 0;
    			sa_count = 0;
    			ex_count = 0;
    			
    			
    			
    			$.each( data.reports, function( key, val ) {
    				score_sum = 0;
        			count_sum = 0;
        			
    				if (val.maxreading.value != "-"){
    					score_sum = score_sum + val.maxreading.value;
    					count_sum = count_sum + 1;
    					reading_class_count = reading_class_count + 1;
    					class_maxreading_sum = class_maxreading_sum + val.maxreading.value;
    				}
    				if (val.maxwords.value != "-"){
    					score_sum = score_sum + val.maxwords.value;
    					count_sum = count_sum + 1;
    					words_class_count = words_class_count + 1;
    					class_maxwords_sum = class_maxwords_sum + val.maxwords.value;
    				}
    				if (val.maxplaces.value != "-"){
    					score_sum = score_sum + val.maxplaces.value;
    					count_sum = count_sum + 1;
    					places_class_count  = places_class_count + 1;
    					class_maxplaces_sum = class_maxplaces_sum + val.maxplaces.value;
        				
    				}
    				if (val.maxbios.value != "-"){
    					score_sum = score_sum + val.maxbios.value;
    					count_sum = count_sum + 1;
    					bios_class_count = bios_class_count + 1;
    					class_maxbios_sum = class_maxbios_sum + val.maxbios.value;
    				}
    				if (val.maxmusic.value != "-"){
    					score_sum = score_sum + val.maxmusic.value;
    					count_sum = count_sum + 1;
    					music_class_count = music_class_count + 1;
        				class_maxmusic_sum = class_maxmusic_sum + val.maxmusic.value;

    				}
    				if (count_sum != 0){
    					score_avg = score_sum/count_sum;
    				}else{
    					score_avg = 0;
    				}
    				
    				per = performance(score_avg)
    				if (per.id == "satisfactory"){
    					sa_count = sa_count + 1;
    				}else {
    					if (per.id== "not-satifactory"){
    						insa_count = insa_count + 1;
    					}else{
    						ex_count = ex_count + 1;
    					}
    				}
    				class_time_sum = class_time_sum + val.time.value;
    				//class_maxreading_sum = class_maxreading_sum + val.maxreading.value;
    				//class_maxwords_sum = class_maxwords_sum + val.maxwords.value;
    				//class_maxplaces_sum = class_maxplaces_sum + val.maxplaces.value;
    				//class_maxbios_sum = class_maxbios_sum + val.maxbios.value;
    				//class_maxmusic_sum = class_maxmusic_sum + val.maxmusic.value;
    				
    				tr = '<tr>' +
                        '<td width="12%" class="cumulative-time student-name" style="background : none">'+
    						'<a class="report_class_user_list" data-user-report=' + val.student.pk +' href="#">'+val.student.name+'</a></td>'+
                        '<td width="11%">'+val.time.value+'</td>'+
                        '<td width="11%">'+val.maxreading.value+' </td>'+
                        '<td width="11%" class="cumulative-time see-individual"><a class="maxphonic_class_to_ind" data-user-report=' + val.student.pk +' href="#">See individual report</a></td>'+
                        '<td width="11%"> '+val.maxwords.value+'  </td>'+
                        '<td width="10%"> '+val.maxplaces.value+'  </td>'+
                        '<td width="10%"> '+val.maxbios.value+'  </td>'+
                        '<td width="10%"> '+val.maxmusic.value+'  </td>'+
                        '<td width="10%" class="'+per.id+'"><span>'+per.label+' </span></td>'+
                      '</tr>';
    				
    				$("#class_score_report_table").append(tr);
    				
    			});
    			
    			avg_time = class_time_sum/data.reports.length;
    			if(reading_class_count !=0){
    				avg_reading = class_maxreading_sum/reading_class_count;
    			}else{
    				avg_reading = 0;
    			}
    			if(words_class_count !=0){
    				avg_words = class_maxwords_sum/words_class_count;
    			}else{
    				avg_words =0;
    			}
    			if(places_class_count !=0){
    				avg_places = class_maxplaces_sum/places_class_count;
    			}else{
    				avg_places = 0
    			}
    			
    			if(bios_class_count != 0){
    				avg_bios = class_maxbios_sum/bios_class_count;
    			}else{
    				avg_bios = 0;
    			}
    			
    			if(music_class_count !=0){
    				avg_music = class_maxmusic_sum/music_class_count;
    			}else{
    				avg_music = 0;
    			}
    			
    			
    			sum_avg_score = avg_reading + avg_words + avg_places + avg_bios + avg_music;
    			class_avg_score = sum_avg_score/5;
    			per = performance(class_avg_score)
    			
    			tr_avg = '<tr class="average">' +
                	'<td width="12%" class="cumulative-time" style="background : none"><a href="#">Class Average</a></td>'+
	                '<td width="11%">'+avg_time.toFixed(1)+' </td>'+
	                '<td width="11%">'+avg_reading.toFixed(1)+' </td>'+
	                '<td width="11%" class="cumulative-time">-</td>'+
	                '<td width="11%"> '+avg_words.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_places.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_bios.toFixed(1)+' </td>'+
	                '<td width="10%"> '+avg_music.toFixed(1)+' </td>'+
	                '<td width="10%" class="'+per.id+'"><span>'+per.label+ '</span></td>'+
	              '</tr>';
    			
    			$("#class_score_report_table").append(tr_avg);
    			
    			total_eval = sa_count + insa_count + ex_count;
    			satisfactory_per = percentage(sa_count, total_eval);
    			insatisfactory_per = percentage(insa_count, total_eval);
    			excellent_per = percentage(ex_count, total_eval);
    			
    			$("#satis_per").html(satisfactory_per + "%");
    			$("#unsatis_per").html(insatisfactory_per + "%");
    			$("#excell_per").html(excellent_per + "%");
    			
    			var chart = new Highcharts.Chart({
    				chart: {
    				renderTo: 'container2',
    				type: 'pie',
    				backgroundColor: '#f2f2f2'
    				},
    				colors: [ '#eac84c', '#25a89a', 
    				'#ef655f', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'] ,
    				credits: {
    				enabled: false
    				},
    				plotOptions: {
    				pie: {

    				innerSize: '55%'
    				}
    				},
    				series: [{
    				data: [
    				['Satisfactory', parseFloat(satisfactory_per)],
    				['Excellent', parseFloat(excellent_per)],
    				['Unsatisfactory', parseFloat(insatisfactory_per)] 
    				]}]
    				},
    				// using 
    							 
    				function(chart) { // on complete

    				var xpos = '50%';
    				var ypos = '53%';
    				var circleradius = 102;

    				// Render the circle
    				chart.renderer.circle(xpos, ypos, circleradius).attr({
    				fill:'#f2f2f2'
    				}).add();


    				});
    			
    			$.ajax({type: "GET", url: getIndividualReportUsage, data:to_send}).
        		done(function(data){
        			data = JSON.parse(data);
        			logs = [{name: "MAXREADING", y: data.maxreading,drilldown: "MAXREADING"},
        			        {name: "MAXPHONICS", y: data.maxphonics,drilldown: "MAXPHONICS"},
        			        {name: "MAXWORDS", y: data.maxwords,drilldown: "MAXWORDS"},
        			        {name: "MAXPLACES", y: data.maxplaces,drilldown: "MAXPLACES"},
        			        {name: "MAXBIOS", y: data.maxbios,drilldown: "MAXBIOS"},
        			        {name: "MAXMUSIC", y: data.maxmusic,drilldown: "MAXMUSIC"}]
        			
        			// Create the chart
        			$('#container1').highcharts({
        			chart: {
        			fill:'#f00',	
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
        		});
    			
    			
    		});
			
			
			

			$('.class-tab-detail').css('display','none');
    		$('.reports-detail').css('display','block');
    		$('.content ul.print-button').css('display','block');
    		$('.content #class-detail-message').css('display','none');
    		
    		
    		$.ajax({type: "GET", url: getClassMaxreadingReport, data:to_send}).
    		done(function(data){
    			
    			$("#reading_class_report_table").html("");
    			data = JSON.parse(data);
    			
    			sum_time = 0;
    			sum_chapters_started = 0;
    			sum_chapters_completed = 0;
    			sum_summaries = 0;
    			sum_outlines = 0;
    			
    			$.each( data.reports, function( key, val ) {
    				sum_time = sum_time + val.time.value;
    				sum_chapters_started = sum_chapters_started +val.chapters_started.value;
    				sum_chapters_completed = sum_chapters_completed +val.chapters_completed.value;
    				sum_summaries = sum_summaries + val.summaries_written.value;
    				sum_outlines = sum_outlines +val.outlines_written.value;
    				
    				tr =  '<tr><td width="14.6%">'+val.student.name+'</td>'+
                          '<td width="9.8%">'+val.time.value+'</td>'+
                          '<td width="9.8%">'+val.start_level+'</td>'+
                          '<td width="9.8%">'+val.current_level+'</td>'+
                          '<td width="9.8%">'+val.chapters_started.value+'</td>'+
                          '<td width="9.8%">'+val.chapters_completed.value+'</td>'+
                          '<td width="9.8%">'+val.summaries_written.value+'</td>'+
                          '<td width="9.8%">'+val.outlines_written.value+'</td></tr>';
    				$("#reading_class_report_table").append(tr);
    			});
    			
    			tr_ = '<tr class="average">'+
                        '<td width="14.6%">Total</td>'+
                        '<td width="9.8%">'+sum_time+'</td>'+
                        '<td width="9.8%">---</td>'+
                        '<td width="9.8%">---</td>'+
                        '<td width="9.8%">'+sum_chapters_started+'</td>'+
                        '<td width="9.8%">'+sum_chapters_completed+'</td>'+
                        '<td width="9.8%">'+sum_summaries+'</td>'+
                        '<td width="9.8%">'+sum_outlines+'</td>'+
                      '</tr>';
    			
    			$("#reading_class_report_table").append(tr_);
    			
    			$(function () {
    				$('#container4').highcharts({
    				chart: {
    				type: 'column',
    				backgroundColor: '#f2f2f2'
    				},
    				colors: [ '#ee8984','#84b4ea'] ,
    				title: {
    				text: 'Stacked column chart'
    				},
    				xAxis: {
    				categories: ['Main Idea', 'Detail', 'Inference', 'Compare' ]
    				},
    				yAxis: {
    				min: 0,
    				max: 100,
    				title: {
    				text: ''
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
    				name: 'Inorrect',
    				data: [data.comprehension.main_idea.incorrect, 
    				       data.comprehension.detail.incorrect, 
    				       data.comprehension.inference.incorrect, 
    				       data.comprehension.compare.incorrect ]
    				},{
    				name: 'Correct',
    				data: [data.comprehension.main_idea.correct,
    				       data.comprehension.detail.correct, 
    				       data.comprehension.inference.correct , 
    				       data.comprehension.compare.correct   ]
    				} ]
    				});

    				}); 
    			
    			$(function () {
    				$('#container3').highcharts({
    				chart: {
    				type: 'column',
    				backgroundColor: '#f2f2f2'
    				},
    				colors: [ '#ee8984','#84b4ea'] ,
    				title: {
    				text: 'Stacked column chart'
    				},
    				xAxis: {
    				categories: ['Topic', 'Main Idea', 'Detail']
    				},
    				yAxis: {
    				min: 0,
    				max: 100,
    				title: {
    				text: ''
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
    				data: [data.highlighting.hl_topic_score.incorrect,
    				       data.highlighting.hl_idea_score.incorrect, 
    				       data.highlighting.hl_detail_score.incorrect,]
    				},{
    				name: 'Correct',
    				data: [data.highlighting.hl_topic_score.correct,
    				       data.highlighting.hl_idea_score.correct,
    				       data.highlighting.hl_detail_score.correct]
    				} ]
    				});

    				});
    			
    		});
        	
        });
		preparePrint("#report_to_print");
        
	});

	
	$("#class_place_report").click(function(e){
		e.preventDefault();
			
		start_date = localStorage.getItem("class_report_start_date");
		end_date = localStorage.getItem("class_report_end_date");
		class_pk = localStorage.getItem("class_id_report");
		
		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
		
		$.ajax({type: "GET", url: getClassMaxplacesReport, data:to_send}).
		done(function(data){
			
			$("#places_class_report").html("");
			data = JSON.parse(data);
			sum_time = 0;
			sum_score = 0;
			
			$.each( data.reports, function( key, val ) {
				sum_time = sum_time + val.time.value;
				sum_score = sum_score + val.score.value;
				
				tr = '<tr>' +
                '<td width="14.6%">'+ val.student.name +'</td>'+
                '<td width="42.7%"> '+ val.time.value+'</td>'+
                '<td width="42.7%">'+ val.score.value+' </td>'+
                '</tr>';
				$("#places_class_report").append(tr);
			});
			
			avg_time = sum_time/data.reports.length;
			avg_score = sum_score/data.reports.length;
			tr = '<tr class="average">' +
            '<td width="14.6%">Average</td>'+
            '<td width="42.7%"> '+ avg_time.toFixed(1) +'</td>'+
            '<td width="42.7%">'+ avg_score.toFixed(1) +' </td>'+
            '</tr>';
			
			$("#places_class_report").append(tr);
		});
		
		
	});
	$("#class_bio_report").click(function(e){
		e.preventDefault();
		
		start_date = localStorage.getItem("class_report_start_date");
		end_date = localStorage.getItem("class_report_end_date");
		class_pk = localStorage.getItem("class_id_report");
		
		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
		
		$.ajax({type: "GET", url: getClassMaxbiosReport, data:to_send}).
		done(function(data){
			
			$("#bios_class_report").html("");
			data = JSON.parse(data);
			sum_time = 0;
			sum_score = 0;
			
			$.each( data.reports, function( key, val ) {
				sum_time = sum_time + val.time.value;
				sum_score = sum_score + val.score.value;
				
				tr = '<tr>' +
                '<td width="14.6%">'+ val.student.name +'</td>'+
                '<td width="42.7%"> '+ val.time.value+'</td>'+
                '<td width="42.7%">'+ val.score.value+' </td>'+
                '</tr>';
				$("#bios_class_report").append(tr);
			});
			
			avg_time = sum_time/data.reports.length;
			avg_score = sum_score/data.reports.length;
			tr = '<tr class="average">' +
            '<td width="14.6%">Average</td>'+
            '<td width="42.7%"> '+ avg_time.toFixed(1) +'</td>'+
            '<td width="42.7%">'+ avg_score.toFixed(1) +' </td>'+
            '</tr>';
			
			$("#bios_class_report").append(tr);
		});
		
		
	});
	$("#class_music_report").click(function(e){
		e.preventDefault();
		
		start_date = localStorage.getItem("class_report_start_date");
		end_date = localStorage.getItem("class_report_end_date");
		class_pk = localStorage.getItem("class_id_report");
		
		to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
		
		$.ajax({type: "GET", url: getClassMaxmusicReport, data:to_send}).
		done(function(data){
			
			$("#music_class_report").html("");
			data = JSON.parse(data);
			sum_time = 0;
			sum_songs_played = 0;
			sum_identify_score = 0;
			sum_fillers_score = 0;
			sum_piano_score = 0;
			
			$.each( data.reports, function( key, val ) {
				sum_time = sum_time + val.time.value;
				sum_songs_played = sum_songs_played + val.songs_played.value;
				sum_identify_score = sum_identify_score + val.identify_score.value;
				sum_fillers_score = sum_fillers_score + val.fillers_score.value;
				sum_piano_score = sum_piano_score + val.piano_score.value;
				
				tr = '<tr>' +
                '<td width="14.6%">'+ val.student.name +'</td>'+
                '<td width="17%"> '+ val.songs_played.value+'</td>'+
                '<td width="17%">'+ val.identify_score.value+' </td>'+
                '<td width="17%">'+ val.fillers_score.value+' </td>'+
                '<td width="17%">'+ val.piano_score.value+' </td>'+
                '<td width="17%">'+ val.time.value+' </td>'+
                '</tr>';
				$("#music_class_report").append(tr);
			});
			
			avg_time = sum_time/data.reports.length;
			avg_songs_played = sum_songs_played/data.reports.length;
			avg_identify_score = sum_identify_score/data.reports.length;
			avg_fillers_score = sum_fillers_score/data.reports.length;
			avg_piano_score = sum_piano_score/data.reports.length;
			
			tr = '<tr class="average">' +
            '<td width="14.6%">Average</td>'+
            '<td width="17%"> '+ avg_songs_played.toFixed(1) +'</td>'+
            '<td width="17%">'+ avg_identify_score.toFixed(1) +' </td>'+
            '<td width="17%"> '+ avg_fillers_score.toFixed(1) +'</td>'+
            '<td width="17%">'+ avg_piano_score.toFixed(1) +' </td>'+
            '<td width="17%"> '+ avg_time.toFixed(1) +'</td>'+
            '</tr>';
			
			$("#music_class_report").append(tr);
		});
		
		
	});
	
function percentage(value, total){
	if (total != 0){
		return ((value * 100)/total).toFixed(0);
	}else{
		return 0;
	}
	
}
	
function performance(score){
	if (score <= 60){
		return {"id": "not-satifactory", "label":"Not Satisfactory"}
	}else{
		if (score>60 && score <=80){
			return {"id": "satisfactory", "label":"Satisfactory"}
		}else{
			return {"id": "excellent", "label":"Excellent"}
		}
	}
        
        
};

$("#class_phonics_report").click(function(e){
	e.preventDefault();
		
	start_date = localStorage.getItem("class_report_start_date");
	end_date = localStorage.getItem("class_report_end_date");
	class_pk = localStorage.getItem("class_id_report");
	
	to_send={start_date:start_date, end_date:end_date, class_id:class_pk};
	
	$.ajax({type: "GET", url: getClassMaxphonicsReport, data:to_send}).
	done(function(data){
		
		$("#phonics_class_report").html("");
		data = JSON.parse(data);
		sum_time = 0;
		sum_score = 0;

		
		$.each( data.reports, function( key, val ) {
			sum_time = sum_time + val.time.value;
			sum_score = sum_score + val.score.value;

			
			tr = '<tr>' +
            '<td width="14.6%">'+ val.student.name +'</td>'+
            '<td width="42.7%"> '+ val.time.value+'</td>'+
            '<td width="42.7%">'+ val.score.value+' </td>'+
            '</tr>';
			$("#phonics_class_report").append(tr);
		});
		
		total = data.reports.length;
		
		tr = '<tr class="average">' +
        '<td width="14.6%">Average</td>'+
        '<td width="42.7%"> '+ getAvg(sum_time, total) +'</td>'+
        '<td width="42.7%">'+ getAvg(sum_score, total) +' </td>'+
        '</tr>';
		
		$("#phonics_class_report").append(tr);
	});
	
	
	
});

function getAvg(sum, total){
return  (sum/total).toFixed(1);
}
});
