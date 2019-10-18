/** 
 * @namespace
 */
let classComments = document.querySelector("#class-comments");
let detailBox = document.querySelector("#detail-box");
let detailItem =  detailBox.querySelectorAll(".detail-item");
let closeDetailWin = document.querySelector("#close");
let table = document.querySelector("table");
let selectTbody = document.querySelector("#select-main");
let checkTbody = document.querySelector("#check-main");

//获取课程信息
function getClassInfo(userID, flag) {
	if (flag) {
		var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Student/ClassStatus";
		var ajaxStr = "peopleID=" + userID; 
	} 
	else {
		var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Class";
		var ajaxStr = null;
	}
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} 
	else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
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
					var classCells = getAllClass(resultObj.class, flag);
					renderClass(classCells, flag);
					break;
				case "1":
					console.log("没有权限");
					return;
					break;
				case "2":
					console.log("方法错误");
					return;
					break;
			}
		}
	}
}

//获取课程内容
function getAllClass(obj, flag) {
	var len = obj.length;
	var td = new Array();
	for(var i = 0; i < len; i++) {

		td[i] = "<td>" + obj[i].classID + "</td>";
		td[i] += "<td>" + changeToStar(obj[i].score) + "</td>";
		td[i] += "<td>" + obj[i].className + "</td>";
		td[i] += "<td>" + obj[i].teacher + "</td>";
		td[i] += "<td>" + obj[i].classPoint + "</td>";
		td[i] += "<td>" + obj[i].count + "</td>";
		td[i] += "<td><button>详情</button>";

		if (flag) {
			td[i] += "<button>退选</button></td>";
		} 
		else {
			td[i] += "<button>选课</button></td>";
		} 
	}
	return td;
}

//课程显示在页面上;
function renderClass(classCells, flag) {
	if (flag === 0) {
		selectTbody.innerHTML = "<tr>" + classCells.join("</tr><tr>") + "</tr>";
	} 
	else {
		checkTbody.innerHTML = "<tr>" + classCells.join("</tr><tr>") + "</tr>";
	}
}

//监听表格事件
selectTbody.addEventListener("click",getDetail);
checkTbody.addEventListener("click", getDetail);

function getDetail (e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	if (target.nodeName.toLowerCase() === "button") {
		switch(target.innerHTML) {
			case "详情":
				renderClassDetail(e.path[2].cells[0].innerHTML);
				break;
			case "选课":
				chooseClass(e.path[2].cells[0].innerHTML);
				break;
			case "退选":
				quitClass(userID, e.path[2].cells[0].innerHTML);
		} 
	}
}


//将数字评分转为星星符号
function changeToStar(score) {
	var starStr = "★★★★★✰✰✰✰✰";
	return starStr.slice(5 - score, 10 - score);
}

//显示课程详情
function renderClassDetail(cid) {
	var p = document.createElement("p");
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Class/detail";
	var ajaxStr = "classID=" + cid;
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
			p.innerHTML = resultObj.class.comments;
			detailItem[0].innerHTML = "时间: " + resultObj.class.classTime;
			detailItem[1].innerHTML = "地点:" + resultObj.class.classAddress;
		}
	}
	classComments.replaceChild(p, classComments.querySelector("p"));
	document.querySelector("#class-detail").style.display = "flex";
}


//关闭小窗口
closeDetailWin.addEventListener("click", function(e) {
	document.querySelector("#class-detail").style.display = "none";
});