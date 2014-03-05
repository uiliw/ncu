
var startDate;
var exitPageStatus;

function loadPage(){
	var result = LMSInitialize();
	
	LMSSetValue( "cmi.core.lesson_status", "completed" );

	exitPageStatus = false;
	startTimer();
	}



function startTimer(){
	startDate = new Date().getTime();
	}



function computeTime(){
	if ( startDate != 0 ){
		var currentDate = new Date().getTime();
		var elapsedSeconds = ( (currentDate - startDate) / 1000 );
		var formattedTime = convertTotalSeconds( elapsedSeconds );
		}
	else{
		formattedTime = "00:00:00.0";
		}

	LMSSetValue( "cmi.core.session_time", formattedTime );
	}



function doBack(){
	LMSSetValue( "cmi.core.exit", "suspend" );

	computeTime();
	exitPageStatus = true;
   
	var result;

	result = LMSCommit();
	   
	result = LMSFinish();
	}



function doContinue( status ){
	LMSSetValue( "cmi.core.exit", "" );

	var mode = LMSGetValue( "cmi.core.lesson_mode" );

	if ( mode != "review"  &&  mode != "browse" ){
		LMSSetValue( "cmi.core.lesson_status", status );
		}
 
	computeTime();
	exitPageStatus = true;
   
	var result;
	result = LMSCommit();

	result = LMSFinish();
	}



function doQuit( status ){
	if (exitPageStatus != true){
		computeTime();
		exitPageStatus = true;
   
		var result;

		/*if (LMSGetValue( "cmi.core.lesson_status" ) != "completed" && LMSGetValue( "cmi.core.lesson_status" ) != "passed"){
			result = LMSSetValue("cmi.core.lesson_status", status);
			}*/
   
		result = LMSCommit();

		result = LMSFinish();
		}
	}



function unloadPage( status ){
	if (exitPageStatus != true){
		doQuit( status );
		}
	}



function convertTotalSeconds(ts){
	var sec = (ts % 60);

	ts -= sec;
	var tmp = (ts % 3600);
	ts -= tmp;              

	sec = Math.round(sec*100)/100;
   
	var strSec = new String(sec);
	var strWholeSec = strSec;
	var strFractionSec = "";

	if (strSec.indexOf(".") != -1){
		strWholeSec =  strSec.substring(0, strSec.indexOf("."));
		strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
		}
   
	if (strWholeSec.length < 2){
		strWholeSec = "0" + strWholeSec;
		}
	strSec = strWholeSec;
   
	if (strFractionSec.length){
		strSec = strSec+ "." + strFractionSec;
		}


	if ((ts % 3600) != 0 ) var hour = 0;
	else var hour = (ts / 3600);

	if ( (tmp % 60) != 0 ) var min = 0;
	else var min = (tmp / 60);

	if ((new String(hour)).length < 2) hour = "0"+hour;

	if ((new String(min)).length < 2) min = "0"+min;

	var rtnVal = hour+":"+min+":"+strSec;

	return rtnVal;
	}