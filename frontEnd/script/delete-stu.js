

//每个输入框输入字符时判断长度且提示信息
var deleteStuInput = document.querySelector("#delete-stu-id");
deleteStuInput.addEventListener("input", function(e) {
  deleteStuInfo.innerHTML = "";
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (deleteStuInput.value.trim().length === 0) {
    e.path[2].children[0].children[2].innerHTML = "学号不能为空";
  } 
  else {
    e.path[2].children[0].children[2].innerHTML = "";
  }
});


//点击删除按钮 确认提交
var deleteStuSubmit = document.querySelector("#delete-stu-submit");
deleteStuSubmit.addEventListener("click", function(e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var str = getStuID();
  if (str.length !== 0) {
    e.path[2].children[0].children[2].innerHTML = "";
    postDeleteStu("peopleID=" + str);
  } 
  else {
    e.path[2].children[0].children[2].innerHTML = "学号不能为空";
  }
});


//获取学生id
function getStuID() {
  return deleteStuInput.value.trim();
}

function postDeleteStu(ajaxStr) {
  var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Manager/DeleteStudent";
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

  xhr.onreadystatechange = function (e) {
    var deleteStuInfo = document.querySelector("#delete-stu-info");
    var e = e || e.target;
    var target = e.target || e.srcElement;
    if (target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      switch(resultObj.status) {
        case "0" :
          deleteStuInfo.innerHTML = "删除成功";
          break;
        case "1":
          deleteStuInfo.innerHTML = "登录失败";
          break;
        case "2":
          deleteStuInfo.innerHTML = "该学号不存在";
          break;
        case "3":
          deleteStuInfo.innerHTML = "没有权限";
          break;
        case "4":
          deleteStuInfo.innerHTML = "method错误";
          break;
      }
    }
  }
}