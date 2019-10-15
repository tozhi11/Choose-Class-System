let listBox = document.querySelector("#list-box");
let headerRight = document.querySelector("#header-right");
let exit = document.querySelector("#user-exit");
let tbody = document.querySelector("tbody");
let storage = window.localStorage;
let isLogin = storage["isLogin"];
let userID = storage["userID"];
let position = storage["position"];
let li = listBox.querySelectorAll(".list-title");
let classComments = document.querySelector("#class-comments");
let detailBox = document.querySelector("#detail-box");
let detailItem =  detailBox.querySelectorAll(".detail-item");
let closeDetailWin = document.querySelector("#close");
// console.log(isLogin, userID, position);


window.onload = function() {
	if(!isLogin) {
		window.location.href = "login.html";
	}
	getUserStatus();
	document.querySelector(".select-course").setAttribute("style", "display: none");
	document.querySelector(".check-course").setAttribute("style", "display: none");
	document.querySelector(".view-personal-info").setAttribute("style", "display: none");
}


//获取登录用户的信息
function getUserStatus() {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Student/Status";
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(null);
	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval('(' + resultStr + ')');
			renderStatus(resultObj);
		}
	}
}

//渲染导航栏的欢迎信息
function renderStatus(obj) {
	// console.log(obj);
	var p = document.createElement("p");
	p.innerHTML = "欢迎你！" + obj.name + "同学(" + obj.college + ", " + obj.admissionYear + "-" + (parseInt(obj.admissionYear) + 4) + ")" ;
	headerRight.appendChild(p);
}


//监听退出按钮
exit.addEventListener("click", function(e) {
	localStorage.removeItem("isLogin");
	localStorage.removeItem("userID");
	localStorage.removeItem("position");
});


//点击左边导航栏时，在页面内渲染出相应内容
listBox.addEventListener("click", function(e) {
	var e = e || e.window.event;
	var target = e.target || e.srcElement;
	li.forEach(function(val, idx, arr) {
		if(arr[idx].classList.contains("li-active")) {
			arr[idx].classList.remove("li-active");
		}
	})
	target.classList.add("li-active");
	if(target.nodeName.toLowerCase() === 'li') {
		switch(target.innerHTML) {
			case "选课":
				document.querySelector(".select-course").removeAttribute("style");
				document.querySelector(".check-course").setAttribute("style", "display: none");
				document.querySelector(".view-personal-info").setAttribute("style", "display: none");
				if(tbody.innerHTML === "") {
					getClassInfo();
				}
				break;
			case "查看选课情况及退选":
				checkCourse(userID);
				document.querySelector(".select-course").setAttribute("style", "display: none");
				document.querySelector(".check-course").removeAttribute("style");
				document.querySelector(".view-personal-info").setAttribute("style", "display: none");
				break;
			case "查看个人信息":
				
				document.querySelector(".select-course").setAttribute("style", "display: none");
				document.querySelector(".check-course").setAttribute("style", "display: none");
				document.querySelector(".view-personal-info").removeAttribute("style");
				break;
		}
	}
});


