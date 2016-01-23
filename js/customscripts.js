$( document ).ready(function() {

$(".content .nav-tabs li").click(function(){
$('.welcome-notice').css('display','none');
});
$(".user-tab-title").click(function(){
$('.content ul.print-button').css('display','none');
})



$('.content .allstudent-detail .student-report').click(function(){
$('.allstudent-detail').css('display','none');
$('.content .complete-report ').css('display','block');
});
$(".content .user-tab-right .all-user-detail table tr td .user-report").click(function(){
$('.alluser-tab-detail').removeClass('active');

$('#allusers').removeClass('active');
$('#users').removeClass('active');
$('.user-tab-title').removeClass('active');	
$('.print-button').css('display','none');
$('.reports-tab-title').addClass('active');
$('#reports').addClass('active');
$('.individual-title').addClass('active');
$('#individual').addClass('active');
$('.individual-tab-detail').css('display','none');
$('.overallperformance').removeClass('active');
$('#individualgenralperformance').removeClass('active');
$('.overalldetail').addClass('active');
$('#individualdetailscore').addClass('active');
 });

$(".content  .create-class-detail .all-member-detail .search-field  button").click(function(){


$('.content  .create-class-detail .all-member-detail .choose-member').show('slow');
});






$(" .individual-title").click(function(){
$('.content ul.print-button').css('display','none');
});



$(".alluser-tab-detail").click(function(){
$('.edit-user-outer').css('display','none');
$('.edit-teacher-outer').css('display','none');
$('.all-user-outer').css('display','block');
});

$(".createuser-tab-detail").click(function(){
$('.edit-user-outer').css('display','block');
 });
 $(".mystudent-tab-title").click(function(){
$('.allstudent-detail').css('display','block');
$('.enter-session-outer').css('display','none');
$('.new-session-outer').css('display','none');
$('.complete-report').css('display','none');
 });

 
$(function(){
$('.average-class-detail .average-class-table').slimScroll({
height: '450px'
});
$('.content .create-class-detail .all-member-detail .modify-member').slimScroll({
height: '300px',
});


$('.user-tab-right .user-detail-table').slimScroll({
height: '530px'
});
$('.allstudent-detail .allstudent-table').slimScroll({
height: '530px'
});

$('.content .reports-detail .average-class-detail .average-class-top').slimScroll({
height: '500px' 
});

$('.content .individual-report-per-program-table').slimScroll({
height: '400px' 
});
$('.content .constant-table-detail').slimScroll({
height: '520px' 
});




}); 
$(function () {

Highcharts.data({
csv: document.getElementById('tsv').innerHTML,

itemDelimiter: '\t',
parsed: function (columns) {

var brands = {},
brandsData = [],
versions = {},
drilldownSeries = [];

// Parse percentage strings
columns[1] = $.map(columns[1], function (value) {
if (value.indexOf('%') === value.length - 1) {
value = parseFloat(value);
}
return value;
});

$.each(columns[0], function (i, name) {
var brand,
version;

if (i > 0) {

// Remove special edition notes
name = name.split(' -')[0];

// Split into brand and version
version = name.match(/([0-9]+[\.0-9x]*)/);
if (version) {
version = version[0];
}
brand = name.replace(version, '');

// Create the main data
if (!brands[brand]) {
brands[brand] = columns[1][i];
} else {
brands[brand] += columns[1][i];
}

// Create the version data
if (version !== null) {
if (!versions[brand]) {
	versions[brand] = [];
}
versions[brand].push(['v' + version, columns[1][i]]);
}
}

});

$.each(brands, function (name, y) {
brandsData.push({
name: name,
y: y,
drilldown: versions[name] ? name : null
});
});






}
});
});



 
$(function () {
$('#container6').highcharts({
chart: {
type: 'column',
backgroundColor: '#f2f2f2'
},
colors: [ '#ee8984','#84b4ea'] ,
title: {
text: 'Stacked column chart'
},
xAxis: {
categories: ['Syllabication', 'Questions', 'Complete Words', 'Complete Sentences' ]
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
name: 'Un Correct',
data: [20, 30, 80, 40 ]
},{
name: 'Correct',
data: [80, 70, 20 , 60  ]
} ]
});

}); 
});



function preparePrint(selector, removeStyle){
	$(".myDivToPrint").removeClass("myDivToPrint");
	$(selector).addClass("myDivToPrint");
	$('.content .print-button ').css('display','block');
}

$(document).ready(function() {
$("#session_date").datepicker({
showOn: 'button',
buttonText: '',
buttonImageOnly: true,
buttonImage: 'images/callender-icon.png',
dateFormat: 'dd/mm/yy',
constrainInput: true
});

$(".ui-datepicker-trigger").mouseover(function() {
$(this).css('cursor', 'pointer');
});
$('input').lc_switch();

// triggered each time a field changes status
$('body').delegate('.lcs_check', 'lcs-statuschange', function() {
var status = ($(this).is(':checked')) ? 'checked' : 'unchecked';
console.log('field changed status: '+ status );
});





$( ".content .top-tabs-headings li.genralclass" ).click(function() {

$('.lcs_switch').removeClass('lcs_on');
$('.lcs_switch').addClass('lcs_off');


});


$( ".content .top-tabs-headings li.detailclass" ).click(function() {

$('.lcs_switch').addClass('lcs_on');
$('.lcs_switch').removeClass('lcs_off');


});



$( ".lcs_wrap" ).click(function() {
	if ($('.lcs_switch').hasClass('lcs_off')) {
	$('.content .top-tabs-headings li.genralclass').removeClass('active');
	$('.content .top-tabs-headings li.detailclass').addClass('active');

	$('#genralperformance').removeClass('active');
	$('#detailscore').addClass('active');


	}
	else {

	$('.content .top-tabs-headings li.detailclass').removeClass('active');
	$('.content .top-tabs-headings li.genralclass').addClass('active');
	$('#detailscore').removeClass('active');
	$('#genralperformance').addClass('active');

	}
	});


$( ".indvidual-detail-left .lcs_wrap" ).click(function() {
if ($('.lcs_switch').hasClass('lcs_off')) {
	console.log("Entra lcs_switch");
	$('.content .top-tabs-headings li.overallperformance').removeClass('active');
	$('.content .top-tabs-headings li.overalldetail').addClass('active');
	$('#individualgenralperformance').removeClass('active');
	$('#individualdetailscore').addClass('active');


}
else {
$('.content .top-tabs-headings li.overalldetail').removeClass('active');
$('.content .top-tabs-headings li.overallperformance').addClass('active');
$('#individualgenralperformance').addClass('active');
$('#individualdetailscore').removeClass('active');

}


});
$( ".content .top-tabs-headings li.overallperformance" ).click(function() {

$('.lcs_switch').removeClass('lcs_on');
$('.lcs_switch').addClass('lcs_off');


});


$( ".content .top-tabs-headings li.overalldetail" ).click(function() {

$('.lcs_switch').addClass('lcs_on');
$('.lcs_switch').removeClass('lcs_off');


});

});
$('.content .reports-detail .average-class-detail .average-class-top table tbody td.student-name') .click(function() {
    $('.content .tabs-inner li').removeClass('active');
	$('#class').removeClass('active');
   $('.content .tabs-inner li.individual-title').addClass('active');
   $('#individual').addClass('active');
   $('.individual-tab-detail').css('display','none');
   $('.indvidual-detail-left').css('display','block');
});
 $('.content .reports-detail .average-class-detail .average-class-top table tbody td.see-individual') .click(function() {
    $('.content .tabs-inner li').removeClass('active');
	$('#class').removeClass('active');
   $('.content .tabs-inner li.individual-title').addClass('active');
   $('#individual').addClass('active');
   $('.individual-tab-detail').css('display','none');
   $('.indvidual-detail-left').css('display','block');
   $('.overallperformance').removeClass('active');
   $('.overalldetail').addClass('active');
   $('#individualgenralperformance').removeClass('active');
   $('#individualdetailscore').addClass('active');
   $('.max-read-individual').removeClass('active');
   $('.max-phonics').addClass('active');
   
    $('#maxread-indivdual').removeClass('active');
   $('#maxphonics-indivdual').addClass('active');
  

 });
 