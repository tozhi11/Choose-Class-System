## 查看学生状态
/api/Student/Status

### request:
学生编号 peopleID

### response:
status:
登录成功 返回0
登录失败 返回1
学生不存在 返回2
method错误 返回3
学号:peopleID
姓名:name
专业:college
入学时间:admissionYear
电话 telephone

## 查看老师状态
/api/Teacher/Status
### request:
教师编号 peopleID
### response:
status:
登录成功 返回0
登录失败 返回1
教师不存在 返回2
method错误 返回3
教工号 peopleID
姓名 name
电话 telephone
课程 course

## 查看课程状态
/api/Class
### request:

### response
status:
成功 0
没有权限 1
方法错误 2

课程信息
class(是个json数组):
classID:
className:
classTime:
address:
teacher:
comments:
count:
point:
score:

## 选课API
/api/Student/ChooseClass

### request:
课程编号 classID
学生编号 peopleID

### response:
选课成功:0
登录异常:1
与已选课程冲突:2
超过选课上限:3
method错误 4


## 退选
/api/Student/WithdrawClass

### request:
课程编号:classID
学生编号:peopleID

### response:
退课成功:0
登录异常:1
未选修当前课程:2
method错误 3

## 课程状态
/api/Student/ClassStatus
### request:
学生编号:peopleID

### response:
status:
登录成功:0
登录失败:1
method错误 2
class(是个json数组):
classID:
className:
classTime:
address:
teacher:
comments:
count:
point:
score:
 
<!-- 打分
/api/Student/Judge
request:
学生编号 peopleID
课程编号 classID
分数     score(10分制)

response:
status:
打分成功:0
登录失败:1
没有权限:2
不存在当前课程:3
method错误 4 -->


## 教师添加课程
/api/Teacher/AddClass
### request:
教师编号:peopleID
课程名称:className
上课时间:classTime
上课地点:classAddress
选课人数:count
学分:classPoint
描述:comments

### response:
status:
添加成功 0
登录失败 1
已存在当前课程 2
method错误 3

## 教师更新课程信息
/api/Teacher/UpdataClass
### request:
教师编号:peopleID
课程编号:classID
课程名称:className
上课时间:classTime
上课地点:classAddress
选课人数:count
学分:classPoint
简介:comments

### response:
status:
更改成功 0
登录失败 1
不存在当前课程 2
method错误 3


## 管理员更新权限
/api/Manager/SetPower
### request:
管理员编号:rootID
要修改的人的编号:peopleID
要修改成的权限:power(管理员：0，教师：1，学生：2)

### response:
status:
更改成功 0
当前账号没有更改权限 1
要修改的人不存在 2
method错误 3


## 管理员更新课程
/api/Manager/UpdataClass
### request:
教师编号:peopleID
课程编号:classID
课程名称:className
上课时间:classTime
上课地点:classAddress
选课人数:count
学分:classPoint
分数:score
描述:comments

### response:
status:
更改成功 0
登录失败 1
不存在当前课程 2
method错误 3


## 管理员删除课程
/api/Manager/DeleteClass
request:
编号:peopleID
课程编号:classID

response:
status:
删除成功 0
登录失败 1
不存在当前课程 2
没有删除权限 3
method错误 4

## 管理员删除学生
/api/Manager/DeleteStudent

### request:
学生编号

### respones:
删除成功 0
登录失败 1
不存在当前学生 2
没有删除权限 3
method错误 4

## 注册(做一个选项?老师和学生的权限不一样)
/api/SignUp

### request:
姓名:peopleName
账号:peopleID
密码:passwd
院系:college
身份:position(老师 = 1，学生 = 2)
入学时间:admissionYear / 科目:classID
电话 telephone


### response:
status:
注册成功:0
当前账号已存在:1
method错误 2

## 登录:
/api/login

### request:
用户名:username
密码:password

### response:
status:
登录成功:0
账号或密码错误:1
method错误 2

当前的人的身份:
position:
管理员:0
老师:1
学生:2

## 退出登录:
/api/logout

request:
编号:peopleID

response:
status:
退出成功 0
退出失败 1

## 修改密码

/api/Forget

### request
学生编号:peopleID
新密码:passwd

### response
status:
修改成功 0
学生不存在 1
方法错误 2
