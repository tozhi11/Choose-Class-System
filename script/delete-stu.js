var deleteStuSubmit = document.querySelector("#delete-stu-submit");
var deleteStuInput = document.querySelector("#delete-stu-id");
var deleteStuInfo = document.querySelector("#delete-stu-info");

deleteStuInput.addEventListener("input", function(e) {
  deleteStuInfo.innerHTML = "";
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if(deleteStuInput.value.trim().length === 0) {
    e.path[2].children[0].children[2].innerHTML = "学号不能为空";
  } else {
    e.path[2].children[0].children[2].innerHTML = "";
  }
});


deleteStuSubmit.addEventListener("click", function(e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var str = getStuID();
  if (str.length !== 0) {
    e.path[2].children[0].children[2].innerHTML = "";
    postDeleteStu(str);
  } else {
    e.path[2].children[0].children[2].innerHTML = "学号不能为空";
  }
});

function getStuID() {
  return deleteStuInput.value.trim();
}

function postDeleteStu(ajaxStr) {
  var url = "http://127.0.0.1:5000/api/Manager/DeleteStudent";
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
    var e = e || e.target;
    var target = e.target || e.srcElement;
    if(target.readyState === 4 && target.status === 200) {
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