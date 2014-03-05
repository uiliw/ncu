
var _Debug = false;  
                     
var _NoError = 0;
var _GeneralException = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;

var apiHandle = null;
var API = null;
var findAPITries = 0;



function LMSInitialize(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
		return "false";
		}

	var result = api.LMSInitialize("");

	if (result.toString() != "true"){
		var err = ErrorHandler();
		}

	return result.toString();
	}



function LMSFinish(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
		return "false";
		}
	else{
		var result = api.LMSFinish("");
		if (result.toString() != "true"){
			var err = ErrorHandler();
			}
		}

	return result.toString();
	}



function LMSGetValue(name){
	var api = getAPIHandle();

	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
		return "";
		}
	else{
		var value = api.LMSGetValue(name);
		var errCode = api.LMSGetLastError().toString();
		if (errCode != _NoError){
			var errDescription = api.LMSGetErrorString(errCode);
			alert("LMSGetValue("+name+") failed. \n"+ errDescription);
			return "";
			}
		else{
			return value.toString();
			}
		}
	}



function LMSSetValue(name, value){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
		return;
		}
	else{
		var result = api.LMSSetValue(name, value);
		if (result.toString() != "true"){
			var err = ErrorHandler();
			}
		}

	return;
	}



function LMSCommit(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
		return "false";
		}
	else{
		var result = api.LMSCommit("");
		if (result != "true"){
			var err = ErrorHandler();
			}
		}
	
	exitPageStatus = true;
	return result.toString();
	}



function LMSGetLastError(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
		return _GeneralError;
		}

	return api.LMSGetLastError().toString();
	}



function LMSGetErrorString(errorCode){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
		}

	return api.LMSGetErrorString(errorCode).toString();
	}



function LMSGetDiagnostic(errorCode){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
		}

	return api.LMSGetDiagnostic(errorCode).toString();
	}



function LMSIsInitialized(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
		return false;
		}
	else{
		var value = api.LMSGetValue("cmi.core.student_name");
		var errCode = api.LMSGetLastError().toString();
		if (errCode == _NotInitialized){
			return false;
			}
		else{
			return true;
			}
		}
	}



function ErrorHandler(){
	var api = getAPIHandle();
	if (api == null){
		alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
		return;
		}

	var errCode = api.LMSGetLastError().toString();
	if (errCode != _NoError){
		var errDescription = api.LMSGetErrorString(errCode);

		if (_Debug == true){
			errDescription += "\n";
			errDescription += api.LMSGetDiagnostic(null);
			}

		//alert("Atenção! O Conteúdo desta página não foi carregado completamente.");
		}

	return errCode;
	}



function getAPIHandle(){
	if (apiHandle == null){
		apiHandle = getAPI();
		}

	return apiHandle;
	}



function findAPI(win){
	while ((win.API == null) && (win.parent != null) && (win.parent != win)){
		findAPITries++;
		if (findAPITries > 7){
			alert("Error finding API -- too deeply nested.");
			return null;
			}
      
		win = win.parent;

		}
	return win.API;
	}



function getAPI(){
	var theAPI = findAPI(window);
	if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")){
		theAPI = findAPI(window.opener);
		}
	if (theAPI == null){
		alert("Unable to find an API adapter");
		}
	return theAPI
	}