var setPowerSubmit = document.querySelector("#change-power-submit"); //提交按钮
var powerInfo = document.querySelector("#power-info");

setPowerSubmit.addEventListener("click", function(e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var str = getInputValue();
  console.log(str);
  postSetPower(str);
});

function getInputValue() {
  var changeID = document.querySelector("#set-power-id").value.trim();
  var changePowerSelect = document.querySelector("#change-power");
  var changePosition = changePowerSelect.selectedIndex;
  return "rootID=" + userID + "&peopleID=" + changeID + "&power=" + changePosition;
}

function postSetPower(ajaxStr) {
  var url = "https://www.fastmock.site/mock/0ca083d3c1d3e79c2abdb96367fac9dd/api/Manager/SetPower";
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
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.readyState === 4 && target.status === 200) {
      var resultStr = target.responseText;
      var resultObj = eval('(' + resultStr + ')');
      switch(resultObj.status) {
        case "0":
          powerInfo.innerHTML = "修改成功";
          break;
        case "1":
          powerInfo.innerHTML = "暂无修改权限";
          break;
        case "2":
          powerInfo.innerHTML = "该账户不存在";
          break;
        case "3":
          powerInfo.innerHTML = "method错误";
          break;
      }
    }
  }
}