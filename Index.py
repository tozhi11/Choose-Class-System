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

@app.route('/api/Student/Status', methods=['GET', 'POST'])
def studentStatus():
    
    return True

@app.route('/api/Teacher/Status', methods = ['GET', 'POST'])
def teacherStatus():
    return True

@app.route('/api/Student/ChangeStatus',methods = ['GET', 'POST'])
def changeTeacherStatus():
    return True

@app.route('/api/Teacher/ChangeStatus',methods = ['GET', 'POST'])
def changeStudentStatus():
    return True

@app.route('/api/Student/ChooseClass',methods = ['GET', 'POST'])
def ChooseClass():
    return True

@app.route('/api/Student/WithdrawClass',methods = ['GET', 'POST'])
def WithdrawClass():
    return True

@app.route('/api/Student/ClassStatus',methods = ['GET', 'POST'])
def ClassStatus():
    return True

@app.route('/api/Teacher/AddClass', methods = ['GET', 'POST'])
def AddClass():
    return True

@app.route('/api/Teacher/DeleteClass', methods = ['GET', 'POST'])
def TeacherDeleteClass():
    return True

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

@app.route('/api/SignUp')
def SignUp():
    return True


# userInDataBase uses to check if the user in the datebase.
# if the username or password is wrong, return 1.
def userInDataBase(username,passwd):
    # session[username] = 'teacher'
    order = 'SELECT PASSWORD, POSITION, NAME FROM PEOPLE WHERE ID IS '
    order = order + username
    conn = sqlite3.connect('choose-class-system.db')
    c = conn.cursor()
    print (order)
    cursor = c.execute(order)
    for row in cursor:
        if row[0] == passwd:
            session['username'] = username
            session['password'] = passwd
            if row[1] == 'manager':
                return jsonify({'status': 0, 'position': 0, 'name':row[2]})
            if row[1] == 'teacher':
                return jsonify({'status': 0, 'position': 1, 'name':row[2]})
            if row[1] == 'student':
                return jsonify({'status': 0, 'position': 2, 'name':row[2]})
        else:
            return jsonify({'status': 1, 'position': -1, 'name':''})
    return jsonify({'status': 1, 'position': -1, 'name':''})

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