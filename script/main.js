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
let detailItem =  detailBox.querySelectorAll("#detail-item");
let comments = new Array();
let classTime = new Array();
let classAddress = new Array();
// console.log(isLogin, userID, position);


window.onload = function() {
	if(!isLogin) {
		window.location.href = "login.html";
	}
	getUserStatus();
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


// //鼠标滑入列表栏时
// listBox.addEventListener("mouseover", function(e) {
// 	
// 	var e = e || window.event;
// 	var target = e.target || e.srcElement;
// 	if(target.nodeName.toLowerCase() === 'li') {
// 		if(target.classList.contains("li-active")) {
// 			li.forEach(function(val, idx, arr) {
// 				if(arr[idx].classList.contains("li-active")) {
// 					arr[idx].classList.remove("li-active");
// 				}
// 			})
// 		}
// 	}
// });

//当点击列表项时，在页面内渲染出相应内容
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
				if(tbody.innerHTML === "") {
					getClassInfo();
				}
				break;
			case "查看选课情况及退选":
				break;
			case "查看个人信息":
				break;
		}
	}

	if(document.querySelector("#class-detail").style.display !== "none") {
		document.querySelector("#class-detail").style.display = "none";
	}
});

//获取课程信息
function getClassInfo() {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Class";
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
	xhr.send(null);

	xhr.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			resultObj = eval('(' + resultStr + ')');
			switch(resultObj.status) {
				case "0":
					var classCells = getAllClass(resultObj.class);
					renderClass(classCells);
					break;
				case "1":
					console.log("没有权限");
					return ;
					break;
				case "2":
					console.log("方法错误");
					return ;
					break;
			}
		}
	}
}

function getAllClass(obj) {
	var len = obj.length;
	var td = new Array();
	for(var i = 0; i < len; i++) {
		td[i] = "<td>" + obj[i].classID + "</td>";
		td[i] += "<td>" + changeToStar(obj[i].score) + "</td>";
		td[i] += "<td>" + obj[i].className + "</td>";
		td[i] += "<td>" + obj[i].teacher + "</td>";
		td[i] += "<td>" + obj[i].classPoint + "</td>";
		td[i] += "<td>" + obj[i].count + "</td>";
		// td[i] += "<td>" + obj[i].classTime + "</td>";
		// td[i] += "<td>" + obj[i].classAddress + "</td>";
		td[i] += "<td><button>详情</button><button>选课</button></td>";
	}
	return td;
}

//将数字评分转为星星符号
function changeToStar(score) {
	var starStr = "★★★★★✰✰✰✰✰";
	return starStr.slice(5 - score, 10 - score);
}

//将课程显示在页面上;
function renderClass(classCells) {
	tbody.innerHTML = "<tr>" + classCells.join("</tr><tr>") + "</tr>";
}

tbody.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	console.log(e);
	if(target.nodeName.toLowerCase() === "button") {
		switch(target.innerHTML) {
			case "详情":
				renderClassDetail();
				break;
			case "选课":
				chooseClass(e.path[2].cells[0].innerHTML);
				break;
		}
	}
});

function renderClassDetail() {
	var p = document.createElement("p");
	p.innerHTML = comments[0];
	classComments.appendChild(p);
	detailItem[0].innerHTML += classTime[0];
	detailItem[1].innerHTML += classAddress[0];
	document.querySelector("#class-detail").style.display = "flex";
	document.querySelector("#main-wrapper").backgroundColor = "#eee";
}

function chooseClass(cid) {
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/ChooseClass";
	var ajaxStr = "classID=" + cid + "&peopleID=" + userID;
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject();
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
				case "0" : 
					console.log("选课成功");
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