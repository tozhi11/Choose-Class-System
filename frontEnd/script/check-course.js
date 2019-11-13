
//查看已选课程
var checkCourse = document.querySelector("#check-course");
checkCourse.addEventListener("click", function(e) {
	var e = e || window.event;
	var flag = 1; //flag = 1时为查看已选课程
	getClassInfo(userID, flag);
	console.log(userID);
});


/**
 * 学生退选课程
 * @param {String} userID | 用户id
 * @param {String} classID | 课程id
 */
function quitClass(userID, classID) {
	var url = "http://47.107.246.0:8083/api/Student/WithdrawClass";
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