var checkCourse = document.querySelector("#check-course");

checkCourse.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	var flag = 1; //flag = 1时为查看已选课程
	getClassInfo(userID, flag);
});

function quitClass(userID, classID) {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Student/WithdrawClass";
	var ajaxStr = "classID=" + classID + "&peopleID=" + userID;
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(ajaxStr);

	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			switch(resultObj.status) {
				case "0":
					console.log('退选成功');
					getClassInfo(userID, 1);
					break;
				case "1":
					console.log('登陆异常');
					break;
				case "2":
					console.log('未选修当前课程');
					break;
				case "3":
					console.log('method错误');
					break;
			}
		}
	}
} 