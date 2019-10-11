/api/Student

request:
学生编号 peopleID

response:
登录成功 返回0
登录失败 返回1


选课API
/api/Student/ChooseClass

request:
课程编号 classID
学生编号 peopleID

response:
选课成功:0
登录异常:1
与已选课程冲突:2
超过选课上限:3


退选
/api/Student/WithdrawClass

request:
课程编号:classID
学生编号:peopleID

response:
退课成功:0
登录异常:1
未选修当前课程:2

课程状态

/api/Student/ClassStatus
request:
学生编号:peopleID

response:
status:
登录成功:0
登录失败:1
class:


教师添加课程
/api/Teacher/AddClass
request:
教师编号:peopleID
课程编号:classID
课程名称:className
上课时间:classTime
上课地点:classAddress
学分:classPoint

response:
status:
添加成功 0
登录失败 1
已存在当前课程 2

教师删除课程
/api/Teacher/DeleteClass
request:
教师编号:peopleID
课程编号:classID

response:
status:
删除成功 0
登录失败 1
不存在当前课程 2


教师更新课程信息
/api/Teacher/UpdataClass
request:
教师编号:peopleID
课程编号:classID
课程名称:className
上课时间:classTime
上课地点:classAddress
学分:classPoint

response:
status:
更改成功 0
登录失败 1
不存在当前课程 2

管理员更新权限
/api/Manager/SetPower
request:
管理员编号:rootID
要修改的人的编号:peopleID
要修改成的权限:power(管理员：0，教师：1，学生：2)

response:
status:
更改成功 0
当前账号没有更改权限 1
要修改的人不存在 2


管理员更新课程
/api/Manager/UpdataClass
request:
教师编号:peopleID
课程编号:classID
课程名称:className
上课时间:classTime
上课地点:classAddress
学分:classPoint

response:
status:
更改成功 0
登录失败 1
不存在当前课程 2

注册(默认学生，老师要管理员改)
/api/SignUp

request:
姓名:peopleName
账号:peopleID
密码:passwd

response:
status:
注册成功:0
当前账号已存在:1

登录:
/api/login

request:
用户名:username
密码:password

response:

status:
登录成功:0
账号或密码错误:1

当前的人的身份:
position:
管理员:0
老师:1
学生:2

退出登录:
/api/logout

request:
编号:peopleID

response:
status:
退出成功 0
退出失败 1

