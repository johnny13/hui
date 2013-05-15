var TimeOfDay;

function jsonGetDate(){
  	var date = new Date;
	var hour = date.getHours();
	if(hour>8){
		TimeOfDay="day";
	} else {
		TimeOfDay="night";
	}
	
	timeColor();
}

var tCC = 0;
function timeColor(){
	var timeColor;
	if(TimeOfDay=="day"){
		if(tCC==0){
			tCC++;
			timeColor = "#1CB7FF";
		} else if(tCC==1){
			tCC++;
			timeColor = "#DBCE39";
		} else {
			timeColor = "#E0E0E0";
			tCC = 0;
		}
		
	} else {
		if(tCC==0){
			tCC++;
			timeColor = "#035D86";
		} else if(tCC==1){
			tCC++;
			timeColor = "#D48000";
		} else {
			timeColor = "#363636";
			tCC = 0;
		}
		
	}
	
	jQuery(".bg-color-time").animate({backgroundColor: timeColor},6000,function(){
		setTimeout("timeColor()",12000);
	});
	
}

jQuery(document).ready(function() { 
	jQuery('.antiscroll-wrap').antiscroll({
		autoHide: true
	});
	
	//Color Calendar depending on time of day.
	
	jsonGetDate();
	//setInterval("jsonGetDate()",100000);
});