var addCourseSubmit = document.querySelector("#add-course-submit");
var addCourseBox = document.querySelector("#add-course-box");
var cName = document.querySelector("#c-name");
var cTime = document.querySelector("#c-time");
var cAddress = document.querySelector("#c-address");
var cPeople = document.querySelector("#c-people");
var cCredit = document.querySelector("#c-credit");
var cComment = document.querySelector("#c-comment");
var classInfo = document.querySelector("#class-info");
var p = classInfo.querySelector("p");

//上传新课程
function postNewClass(className, classTime, classAddress, classPeople, classCredit, classComment) {
  var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Teacher/AddClass";
  var ajaxStr = "peopleID=" + userID + "&className=" + className + "&classTime=" + classTime + "&classAddress=" + classAddress + "&count=" + classPeople + "&classPoint=" + classCredit + "&comments=" + classComment;
  var xhr = null;
  // console.log(ajaxStr);
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
      switch(resultObj.status) {
        case "0":
          p.innerHTML = "添加成功";
          break;
        case "1":
          p.innerHTML = "登录失败";
          break;
        case "2":
          p.innerHTML = "已存在当前课程";
          break;
        case "3":
          p.innerHTML = "method错误";
          break;
      }
    }
  }
}