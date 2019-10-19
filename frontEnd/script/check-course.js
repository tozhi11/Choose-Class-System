var checkCourse = document.querySelector("#check-course");

checkCourse.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	var flag = 1; //flag = 1时为查看已选课程
	getClassInfo(userID, flag);
});

function quitClass(userID, classID) {
	var url = "http://127.0.0.1:5000/api/Student/WithdrawClass";
	var ajaxStr = "classID=" + classID + "&peopleID=" + userID;
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} 
	else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	console.log(ajaxStr)
	xhr.send(ajaxStr);

	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			switch(resultObj.status) {
				case "0":
					getClassInfo(userID, 1);
					break;
				case "1":
					break;
				case "2": 
					break;
				case "3":
					break;
			}
		}
	}
} 