var collegeArr = [];

var signUpPosition = document.querySelectorAll("input[name=position]");
var peopleName = document.querySelector("#people-name");
var peopleID = document.querySelector("#people-id");
var pwd = document.querySelectorAll("input[type='password']");
var admissionYear = document.querySelector("#admission-year");
var college = document.querySelector("#college");
var telNum = document.querySelector("#telephone");
var submit = document.querySelector("#sign-up-submit");
var pwdInfo = document.querySelector("#repwd-info");

submit.addEventListener("click",function(e) {
  var userPosition = 0;
  if(signUpPosition[0].checked === true) {
    userPosition = 2;
  } else if (signUpPosition[1].checked === true) {
    userPosition = 1;
  } else {
    userPosition = 0;
  }
  var userName = peopleName.value.trim();
  var userID = peopleID.value.trim();
  var password = pwd[0].value.trim();
  var rePassword = pwd[1].value.trim();
  var admYear = admissionYear[admissionYear.selectedIndex].value;
  var clg = college[college.selectedIndex].value;
  var tel = telNum.value.trim();
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (userPosition == 0) {
    document.querySelector("#position-info").innerHTML = "请选择其中一项";
  } else if (userName.length === 0) {
    document.querySelector("#name-info").innerHTML = "姓名不能为空";
  } else if (userID.length === 0) {
    document.querySelector("#id-info").innerHTML = "学号/教工号不能为空";
  } else if (password.length === 0) {
    document.querySelector("#pwd-info").innerHTML = "密码不能为空";
  } else if (rePassword.length === 0) {
    document.querySelector("#repwd-info").innerHTML = "确认密码不能为空";
  } else if(password !== rePassword) {
    document.querySelector("#repwd-info").innerHTML = "两次密码输入不一致";
  } else if (tel.length === 0) {
    document.querySelector("#tel-info").innerHTML = "手机号不能为空";
  } else {
    postNewUser(userName, userID, password, admYear, clg, tel, userPosition);
  }
  // window.location.href = "../pages/login.html";
});

function postNewUser(userName, userID, password, admYear, clg, tel, userPosition) {
  var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/SignUp";
  var ajaxStr = "peopleName=" + userName + "&peopleID=" + userID + "&passwd=" + password + "&college=" + clg + "&position" + userPosition + "&admissionYear=" + admYear + "&telephone=" + tel;
  console.log(ajaxStr);

  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(ajaxStr);

  xhr.onreadystatechange = function (e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      window.location.href = "../pages/login.html";
      console.log(resultObj);
    }
  }
}

pwd[1].addEventListener("input", function(e) {
  var firstPwd  = pwd[0].value.trim();
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.value.trim() !== firstPwd) {
    pwdInfo.innerHTML = "两次密码输入不一致";
  } else {
    console.log(target.value);
    pwdInfo.innerHTML = "";
  }
});