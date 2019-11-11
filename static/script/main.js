

//点击左边导航栏时，在页面内渲染出相应内容
let listBox = document.querySelector("#list-box");
listBox.addEventListener("click", function (e) {

	let li = listBox.querySelectorAll(".list-title");
	var e = e || e.window.event;
	var target = e.target || e.srcElement;

	li.forEach(function(val, idx, arr) {
		if (arr[idx].classList.contains("li-active")) {
			arr[idx].classList.remove("li-active");
		}
	});

	target.classList.add("li-active");

	if (target.nodeName.toLowerCase() === 'li') {
		let mainContent = document.querySelectorAll("#main-wrapper");
		switch(target.innerHTML) {
			case "选课":
				document.querySelector(".select-course").removeAttribute("style");
				document.querySelector(".check-course").setAttribute("style", "display: none");
				// document.querySelector(".view-personal-info").setAttribute("style", "display: none");
				if (mainContent.innerHTML === "") {
					getClassInfo(userID, 0);
				}
				break;
			case "查看选课情况及退选":
				if (mainContent.innerHTML === "") {
					getClassInfo(userID, 1);
				}
				document.querySelector(".select-course").setAttribute("style", "display: none");
				document.querySelector(".check-course").removeAttribute("style");
				break;
			case "添加课程":

				document.querySelector(".update-course").setAttribute("style", "display: none");
				document.querySelector(".add-course").removeAttribute("style");
				break;
			case "更新课程信息":
				if (POSITION === "1") {
					document.querySelector(".add-course").setAttribute("style", "display: none");
					document.querySelector(".update-course").removeAttribute("style");
				} 
				else {
					document.querySelector(".update-course").removeAttribute("style");
					document.querySelector(".update-permission").setAttribute("style", "display: none");
					document.querySelector(".delete-course").setAttribute("style", "display: none");
					document.querySelector(".delete-stu").setAttribute("style", "display: none");
				}
				break;
			case "修改人员权限":
				
				document.querySelector(".update-permission").removeAttribute("style");
				document.querySelector(".update-course").setAttribute("style", "display: none");
				document.querySelector(".delete-course").setAttribute("style", "display: none");
				document.querySelector(".delete-stu").setAttribute("style", "display: none");
				break;
			case "删除课程":

				document.querySelector(".delete-course").removeAttribute("style");
				document.querySelector(".update-course").setAttribute("style", "display: none");
				document.querySelector(".update-permission").setAttribute("style", "display: none");
				document.querySelector(".delete-stu").setAttribute("style", "display: none");
				break;
			case "删除学生":

				document.querySelector(".delete-stu").removeAttribute("style");
				document.querySelector(".update-course").setAttribute("style", "display: none");
				document.querySelector(".update-permission").setAttribute("style", "display: none");
				document.querySelector(".delete-course").setAttribute("style", "display: none");
				break;
			
		}
	}
});