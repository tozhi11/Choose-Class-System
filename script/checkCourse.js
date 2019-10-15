function checkCourse(userID) {
	getCheckedCourse(userID);
}

function getCheckedCourse(userID) {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Student/ClassStatus";
	var ajaxStr = "peopleID=" + userID; 
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-application");
	xhr.send(ajaxStr);

	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			switch(resultObj.status) {
				case "0":
				
			}
		}
	}
}