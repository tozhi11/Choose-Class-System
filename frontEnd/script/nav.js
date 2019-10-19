/** 
 * @namespace
 */
let headerRight = document.querySelector("#header-right");
let exit = document.querySelector("#user-exit");
let storage = window.localStorage;
let isLogin = storage["isLogin"];
let userID = storage["userID"];
let POSITION = storage["POSITION"];

//页面加载时显示顶部和左侧导航栏
window.onload = function() {
	if (!isLogin) {
		window.location.href = "login.html";
	}
	getUserStatus();
	switch(POSITION) {
		case "0":
			document.querySelector(".select-course").setAttribute("style", "display: none");
			document.querySelector(".check-course").setAttribute("style", "display: none");
			// document.querySelector(".view-personal-info").setAttribute("style", "display: none");
			break;
		case "1":
			document.querySelector(".add-course").setAttribute("style", "display:none");
			document.querySelector(".update-course").setAttribute("style", "display: none");
			break;
			case "2":
			document.querySelector(".update-permission").setAttribute("style", "display:none");
			document.querySelector(".update-course").setAttribute("style", "display: none");
			document.querySelector(".delete-course").setAttribute("style", "display:none");
			document.querySelector(".delete-stu").setAttribute("style", "display: none");
			break;
	}
}


//获取登录用户的信息
function getUserStatus() {
	var requsetstr = "peopleID=" + userID;
	// if (POSITION === "0") {
	// 	var url = "http://127.0.0.1:5000/api/Student/Status";
	// } 
	// else {
	// 	var url = "http://127.0.0.1:5000/api/Teacher/Status";
	// }
	if (POSITION === "0") {
		var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Student/Status";
	} 
	else {
		var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Teacher/status";
	}
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} 
	else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(requsetstr);
	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			if (POSITION === "0") {
				renderStatus(resultObj);
			} 
			else {
				renderTeacherStatus(resultObj);
			}
			
		}
	}
}

//渲染导航栏的欢迎信息
function renderStatus(obj) {
	var p = headerRight.querySelector("p");
	p.innerHTML = "欢迎你！" + obj.name + "同学(" 
								+ obj.college + ", " 
								+ obj.admissionYear + "-" 
								+ (parseInt(obj.admissionYear) + 4) 
								+ ")";
}

function renderTeacherStatus(obj) {
	var p = headerRight.querySelector("p");
	p.innerHTML = "欢迎你！" + obj.name 
								+ "(" + obj.peopleID + ")";
}


//监听退出按钮
exit.addEventListener("click", function(e) {
	localStorage.removeItem("isLogin");
	localStorage.removeItem("userID");
	localStorage.removeItem("position");
	logOut();
});

function logOut() {
	var url = "http://127.0.0.1:5000/api/logout";
	var ajaxStr = null;
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
				case "0":
					console.log('退出成功');
					window.location.href = "../pages/login.html";
					break;
				case "1":
					console.log('退出失败');
					break;
			}
		}
	}
}