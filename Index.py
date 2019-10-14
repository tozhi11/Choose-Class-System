# 

from flask import Flask, session, redirect, url_for, escape, request, render_template
from flask import jsonify
import sqlite3
app = Flask(__name__)



@app.route('/')
@app.route('/api')
def index():
    if 'username' in session:
        return 'Logged in as %s %s' % (escape(session['username']), escape(session['position']))
    return 'You are not logged in'

@app.route('/api/Student/ChooseClass',methods = ['GET', 'POST'])
def ChooseClass():
    if request.method == 'POST':
        classID = request.classID
        peopleID = request.peopleID
        if session['username'] != peopleID || session['position'] != 2:
            return jsonify({'status': 1})
        order = 'SELECT * from PEOPLETOCLASS WHERE PEOPLEID=' + peopleID +' AND CLASSID='+ classID
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        cursor = c.execute(order)
        for row in cursor:
            if row[1] == classID:
                return jsonify({'status': 2})
        if len(cursor) >= 2:
            return jsonify({'status': 3})
        order = 'INSERT INTO PEOPLETOCLASS (PEOPLEID, CLASSID) VALUES (' + peopleID +',' + classID +')'
        print (order)
        c.execute(order)
        conn.commit()
        conn.close()
    return jsonify({'status': 4})

@app.route('/api/Student/WithdrawClass',methods = ['GET', 'POST'])
def WithdrawClass():
    if request.method == 'POST':
        classID = request.classID
        peopleID = request.peopleID
        if session['username'] != peopleID || session['position'] != 2:
            return jsonify({'status': 1})
        order = 'SELECT * from PEOPLETOCLASS WHERE PEOPLEID=' + peopleID +' AND CLASSID='+ classID
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        cursor = c.execute(conn)
        for row in cursor:
            if row[1] == classID:
                order = 'DELETE FROM PEOPLETOCLASS WHERE PEOPLEID=' + peopleID +' AND CLASSID='+ classID
                print (order)
                c.execute(order)
                conn.commit()
                return jsonify({'status': 0})
        return jsonify({'status': 2})
    return jsonify({'status': 3})

@app.route('/api/Student/ClassStatus',methods = ['GET', 'POST'])
def ClassStatus():
    if request.method == 'POST':
        classID = request.classID
        peopleID = request.peopleID
        if session['username'] != peopleID || session['position'] != 2:
            return jsonify({'status': 1})
        order = 'SELECT * from CLASS'
        print (order)
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()
        cursor = c.execute(conn)
        t={}
        for num in range(1,len(cursor)):
            t[str(num)] = {
                'classID':   cursor[num - 1][0],
                'classname': cursor[num-1][1],
                'classTime': cursor[num-1][2],
                'address':   cursor[num-1][3],
                'teacher':   cursor[num-1][4],
                'comments':  cursor[num-1][5],
                'count':     cursor[num-1][6],
                'point':     cursor[num-1][7],
                'score':     cursor[num-1][8]
            }
        return jsonify({'status': 0, 'class':t})
    return jsonify({'status': 2})

@app.route('/api/Teacher/AddClass', methods = ['GET', 'POST'])
def AddClass():
    if request.method == 'POST':
        peopleID = request.peopleID
        if session['username'] != peopleID || session['position'] != 1:
            return jsonify({'status': 1})
        conn = sqlite3.connect('choose-class-system.db')
        c = conn.cursor()

        className = request.className
        classTime = request.classTime
        classAddress = request.classAddress
        count = request.count
        classPoint = request.classPoint
        comments = request.comments
        order = 'INSERT INTO CLASS(CLASSNAME,CLASSTIME,ADDRESS,TEACHER,COMMENTS,COUNT,POINT) VALUES ('\
            + className +','+classTime +','+ classAddress+',' + session['name'] +','+comments +','+count+','+point+')'
        print (order)
        c.execute(order)
        conn.commit()
        conn.close()
        return jsonify({'status': 0})
    return jsonify({'status': 3})

@app.route('/api/Teacher/UpdataClass', methods  = ['GET', 'POST'])
def TeacherUpdataClass():
    
    return True

# @app.route('/api/Teacher/GetInformation', methods=['GET', 'POST'])
# def UpdataClass():
#     return True

@app.route('/api/Manager/SetPower', methods = ['GET', 'POST'])
def SetPower():
    return True

@app.route('/api/Manager/UpdataClass', methods = ['GET', 'POST'])
def ManagerUpdataClass():
    return True

@app.route('/api/Manager/DeleteClass', methods = ['GET', 'POST'])
def ManagerDeleteClass():
    return True

@app.route('/api/Manager/DeleteStudent', methods = ['GET', 'POST'])
def DeleteStudent():
    return True

@app.route('/api/SignUp' methods = ['GET','POST'])
def SignUp():
    if method == 'POST':
        name = request.peopleName
        ID = request.peopleID
        passwd = request.passwd
        college = request.college
        position = request.position
        if position == 0:
            classID = request.classID
        if position == 1:
            admissionYear = request.admissionYear
        telephone = request.telephone
    


# userInDataBase uses to check if the user in the datebase.
# if the username or password is wrong, return 1.
def userInDataBase(username,passwd):
    # session[username] = 'teacher'
    order = 'SELECT * FROM PEOPLE WHERE ID='
    order = order + username
    conn = sqlite3.connect('choose-class-system.db')
    c = conn.cursor()
    print (order)
    cursor = c.execute(order)
    for row in cursor:
        if row[1] == passwd:
            session['username'] = username
            session['position'] = row[3]
            session['name'] = row[2]
                return jsonify({'status': 0,'peopleID': row[0], 'name': row[2], 'position' : row[3],'college': row[5], 'admissionYear':row[6]})
        else:
            return jsonify({'status': 1})
    return jsonify({'status': 1})

@app.route('/api/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        passwd = request.form['password']
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
        return jsonify({'status': 1})
    # remove the username from the session if it's there
    session.pop('username', None)
    session.pop('position', None)
    return jsonify({'status': 0})

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    app.run(debug = True)