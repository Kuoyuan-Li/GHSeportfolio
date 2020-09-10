from flask import request
from flask import render_template, flash, redirect, url_for, jsonify
from app import app, db, bcrypt, jwt
#from app.login import LoginForm
#from app.registration import RegistrationForm
from flask_bcrypt import Bcrypt
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=["POST"])
def login():
    # login functionality
    # if already logged in, jump to profile
    #if current_user.is_authenticated:
        #redirect to profile
        #return redirect(url_for('profile',username=current_user.username))

    username = request.get_json()['username']
    password = request.get_json()['password']
    result = ""
    if username and password:
        #Select user with his username in the databse, and set to user
        #the selected user password set to rv

        #user = User.query.filter_by(username=username).first()
        #if the username is not found in db or password incorrect, flash prompt and redirect to login
        if (user is None) or (not (bcrypt.check_password_hash(rv['password'],password))):
            result = jsonify({"Error":"Invalid username or password"})
        else:
            # login_user set the current_user (variable) to the current user(real people)
            login_user(user)

            # if user jump to the login page from other pages, redirect to original page
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = url_for('profile', username=current_user.username)
            result = jsonify({"redirect":next_page})
            #return redirect(next_page)
    else:
        result = jsonify({"Error":"Please enter username and password"})

    ''' 
    # use Loginform class to instantiate a form
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        # if the username in the form is not found in db or password incorrect, flash prompt and redirect to login
        if (user is None) or (not user.check_password(form.password.data)):
            flash('Invalid username or password')
            return redirect(url_for('login'))

        # login_user set the current_user (variable) to the current user(real people)
        login_user(user, remember=form.remember_me.data)
        # if user jump to the login page from other pages, redirect to original page
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('profile',username=current_user.username)
        return redirect(next_page)
    '''
    return result


'''
@app.route('/logout')
@login_required
def logout():
    # logout_user set te current_user to none
    logout_user()
    return redirect(url_for('login'))
'''

@app.route('/register', methods=['POST'])
def register():
    # if logged in, then jump to profile
    if current_user.is_authenticated:
        return jsonify({"redirect": url_for('profile', username=current_user.username)})
        #return redirect(url_for('profile',username=current_user.username))

    username = request.get_json()['username']
    email= request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #password = request.get_json()['password']
    #password2 = request.get_json()['password2']

    if username and email and password :
        #if password != password2:
            #return jsonify({"Error":"Inconsistent password"})

        user = User.query.filter_by(username=username).first()
        if user is not None:
            return jsonify({"Error":"Please use a different username."})

        user = User.query.filter_by(email=email).first()
        if user is not None:
            return jsonify({"Error": "Please use a different email address."})

        #insert the user into user db, with username, email and password




        #user = User(username=username, email=email)
        #user.set_password(password)
        #db.session.add(user)
        #db.session.commit()

        return jsonify ({"result": username + ', you successfully registered'})
    else:
        return jsonify({"Error": "Please fill out all information."})


    '''
    # use RegistrationForm to instantiate a form
    form = RegistrationForm()
    if form.validate_on_submit():
        # if information is valid, add to db
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    '''



@app.route('/profile/<username>')
@login_required
def profile(username):
    if current_user.username != username:
        flash('Invalid profile direction, please visit your own profile')
        return redirect(url_for('profile',username = current_user.username))
    user = User.query.filter_by(username=username).first_or_404()

    return render_template('profile.html', user = user)


@app.route('/eportfolio_edit/<username>')
@login_required
def eportfolio_edit(username):
    return render_template('profile.html')

