
//每个输入框输入字符时判断长度且提示信息
var updateCourseBox = document.querySelector("#update-course-box");
updateCourseBox.addEventListener("input", checkInfo);

//提交
var updateCourseSubmit = document.querySelector("#update-course-submit");
updateCourseSubmit.addEventListener("click", submitInfo);


/**
 * 老师上传新课程
 * @param {String} classID | 课程编号
 * @param {String} className | 课程名称
 * @param {String} classTime | 上课时间
 * @param {String} classAddress | 上课地点
 * @param {String} classPeople | 课堂总人数
 * @param {String} classCredit | 学分
 * @param {String} classComment | 课程简介
 */
function postUpdateClass(classID, className, classTime, classAddress, classPeople, classCredit, classComment) {
  var url = "http://127.0.0.1:5000/api/Teacher/UpdateClass";
  var ajaxStr = "peopleID=" + userID + "&classID=" + classID + "&className=" + className + "&classTime=" + classTime + "&classAddress=" + classAddress + "&count=" + classPeople + "&classPoint=" + classCredit + "&comments=" + classComment;
  // var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Teacher/UpdateClass";
  // var ajaxStr = "peopleID=" + userID 
  //               + "&classID=" + classID 
  //               + "&className=" + className 
  //               + "&classTime=" + classTime 
  //               + "&classAddress=" + classAddress 
  //               + "&count=" + classPeople 
  //               + "&classPoint=" + classCredit 
  //               + "&comments=" + classComment;
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } 
  else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // console.log(ajaxStr);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  console.log(ajaxStr);
  xhr.send(ajaxStr);

  xhr.onreadystatechange = function (e) {
    var updateInfo = document.querySelector("#uclass-info");
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      switch (resultObj.status) {
        case "0":
          updateInfo.innerHTML = "添加成功";
          break;
        case "1":
          updateInfo.innerHTML = "登录失败";
          break;
        case "2":
          updateInfo.innerHTML = "已存在当前课程";
          break;
        case "3":
          updateInfo.innerHTML = "method错误";
          break;
      }
    }
  }
}