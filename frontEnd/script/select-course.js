
//点击选课按钮
var selectCourse = document.querySelector("#select-course");
selectCourse.addEventListener("click", function(e) {
	var e = e || window.event;
	var flag = 0; // flag=0时表示查看全部课程内容
	getClassInfo(userID, flag);
});


/**
 * 学生选课
 * @param {String} cid | 学生用户id 
 */
function chooseClass(cid) {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/ChooseClass";
	var ajaxStr = "classID=" + cid + "&peopleID=" + userID;
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} 
	else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	console.log(ajaxStr);
	xhr.send(ajaxStr);

	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			switch(resultObj.status) {
				case "0" : 
					console.log("选课成功");
					document.querySelector(".select-course").style.display = "none";
					document.querySelector(".check-course").style.display = "block";
					document.querySelector("#select-course").classList.remove("li-active");
					document.querySelector("#check-course").classList.add("li-active");
					getClassInfo(userID, 1);
					break;
				case "1":
					console.log("登陆异常");
					break;
				case "2":
					console.log("与已选课程冲突");
					break;
				case "3":
					console.log("超过选课上限");
					break;
				case "4":
					console.log("method错误");
					break;
			}
		}
	}
}