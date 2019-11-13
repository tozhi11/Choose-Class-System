/** 
 * @namespace
 */
let userLogin = document.querySelector("#user-login");
let userName = document.querySelector("#user-name");
let userPassword = document.querySelector("#user-pwd");
let flag = 0;

//刚打开网页的时候使焦点置于输入框中
window.onload = setFocus(userName);

//监听提交按钮
let userSubmit = document.querySelector("#user-submit");
userSubmit.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	var name = userName.value.trim();
	var password = userPassword.value.trim();
	if (name === "") {
		showMsg("用户名不能为空");
		return;
	}
	if (password === "") {
		showMsg("密码不能为空");
		return;
	}
	postUser(name, password);
});


/**
 * 
 * @param {String} str | 提示内容
 */
function showMsg(str) {
	let checkMsg = document.querySelector("#check-msg");
	checkMsg.innerHTML = str;
	checkMsg.classList.add("msg");
}

/**
 * 
 * @param {TagName} input | 将页面焦点置于输入框内
 */
function setFocus(input) {
	input.focus();
}


/**
 * 提交用户登录信息
 * @param {String} name | 用户名
 * @param {String} password | 密码
 */
function postUser(name, password) {
	var url = 'http://47.107.246.0:8083/api/login';
	// var url = 'https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/login';
	var ajaxStr = "username=" + name + "&password=" + password;
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
			var resultObj = eval("(" + resultStr + ")");
			if (resultObj.status === "1") {
				showMsg('账号或密码错误');
			} 
			else {
				localStorage.setItem("isLogin", true);
				localStorage.setItem("userID", name);
				localStorage.setItem("POSITION", resultObj.position);
				localStorage.setItem("userStatus", null);
				switch(resultObj.position) {
					case "2" :
						window.location.href = "../pages/student.html";
						break;
					case "1" :
						window.location.href = "../pages/teacher.html";
						break;
					case "0"  :
						window.location.href = "../pages/admin.html";
				}
			}
		}
	}
}