

function checkInfo(e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.nodeName.toLowerCase() === "input" || target.nodeName.toLowerCase() === "textarea") {
    var inputValue = getContent(target);
    var nameText = e.path[1].querySelectorAll("span")[0].innerHTML.slice(0, -1);
    var infoText = e.path[1].querySelectorAll("span")[1];
    if (inputValue.length === 0) {
      infoText.innerHTML = nameText + "不能为空";
    } 
    else {
      infoText.innerHTML = "";
    }
  }
}

function submitInfo(e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var courseItems = e.path[2].querySelectorAll("li");
   if (courseItems[0].classList.contains("update-course-items")) {
    var classID = courseItems[0].children[1].value.trim();
    var className =courseItems[1].children[1].value.trim();
    var classTime =courseItems[2].children[1].value.trim();
    var classAddress = courseItems[3].children[1].value.trim();
    var classPeople = courseItems[4].children[1].value.trim();
    var classCredit = courseItems[5].children[1].value.trim();
    var classComment = courseItems[6].children[1].value.trim();
  } 
  else {
    var className = courseItems[0].children[1].value.trim();
    var classTime = courseItems[1].children[1].value.trim();
    var classAddress = courseItems[2].children[1].value.trim();
    var classPeople = courseItems[3].children[1].value.trim();
    var classCredit = courseItems[4].children[1].value.trim();
    var classComment = courseItems[5].children[1].value.trim();
  }
  if (checkInputValue(courseItems) 
      && courseItems[0].classList.contains("add-course-items")
  ) {
    postNewClass(className, classTime, classAddress, classPeople, classCredit, classComment);
  }
  else if (checkInputValue(courseItems) 
    && courseItems[0].classList.contains("update-course-items")
  ) {
    postUpdateClass(classID, className, classTime, classAddress, classPeople, classCredit, classComment);
  }
}

//检查输入内容
function checkInputValue(courseItems) {
  var flag = true;
  var itemsLen = courseItems.length;
  for (var i = 0; i < itemsLen - 1; i++) {
    if (! getWarnInfo(courseItems, i)) {
      flag = false;
    }
  }
  return flag;
}

//获取警告内容
function getWarnInfo(arr, idx) {
  var inputValue = getContent(arr[idx].children[1]); //input框输入的内容
  var nameText = arr[idx].children[0].innerHTML.slice(0, -1); //input框的标题
  var infoText = arr[idx].children[2]; //提示信息
  if (inputValue.length === 0) {
    infoText.innerHTML = nameText + "不能为空";
    return false;
  } 
  else {
    infoText.innerHTML = "";
    return true;
  }
}

//获取输入内容
function getContent(target) {
  return target.value.trim();
}