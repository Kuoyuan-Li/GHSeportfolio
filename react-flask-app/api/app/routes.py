from flask import request
from flask import render_template, flash, redirect, url_for, jsonify
from app import app, db
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from werkzeug.utils import secure_filename
import os
import time

db.create_all()
db.session.commit()
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=["POST"])
def login():
    # login functionality
    # if already logged in, jump to profile
    if current_user.is_authenticated:
        return jsonify({"validity": True,
                        "nonValidMessage": ""}
                       )

    username = request.get_json()['username']
    password = request.get_json()['password']

    # Select user with his username in the database, and set to user
    user = User.query.filter_by(username=username).first()
    # if the username is not found in db or password incorrect, flash prompt and redirect to login
    if (user is None) or (not (user.check_password(password))):
        return jsonify({"validity": False,
                        "nonValidMessage": "Invalid username or password"}
                       )
    else:
        # login_user set the current_user (variable) to the current user(real people)
        login_user(user)
        return jsonify({"validity": True,
                        "nonValidMessage": ""})


@app.route('/register', methods=['POST'])
def register():

    # if logged in, then jump to profile
    if current_user.is_authenticated:
        return jsonify( {"validity": True, 
                    "nonValidMessage" : ""}
                    )

    # get register information from frontend
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = request.get_json()['password']
    password2 = request.get_json()['password2']

    # The two passwords are different
    if password != password2:
            return jsonify( {"validity": False, 
                    "nonValidMessage" : "Non consistent password"}
                    )

    # get data of user with the username from database
    user = User.query.filter_by(username=username).first()
    # The user name has been used
    if user is not None:
        return jsonify({"validity": False,
                        "nonValidMessage": "Please use another username"}
                       )
    # get data of user with the email address from database
    user = User.query.filter_by(email=email).first()
    # The email address has been used or not invalid email? XXXX@ XXX.com
    if user is not None:
        return jsonify({"validity": False,
                        "nonValidMessage": "Please use another email address"}
                       )

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"validity": True,
                    "nonValidMessage": ""}
                   )

'''
@app.route('/profile', methods=['GET','POST'])
def profile():
    if current_user.is_authenticated:
        username = current_user.username
        return jsonify({"currentUser": username})
    else:
        return jsonify({"currentUser": ""})


@app.route('/logout', methods=['GET','POST'])
def logout():
    logout_user()
    return jsonify({"success": True})
'''

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'JPG', 'PNG', 'bmp','gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    # no image or type of image is incorrect
    if not (file and allowed_file(file.filename)):
        return jsonify({"success": False,
                        "message": "Please check the type of image uploaded, only PNG, PNG, JPG, JPG, BMP"}
                       )
    # get the basepath
    basepath = os.path.dirname(__file__)
    # add basepath and path together get the path that we store the image
    upload_path = os.path.join(basepath, 'static/images', secure_filename(file.filename))
    # save image in path
    file.save(upload_path)
    return jsonify({"success": True,
                    "message": " "}
                   )
