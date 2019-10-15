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

//获取全部课程内容
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
		td[i] += "<td><button>详情</button><button>选课</button></td>";
	}
	return td;
}

//将数字评分转为星星符号
function changeToStar(score) {
	var starStr = "★★★★★✰✰✰✰✰";
	return starStr.slice(5 - score, 10 - score);
}

//全部课程显示在页面上;
function renderClass(classCells) {
	tbody.innerHTML = "<tr>" + classCells.join("</tr><tr>") + "</tr>";
}

//监听表格事件
tbody.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	console.log(e);
	if(target.nodeName.toLowerCase() === "button") {
		switch(target.innerHTML) {
			case "详情":
				renderClassDetail(e.path[2].cells[0].innerHTML);
				break;
			case "选课":
				chooseClass(e.path[2].cells[0].innerHTML);
				break;
		}
	}
});

//显示课程详情
function renderClassDetail(cid) {
	var p = document.createElement("p");
	var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Class/detail";
	var ajaxStr = "classID=" + cid;
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
			console.log(resultObj.class);
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


//选课
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
					document.querySelector(".select-course").style.display = "none";
					document.querySelector(".check-course").style.display = "block";
					document.querySelector("#select-course").classList.remove("li-active");
					document.querySelector("#check-course").classList.add("li-active");

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