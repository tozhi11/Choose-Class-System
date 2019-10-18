let loginBox = document.querySelector("#login-wrapper");
let userLogin = document.querySelector("#user-login");
let userName = document.querySelector("#user-name");
let userPassword = document.querySelector("#user-pwd");
let userSubmit = document.querySelector("#user-submit");
let checkMsg = document.querySelector("#check-msg");
let flag = 0;

//刚打开网页的时候使焦点置于输入框中
window.onload = setFocus(userName);

//监听提交按钮
userSubmit.addEventListener("click", function(e) {
	var e = e || window.event;
	var target = e.target || e.srcElement;
	var name = userName.value.trim();
	var password = userPassword.value.trim();
	if(name === "") {
		showMsg("用户名不能为空");
		return ;
	}
	if(password === "") {
		showMsg("密码不能为空");
		return ;
	}
	postUser(name, password);
});


//提示信息
function showMsg(str) {
	checkMsg.innerHTML = str;
	checkMsg.classList.add("msg");
}


function setFocus(input) {
	input.focus();
}

//提交用户登录信息
function postUser(name, password) {
	var url = 'http://127.0.0.1:5000/api/login';
	var requestString = "username=" + name + "&password=" + password;
	console.log(requestString);
	var oAjax = null;

	if(window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	oAjax.open("POST", url, true);
	oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	oAjax.send(requestString);

	oAjax.onreadystatechange = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		
		if(target.readyState === 4 && target.status === 200) {
			var resultStr = target.responseText;
			var resultObj = eval("(" + resultStr + ")");
			console.log(resultObj)
			if(resultObj.status === "1") {
				showMsg('账号或密码错误');
			} else {
				localStorage.setItem("isLogin", true);
				localStorage.setItem("userID", name);
				localStorage.setItem("position", resultObj.position);
				localStorage.setItem("userStatus", null);
				switch(resultObj.position) {
					case 2 :
						window.location.href = "../pages/student.html";
						break;
					case 1 :
						window.location.href = "../pages/teacher.html";
						break;
					case 0  :
						window.location.href = "../pages/admin.html";
						break;
				}
			}
		}
	}
}