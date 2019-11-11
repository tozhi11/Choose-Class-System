from flask import Flask, session, redirect, url_for, escape, request, render_template
from flask import jsonify
from flask_cors import CORS
from flask import json

import sqlite3
app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/')
@app.route('/api')
def index():
    return render_template("login.html")


# /api/ChooseClass is used to choose Classes.
# It's used by the student user.
# Every Student can only choose two classes.
@app.route('/api/ChooseClass',methods = ['GET', 'POST'])
def ChooseClass():
    if request.method == 'POST':
        print(request.data)
        print(request.values)
        classID = request.form.get('classID')
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID or session['position'] != 2:
        #     return jsonify({'status': 1})
        order = "SELECT * from PEOPLETOCLASS WHERE PEOPLEID='"+peopleID+"'"
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        c.execute(order)
        cursor = c.fetchall()
        for row in cursor:
            if row[1] == classID:
                return jsonify({'status': '2'})
        if len(cursor) >= 2:
            return jsonify({'status': '3'})
        order = "INSERT INTO PEOPLETOCLASS (PEOPLEID, CLASSID) VALUES ('" + peopleID +"','" + classID +"')"
        print (order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status':0})
    return jsonify({'status': '4'})


# /api/Student/WithdrawClass is used to withdraw Classes.
# It's used by the student user.
# Every student only can withdraw the class he has chosen.
@app.route('/api/Student/WithdrawClass',methods = ['GET', 'POST'])
def WithdrawClass():
    if request.method == 'POST':

        classID = request.form.get('classID')
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID or session['position'] != 2:
        #     return jsonify({'status': 1})
        order = "SELECT * from PEOPLETOCLASS WHERE PEOPLEID='" + peopleID +"' AND CLASSID='"+ classID+"'"
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        c.execute(order)
        cursor = c.fetchall()
        for row in cursor:
            order = "DELETE FROM PEOPLETOCLASS WHERE PEOPLEID='" + peopleID +"' AND CLASSID='"+ classID+"'"
            print (order)
            c.execute(order)
            conn.commit()
            conn.close()
            return jsonify({'status': '0'})
        return jsonify({'status': '2'})
    return jsonify({'status': '3'})

# /api/Student/ClassStatus returns the classes the students has chosen.
@app.route('/api/Student/ClassStatus',methods = ['GET', 'POST'])
def StudentClassStatus():
    # CORS(app, supports_credentials=True)
    if request.method == 'POST':
        # data = json.loads(request.data)
        print(request.data)
        print(request.values)
        print(request.form)
        # print(data)
        peopleID = request.values.get('peopleID')
        print("!!!")
        print(peopleID) 
        # if session['username'] != peopleID or session['position']!= 2:
        #     return jsonify({'status': 1})
        order = "SELECT * from PEOPLETOCLASS WHERE PEOPLEID = '"+peopleID+"'"
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        # cursor = 
        c.execute(order)
        cur = c.fetchall()
        print(cur)
        t={}
        for num in range(0,len(cur)):
            order =  'SELECT * from CLASS WHERE CLASSID = '+cur[num][2]
            c.execute(order)
            cursor = c.fetchall()
            print(cursor)
            t[str(num)] = {
                'classID':   cursor[0][0],
                'className': cursor[0][1],
                'classTime': cursor[0][2],
                'address':   cursor[0][3],
                'teacher':   cursor[0][4],
                'comments':  cursor[0][5],
                'count':     cursor[0][6],
                'point':     cursor[0][7],
                'score':     cursor[0][8]
            }
        return jsonify({'status': '0', 'class':t})
    return jsonify({'status': '2'})


# /api/Class/detail uses to return more details about the class.
# The api will be called when the user click the button.
@app.route('/api/Class/detail',methods = ['GET', 'POST'])
def ClassDetail():
    if request.method == 'POST':
        classID = request.form.get('classID')
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = 'SELECT * FROM CLASS WHERE CLASSID = '+classID
        print(order)
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status':'1'})
        return jsonify({'status':         '0',
                        'classTime':      cur[0][2],
                        'classAddress':   cur[0][3],
                        'comments':       cur[0][5]})
    return jsonify({'status':'2'})    

# Class returns all the classes in the database. 
@app.route('/api/Class',methods = ['GET', 'POST'])
def ClassStatus():
    if request.method == 'POST':
        classID = request.form.get('classID')
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID:
        #     return jsonify({'status': 1})
        order = 'SELECT * from CLASS'
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        c.execute(order)
        cursor = c.fetchall()
        conn.close()
        t={}
        for num in range(0,len(cursor)):
            t[num] = (  {
                'classID':   cursor[num][0],
                'className': cursor[num][1],
                'teacher':   cursor[num][4],
                'count':     cursor[num][6],
                'point':     cursor[num][7],
                'score':     cursor[num][8]
            })
        print(t)
        return jsonify({'status': '0', 'class':t})
    return jsonify({'status': '2'})

# /api/Student/Status returns the student's status.
@app.route('/api/Student/Status',methods = ['GET', 'POST','OPTIONS'])
def StudentStatus():
    CORS(app, supports_credentials=True)
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        print(peopleID)
        if 'username' in session:
            print("ok!!!")
            return jsonify({'status':0})
        # if session['username'] != peopleID or session['position'] != 1:
        #     return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = "SELECT * FROM PEOPLE WHERE ID= '" + peopleID +"'"
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status': '2'})
        return jsonify({'status': '0','name':cur[0][2],'college':cur[0][5],'admissionYear':cur[0][6]})
    return jsonify({'status':'3'})

# /api/Teacher/Status returns the teacher's status.
@app.route('/api/Teacher/Status',methods = ['GET', 'POST'])
def TeacherStatus():
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID or session['position'] != 1:
        #     return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = "SELECT * FROM PEOPLE WHERE ID='" + peopleID+"'"
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status': '2'})
        return jsonify({'status': '0','name':cur[0][2],'peopleID':cur[0][0]})
    return jsonify({'status':'3'})

# /api/Teacher/AddClass help the teacher to add a new class.
# It allows teacher add the same class. 
@app.route('/api/Teacher/AddClass', methods = ['GET', 'POST'])
def AddClass():
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID or session['position'] != 1:
        #     return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        className = request.form.get('className')
        classTime = request.form.get('classTime')
        classAddress = request.form.get('classAddress')
        count = request.form.get('count')
        classPoint = request.form.get('classPoint')
        comments = request.form.get('comments')
        order = 'INSERT INTO CLASS(CLASSNAME,CLASSTIME,ADDRESS,TEACHER,COMMENTS,COUNT,POINT) VALUES ("'\
            + className +'","'+classTime +'","'+ classAddress+'",'+ "0" + ',"' +comments +'",'+count+','+classPoint+')'
        print (order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status': '0'})
    return jsonify({'status': '3'})

# /api/Teacher/UpdataClass allows the teacher updata the class infromation of the class.
@app.route('/api/Teacher/UpdateClass', methods  = ['GET', 'POST'])
def TeacherUpdataClass():
    print("in")
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        classID = request.form.get('classID')
        className = request.form.get('className')
        classTime = request.form.get('classTime')
        classAddress = request.form.get('classAddress')
        count = request.form.get('count')
        classPoint = request.form.get('classPoint')
        comments = request.form.get('comments')
        order = "UPDATE CLASS SET CLASSNAME='"+className+"', CLASSTIME='"+classTime+"' ,ADDRESS='"+classAddress+\
            "', COMMENTS='"+comments+"', COUNT="+count+ ", POINT="+classPoint+" WHERE CLASSID="+classID
        print(order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status': '0'})
    return jsonify({'status': '3'})

# /api/Manager/SetPower allows the  manager to change the power of the user.
@app.route('/api/Manager/SetPower', methods = ['GET', 'POST'])
def SetPower():
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        # if session['username'] != request.rootID or session['position'] != 0:
        #     return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = "SELECT * FROM PEOPLE WHERE ID='" + peopleID+"'"
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status': '2'})
        order = "UPDATA PEOPLE SET POSITION = "+ str(request.form.get('position')) +"WHERE ID ='"+peopleID+"'"
        print(order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status':'0'})
    return jsonify({'status':'3'})

# /api/Manager/UpdataClass allows the manager to updata class.
@app.route('/api/Manager/UpdataClass', methods = ['GET', 'POST'])
def ManagerUpdataClass():
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        # if session['username'] != peopleID or session['position'] != 0:
        #     return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        classID = request.form.get('classID')
        className = request.form.get('className')
        classTime = request.form.get('classTime')
        classAddress = request.form.get('classAddress')
        count = request.form.get('count')
        classPoint = request.form.get('classPoint')
        comments = request.form.get('comments')
        score = request.form.get('score')
        order = 'UPDATE CLASS SET CLASSNAME='+className+' CLASSTIME='+classTime+' ADDRESS='+classAddress+' COMMENTS='+comments+' COUNT='+count+' POINT='+point+\
            ' SCORE='+score+' WHERE CLASSID='+classID
        print(order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status': '0'})

# /api/Manager/DeleteClass allows the manager to delete the class.
@app.route('/api/Manager/DeleteClass', methods = ['GET', 'POST'])
def ManagerDeleteClass():
    peopleID = request.form.get('peopleID')
    classID = request.form.get('classID')
    # if session['username'] != peopleID:
    #     return jsonify({'status': 1})
    # if session['position'] != 0:
    #    return jsonify({'status':'3'})
    conn = sqlite3.connect('choose-class-system.db')
    c = conn.cursor()
    order = 'SELECT * FROM CLASS WHERE CLASSID = '+classID
    # cur = 
    c.execute(order)
    cur = c.fetchall()
    if len(cur) == 0:
        return jsonify({'status':'2'})
    order = 'DELETE FROM CLASS WHERE CLASSID = ' +classID
    c.execute(order)
    conn.commit()
    order = 'DELETE FROM PEOPLETOCLASS WHERE CLASSID = ' +classID
    c.execute(order)
    conn.commit()
    conn.close()
    return jsonify({'status':'0'})
    return True

# /api/Manager/DeleteStudent allows manager to delete students.
@app.route('/api/Manager/DeleteStudent', methods = ['GET', 'POST'])
def DeleteStudent():
    if request.method == 'POST':
        peopleID = request.form.get('peopleID')
        # studentID = request.form.get('studentID')
        # if session['username'] != peopleID:
        #     return jsonify({'status': 1})
        # if session['position'] != 0:
        #     return jsonify({'status':3})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = "SELECT * FROM PEOPLE WHERE ID = "+peopleID+"'"
        # cur =
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status':'2'})
        order = "DELETE FROM PEOPLE WHERE ID = "+peopleID+"'"
        c.execute(order)
        conn.commit()
        order = "DELETE FROM PEOPLETOCLASS WHERE ID = "+peopleID+"'"
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status':'0'})
    return jsonify({'status':'3'})

# /api/SignUp is used to make a new user.
@app.route('/api/SignUp', methods = ['GET','POST'])
def SignUp():
    if request.method == 'POST':
        print(request)
        name = request.form.get('peopleName')
        ID = request.form.get('peopleID')
        print (ID)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        order = "SELECT * FROM PEOPLE WHERE ID = '"+ID+ "'" 
        c.execute(order)
        cur = c.fetchall()
        if len(cur) :
            return jsonify({'status':'1'})
        passwd = request.form.get('passwd')
        college = request.form.get('college')
        position = request.form.get('position')
        admissionYear = request.form.get('admissionYear')
        print(position)
        telephone = request.form.get('telephone')
        order = "INSERT INTO PEOPLE (ID,PASSWORD,NAME,POSITION,TELEPHONE,COLLEGE,YEAR) VALUES('" + ID +"','"+passwd + "','" +name +"',"+\
            str(position)+",'"+telephone+"','"+college + "','"+ admissionYear + "')"
        print(order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status':'0'})


# userInDataBase uses to check if the user in the datebase.
# if the username or password is wrong, return 1.
def userInDataBase(username,passwd):
    # session[username] = 'teacher'
    order = "SELECT * FROM PEOPLE WHERE ID='"+ username+"'"
    print(order)
    conn = sqlite3.connect('choose-class-system.db')
    c = conn.cursor()
    print (order)
    c.execute(order)
    cursor = c.fetchall()
    print(cursor)
    for row in cursor:
        if row[1] == passwd:
            session['username'] = username
            session['position'] = row[3]
            session['name'] = row[2]
            return jsonify({'status': '0','peopleID': row[0], 'name': row[2], 'position' : str(row[3]),'college': row[5], 'admissionYear':row[6]})
        else:
            return jsonify({'status': '1'})
    return jsonify({'status': '1'})


@app.route('/api/ChangePassword', methods = ['GET','POST'])
def changePassword():
    if request.method == 'POST':
        username = request.form['username']
        passwd = request.form['password']
        order = 'SELECT * FROM PEOPLE WHERE ID = '+username
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        print (order)
        # cur = 
        c.execute(order)
        cur = c.fetchall()
        if len(cur) == 0:
            return jsonify({'status':'1'})
        order = 'UPDATA PEOPLE SET PASSWORD =' + passwd + 'WHERE ID = '+username
        c.execute(order)
        c.commit()
        c.close()
        return jsonify({'status':'0'})
    return jsonify({'status':'2'})


@app.route('/api/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        passwd = request.form['password']
        print(username)
        print(passwd)
        return userInDataBase(username,passwd)
    return '''
        <form action="" method="post">
            <p><input type=text name=username>
            <p><input type=text name=password>
            <p><input type=submit value=Login>
        </form>
    '''

# if username isn't in session return 1 
@app.route('/api/logout')
def logout():
    username = session.get('username')
    if username != request.form['peopleID']:
        return jsonify({'status': '1'})
    # remove the username from the session if it's there
    session.pop('username', None)
    session.pop('position', None)
    return jsonify({'status': '0'})

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    CORS(app, supports_credentials=True)
    app.run(
        host = '0.0.0.0',
        port = 8083, 
        debug = True)