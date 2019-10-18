


var deleteClassInput = document.querySelector("#delete-course-id");
deleteClassInput.addEventListener("input", function (e) {
  deleteClassInfo.innerHTML = "";
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (deleteClassInput.value.trim().length === 0) {
    e.path[2].children[0].children[2].innerHTML = "课程编号不能为空";
  } 
  else {
    e.path[2].children[0].children[2].innerHTML = "";
  }
});


var deleteClassSubmit = document.querySelector("#delete-course-submit");
deleteClassSubmit.addEventListener("click", function (e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var str = getClassID();
  if (str.length !== 0) {
    e.path[2].children[0].children[2].innerHTML = "";
    postDeleteClass("classID=" + str);
  } 
  else {
    e.path[2].children[0].children[2].innerHTML = "课程编号不能为空";
  }
});

function getClassID() {
  return deleteClassInput.value.trim();
}

function postDeleteClass(ajaxStr) {
  var url = "http://127.0.0.1:5000/api/Manager/DeleteClass";
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
    var deleteClassInfo = document.querySelector("#delete-course-info");
    var e = e || e.target;
    var target = e.target || e.srcElement;
    if (target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      switch (resultObj.status) {
        case "0":
          deleteClassInfo.innerHTML = "删除成功";
          break;
        case "1":
          deleteClassInfo.innerHTML = "登录失败";
          break;
        case "2":
          deleteClassInfo.innerHTML = "该课程不存在";
          break;
        case "3":
          deleteClassInfo.innerHTML = "没有权限";
          break;
        case "4":
          deleteClassInfo.innerHTML = "method错误";
          break;
      }
    }
  }
}