# -*- coding: utf-8 -*-
import os
import sys
sys.path.append(os.path.abspath(".."))
from flask import request
from flask import render_template, jsonify, make_response, send_from_directory
from app import app, db, mail
from app.models import User, Section, Module
from werkzeug.utils import secure_filename

import datetime
import random
import uuid
from flask_mail import Message

db.create_all()
db.session.commit()
client = app.test_client()

# @app.route('/')
# def index():
#     return render_template('index.html')


@app.route('/login', methods=["POST"])
def login():
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
        return jsonify({"validity": True,
                        "user_id": user.user_id})


@app.route('/register', methods=['POST'])
def register():
    # get register information from frontend
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = request.get_json()['password']
    password2 = request.get_json()['password2']

    # The two passwords are different
    if password != password2:
        return jsonify({"validity": False,
                        "nonValidMessage": "Non consistent password"}
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

    about_me = Section(title="about me", user_id=user.user_id)
    contact_me = Section(title="contact me", user_id=user.user_id)
    education = Section(title="education background", user_id=user.user_id)
    internship = Section(title="internship experience", user_id=user.user_id)
    db.session.add(about_me)
    db.session.add(contact_me)
    db.session.add(education)
    db.session.add(internship)
    db.session.commit()

    text1 = "<p>family name :&nbsp;</p><p>first name :&nbsp;</p><p>gender :&nbsp;</p><p>date of birth :&nbsp;</p><p>self-introduction:</p>"
    text2 = "<p>phone number :&nbsp;</p><p>contact email :&nbsp;</p><p>linkedin :</p>",
    text3 = "put the detail of your education background here"
    text4 = "put the detail of your internship experience here"

    user_info = Module(title="basic information", text=text1, image_name="portrait.jpg", section_id=about_me.section_id)
    contact_info = Module(title="contact information", text=text2, section_id=contact_me.section_id)
    education_info = Module(title="education background 1", date="e.g. 1.1.2000-1.1.2020", text=text3, section_id=education.section_id)
    internship_info = Module(title="internship experience 1", date="e.g. 1.1.2000-1.1.2020", text=text4, section_id=internship.section_id)
    db.session.add(user_info)
    db.session.add(contact_info)
    db.session.add(education_info)
    db.session.add(internship_info)
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

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'JPG', 'PNG', 'bmp', 'gif'])


def allowed_image(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


def convert_to_json(table):
    data = [row.convert_to_dict() for row in table]
    json = {"list":data}
    return json


@app.route('/getSections', methods=['POST'])
def get_all_sections():
    user_id = request.get_json()['user_id']
    sections = Section.query.filter_by(user_id = user_id).all()
    sections_json = convert_to_json(sections)
    return sections_json


@app.route('/getModules', methods=['POST'])
def get_all_modules():
    section_id = request.get_json()['section_id']
    modules = Module.query.filter_by(section_id = section_id).all()
    modules_json = convert_to_json(modules)
    return modules_json


@app.route('/getRandomUsers', methods=['POST'])
def get_random_users():
    num_of_users = User.query.count()
    response = []
    if num_of_users > 10:
        random_numbers = random.sample(range(1, num_of_users+1), 10)
    else:
        random_numbers = range(1, num_of_users+1)
    for i in random_numbers:
        user = User.query.filter_by(user_id = i).first()
        json = user.to_json()
        json["num_of_sections"] = Section.query.filter_by(user_id = i).count()
        del json["email"]
        del json["password_hash"]
        response.append(json)
    return jsonify(response), 200


@app.route('/getUser', methods=['POST'])
def get_user():
    username = request.get_json()['username']
    user = User.query.filter_by(username=username).first()
    if user is not None:
        json = user.to_json()
        json["num_of_sections"] = Section.query.filter_by(user_id=user.user_id).count()
        del json["email"]
        del json["password_hash"]
        return jsonify({"validity": True,
                "user": [json]}
               )
    else:
        return jsonify({"validity": False,
                        "nonValidMessage": "The user does not exist"}
                       )


@app.route('/saveSection', methods=['POST'])
def save_section():
    section_id = request.get_json()['section_id']
    section_title = request.get_json()['title']
    section = Section.query.filter_by(section_id = section_id).first()
    section.title = section_title
    db.session.commit()
    return jsonify({"message": "success"})


def get_new_name(name):
    if name:
        file_type = os.path.splitext(name)[-1]
        now_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        random_num = random.randint(0, 100)
        if random_num <= 10:
            random_num = str(0) + str(random_num)
        image_new_name = str(now_time) + str(random_num) + str(file_type)
        return image_new_name
    return name


@app.route('/saveModule', methods=['POST'])
def save_module():
    if 'image' not in request.files:
        image = ''
    else:
        image = request.files['image']
    if 'file' not in request.files:
        file = ''
    else:
        file = request.files['file']
    if 'video' not in request.files:
        video = ''
    else:
        video = request.files['video']
    if 'audio' not in request.files:
        audio = ''
    else:
        audio = request.files['audio']

    image_name = request.form.get('image_name')
    file_name = request.form.get('file_name')
    video_name = request.form.get('video_name')
    audio_name = request.form.get('audio_name')
    module_id = request.form.get('module_id')
    section_id = request.form.get('section_id')
    title = request.form.get('title')
    date = request.form.get('time')
    text = request.form.get('text')

    module = Module.query.filter_by(module_id=module_id).first()

    # get the base path
    base_path = os.path.dirname(__file__)

    # have image in module and don't change it
    if image_name != '' and image == '':
        image_new_name = image_name
    else:
        image_new_name = get_new_name(image_name)
        if module.image_name:
            if module.image_name == "portrait.jpg":
                pass
            else:
                os.remove(os.path.join(base_path, 'static/images', module.image_name))
    if file_name != '' and file == '':
        file_new_name = file_name
    else:
        file_new_name = get_new_name(file_name)
        if module.file_name:
            os.remove(os.path.join(base_path, 'static/files', module.file_name))
    if video_name != '' and video == '':
        video_new_name = video_name
    else:
        video_new_name = get_new_name(video_name)

        if module.video_name:
            os.remove(os.path.join(base_path, 'static/videos', module.video_name))
    if audio_name != '' and audio == '':
        audio_new_name = audio_name
    else:
        audio_new_name = get_new_name(audio_name)
        if module.audio_name:
            os.remove(os.path.join(base_path, 'static/audios', module.audio_name))

    if image:
        image_path = os.path.join(base_path, 'static/images', secure_filename(image_new_name))
        # save image in path
        image.save(image_path)
    else:
        if image_name:
            image_path = module.image_path
        else:
            image_path = ''
    if file:
        file_path = os.path.join(base_path, 'static/files', secure_filename(file_new_name))
        # save file in path
        file.save(file_path)
    else:
        if file_name:
            file_path = module.file_path
        else:
            file_path = ''
    if video:
        video_path = os.path.join(base_path, 'static/videos', secure_filename(video_new_name))
        # save video in path
        video.save(video_path)
    else:
        if video_name:
            video_path = module.video_path
        else:
            video_path = ''
    if audio:
        audio_path = os.path.join(base_path, 'static/audios', secure_filename(audio_new_name))
        # save audio in path
        audio.save(audio_path)
    else:
        if audio_name:
            audio_path = module.audio_path
        else:
            audio_path = ''

    module.image_path = image_path
    module.image_name = image_new_name
    module.file_path = file_path
    module.file_name = file_new_name
    module.video_path = video_path
    module.video_name = video_new_name
    module.audio_path = audio_path
    module.audio_name = audio_new_name
    module.section_id = section_id
    module.title = title
    module.date = date
    module.text = text
    db.session.commit()
    return jsonify({"success": True})


@app.route('/deleteSection', methods=['POST'])
def delete_section():
    section_id = request.get_json()['section_id']
    section = Section.query.filter_by(section_id=section_id).first()
    modules = Module.query.filter_by(section_id=section_id).all()
    for module in modules:
        db.session.delete(module)
    db.session.delete(section)
    db.session.commit()
    return jsonify({"success": True})


@app.route('/deleteModule', methods=['POST'])
def delete_module():
    module_id = request.get_json()['module_id']
    module = Module.query.filter_by(module_id = module_id).first()
    db.session.delete(module)
    db.session.commit()
    return jsonify({"success": True})


@app.route('/addSection', methods=['POST'])
def add_section():
    user_id = request.get_json()['user_id']
    title = "new section"
    section = Section(title = title, user_id = user_id)
    db.session.add(section)
    db.session.commit()
    return jsonify({"success": True,
                    "section_id" : section.section_id})


@app.route('/addModule', methods=['POST'])
def add_module():
    section_id = request.get_json()['section_id']
    title = "new module"
    module = Module(section_id = section_id, title = title)
    db.session.add(module)
    db.session.commit()
    new_module = Module.query.filter_by(module_id = module.module_id).first()
    module_json = new_module.convert_to_dict()
    return jsonify({"success": True, "module": module_json})


@app.route('/resetPassword', methods=['POST'])
def reset_password():
    user_id = request.get_json()['user_id']
    password = request.get_json()['password']
    password2 = request.get_json()['password2']
    user = User.query.filter_by(user_id = user_id).first()

    # The two passwords are different
    if password != password2:
        return jsonify({"validity": False,
                        "nonValidMessage": "Non consistent password"}
                       )

    if user.check_password(password):
        return jsonify({"validity": False,
                        "nonValidMessage": "same password as previous"}
                       )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"validity": True,
                    "nonValidMessage": ""}
                   )


@app.route('/saveInformation', methods=['POST'])
def save_information():

    user_id = request.form.get('user_id')

    family_name = request.form.get('family_name')
    first_name = request.form.get('first_name')
    gender = request.form.get('gender')
    date_of_birth = request.form.get('date_of_birth')
    address = request.form.get('address')
    phone_number = request.form.get('phone_number')
    contact_email = request.form.get('contact_email')
    linkedin = request.form.get('linkedin')
    introduction = request.form.get('introduction')
    user_image = request.files['image_path']
    image_name = request.form.get('image_name')
    user = User.query.filter_by(user_id=user_id).first()

    image_path = ''

    # get the basepath
    base_path = os.path.dirname(__file__)

    # os.remove(os.path.join(base_path, module.image))
    # os.remove(os.path.join(base_path, module.file))

    if user_image:
        image_path = os.path.join(base_path, 'static/user_images', secure_filename(image_name))
        # save image in path
        user_image.save(image_path)

    user.image_path = image_path
    user.image_name = image_name
    user.family_name = family_name
    user.first_name = first_name
    user.gender = gender
    user.date_of_birth = date_of_birth
    user.address = address
    user.phone_number = phone_number
    user.contact_email = contact_email
    user.linkedin = linkedin
    user.introduction = introduction
    db.session.commit()

    return jsonify({"success": True})


@app.route('/showInformation', methods=['POST'])
def show_information():
    user_id = request.form.get('user_id')
    user = User.query.filter_by(user_id=user_id).first()
    response = user.convert_to_dict()
    return response


@app.route('/showImage/<string:image_name>', methods=['GET'])
def show_image(image_name):
    base_path = os.path.dirname(__file__)
    image_path = os.path.join(base_path, 'static/images', secure_filename(image_name))
    image_data = open(image_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'image/*'
    return response


@app.route('/showVideo/<string:video_name>', methods=['GET'])
def show_video(video_name):
    base_path = os.path.dirname(__file__)
    video_path = os.path.join(base_path, 'static/videos', secure_filename(video_name))
    video_data = open(video_path, "rb").read()
    response = make_response(video_data)
    response.headers['Content-Type'] = 'video/*'
    return response


@app.route('/showAudio/<string:audio_name>', methods=['GET'])
def show_audio(audio_name):
    base_path = os.path.dirname(__file__)
    audio_path = os.path.join(base_path, 'static/audios', secure_filename(audio_name))
    audio_data = open(audio_path, "rb").read()
    response = make_response(audio_data)
    response.headers['Content-Type'] = 'audio/*'
    return response


@app.route('/downloadImage/<string:image_name>', methods=['GET'])
def download_image(image_name):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(current_dir+"/static/images", image_name, as_attachment=True)


@app.route('/downloadFile/<string:file_name>', methods=['GET'])
def download_file(file_name):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(current_dir+"/static/files", file_name, as_attachment=True)


@app.route('/downloadVideo/<string:video_name>', methods=['GET'])
def download_video(video_name):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(current_dir+"/static/videos", video_name, as_attachment=True)


@app.route('/downloadAudio/<string:audio_name>', methods=['GET'])
def download_audio(audio_name):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return send_from_directory(current_dir+"/static/audios", audio_name, as_attachment=True)


@app.route('/emailCaptcha', methods=['POST'])
def email_captcha():

    email = request.get_json()['email']

    if not email:
        return jsonify({"validity": False,
                        "nonValidMessage": "No email address entered"}
                       )
    # get data of user with the email address from database
    user = User.query.filter_by(email=email).first()
    # The email address has been used or not invalid email? XXXX@ XXX.com
    if user is not None:
        return jsonify({"validity": False,
                        "nonValidMessage": "Please use another email address"}
                       )

    captcha = str(uuid.uuid1())[:6]
    message = Message('This is a email verification from eportfolio by GHS', recipients=[email],
                      body='your verification code is：%s' % captcha)
    try:
        mail.send(message)
    except:
        return jsonify({"validity": False,
                    "nonValidMessage": "Non-valid email address"})

    return jsonify({"validity": True,
                    "nonValidMessage": "The verification code is successfully sent...",
                    "captcha": captcha})


@app.route('/forgetPassword', methods=['POST'])
def forget_password():
    username = request.get_json()['username']
    password = request.get_json()['password']
    password2 = request.get_json()['password2']

    user = User.query.filter_by(username=username).first()

    # The two passwords are different
    if password != password2:
        return jsonify({"validity": False,
                        "nonValidMessage": "Non consistent password"}
                       )

    if user.check_password(password):
        return jsonify({"validity": False,
                        "nonValidMessage": "same password as previous"}
                       )

    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"validity": True,
                    "nonValidMessage": ""}
                   )


@app.route('/emailCaptcha2', methods=['POST'])
def email_captcha2():
    username = request.get_json()['username']
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"validity": False,
                        "nonValidMessage": "username not exist"}
                       )
    email = user.email
    captcha = str(uuid.uuid1())[:6]
    message = Message('This is a email verification from eportfolio by GHS', recipients=[email],
                      body='your verification code is：%s' % captcha)
    try:
        mail.send(message)
    except:
        return jsonify({"validity": False,
                        "nonValidMessage": "Non-valid email address"})
    return jsonify({"validity": True,
                    "nonValidMessage": "The verification code is successfully sent...",
                    "captcha": captcha})

