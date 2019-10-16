var updateCourseSubmit = document.querySelector("#update-course-submit");
var updateCourseBox = document.querySelector("#update-course-box");
var uClassInfo = document.querySelector("#uclass-info");
var uP = uClassInfo.querySelector("p");

//上传新课程
function postUpdateClass(classID, className, classTime, classAddress, classPeople, classCredit, classComment) {
  var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Teacher/UpdateClass";
  var ajaxStr = "peopleID=" + userID + "&classID=" + classID + "&className=" + className + "&classTime=" + classTime + "&classAddress=" + classAddress + "&count=" + classPeople + "&classPoint=" + classCredit + "&comments=" + classComment;
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // console.log(ajaxStr);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(ajaxStr);

  xhr.onreadystatechange = function (e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      switch (resultObj.status) {
        case "0":
          uP.innerHTML = "添加成功";
          break;
        case "1":
          uP.innerHTML = "登录失败";
          break;
        case "2":
          uP.innerHTML = "已存在当前课程";
          break;
        case "3":
          uP.innerHTML = "method错误";
          break;
      }
    }
  }
}