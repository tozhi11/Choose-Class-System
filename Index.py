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

@app.route('/api/SignUp' methods = ['GET','POST'])
def SignUp():
    if method == POST:
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
    order = 'SELECT * FROM PEOPLE WHERE ID IS '
    order = order + username
    conn = sqlite3.connect('choose-class-system.db')
    c = conn.cursor()
    print (order)
    cursor = c.execute(order)
    for row in cursor:
        if row[1] == passwd:
            session['username'] = username
            session['password'] = passwd
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