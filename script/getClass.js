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
			renderClass(resultObj);
		}
	}
}

//将课程添加到页面上;
function renderClass(obj) {
	var len = obj.length;
	console.log(obj, len);
	for(var i = 0; i < len; i++) {
		var td = "<tr>";
		td += "<td>" + obj[i].score + "</td>";
		td += "<td>" + obj[i].courseName + "</td>";
		td += "<td>" + obj[i].teacher + "</td>";
		td += "<td>" + obj[i].schoolHour + "/" + obj[i].credit + "</td>";
		td += "<td>" + obj[i].totalPeople + "</td>";
		td += "<td><button>详情</button><button>选课</button></td></tr>";
		tbody.innerHTML += td;
	}
}