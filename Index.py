# 

from flask import Flask, session, redirect, url_for, escape, request, render_template
app = Flask(__name__)

def inDataBase(username,passwd):
    session['username'] = username
    session['position'] = 'teacher'
    return True

@app.route('/')
def index():
    if 'username' in session:
        return 'Logged in as %s %s' % (escape(session['username']), escape(session['position']))
    return 'You are not logged in'

@app.route('/api/Student',['GET', 'POST'])
def studentInit():
    return render_template('student.html', ID=session['username'])

@app.route('/api/Teacher',['GET', 'POST'])
def teacherInit():
    return render_template('student.html', ID=session['username'])

@app.route('/api/Manager',['GET', 'POST'])
def teacherInit():
    return render_template('student.html', ID=session['username'])

@app.route('/api/Student/ChooseClass',methon=['GET', 'POST'])
def ChooseClass():
    return True

@app.route('/api/Student/WithdrawClass',methon=['GET', 'POST'])
def WithdrawClass():
    return True

@app.route('/api/Student/ClassStatus',methon=['GET', 'POST'])
def ClassStatus():
    return True

@app.route('/api/Teacher/AddClass', methods=['GET', 'POST'])
def AddClass():
    return True

@app.route('/api/Teacher/DeleteClass', methods=['GET', 'POST'])
def DeleteClass():
    return True

@app.route('/api/Teacher/UpdataClass', methods=['GET', 'POST'])
def UpdataClass():
    return True

@app.route('/api/Teacher/GetInformation', methods=['GET', 'POST'])
def UpdataClass():
    return True

@app.route('/api/Manager/SetPower', methods=['GET', 'POST'])
def SetPower():
    return True

@app.route('/api/Manager/UpdataClass', methods=['GET', 'POST'])
def UpdataClass():
    return True

@app.route('/api/SignUp')
def SignUp():
    return True

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        passwd = request.form['password']
        if inDataBase(username,passwd):
            if session['position'] == 'student':
                return redirect(url_for('studentInit'))
            if session['position'] == 'teacher':
                return redirect(url_for('teacherInit'))
            if session['manager'] == 'manager':
                return redirect(url_for('managerInit'))
            return redirect(url_for('index'))
    return '''
        <form action="" method="post">
            <p><input type=text name=username>
            <p><input type=text name=password>
            <p><input type=submit value=Login>
        </form>
    '''

@app.route('/api/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    app.run(debug = True)