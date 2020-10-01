from flask import request
from flask import render_template, flash, redirect, url_for, jsonify
from app import app, db
from app.models import User, Section, Module
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from werkzeug.utils import secure_filename
import os
import time

db.create_all()
db.session.commit()

@app.route('/')
def index():
    return render_template('index.html')


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


@app.route('/sectionIDs', methods=['POST'])
def get_all_sections():
    user_id = request.get_json()['user_id']
    sections = Section.query.filter_by(user_id = user_id).all()
    sections_json = convert_to_json(sections)
    return sections_json


@app.route('/getSection', methods=['POST'])
def get_all_modules():
    section_id = request.get_json()['section_id']
    modules = Module.query.filter_by(section_id = section_id).all()
    modules_json = convert_to_json(modules)
    return modules_json


@app.route('/saveSection', methods=['POST'])
def save_section():
    section_id = request.get_json()['section_id']
    section_title = request.get_json()['title']
    section = Section.query.filter_by(section_id = section_id).first()
    section.title = section_title
    db.session.commit()
    return jsonify({"message": "success"})


@app.route('/saveModule', methods=['POST'])
def save_module():
    
    image = request.files['image']
    file = request.files['file']
    
    imagename = request.form.get('imagename')
    filename = request.form.get('filename')
    module_id = request.form.get('module_id')
    section_id = request.form.get('section_id')
    title = request.form.get('title')
    date = request.form.get('time')
    text = request.form.get('text')
    
    module = Module.query.filter_by(module_id = module_id).first()

    image_path = ''
    file_path = ''

    # get the basepath
    basepath = os.path.dirname(__file__)

    #os.remove(os.path.join(basepath, module.image))
    #os.remove(os.path.join(basepath, module.file))


    if image:
        image_path = os.path.join(basepath, 'static/images', secure_filename(imagename))
    # save image in path
        image.save(image_path)

    if file:
        file_path = os.path.join(basepath, 'static/files', secure_filename(filename))
    # save file in path
        file.save(file_path)

    module.image = image_path
    module.file = file_path
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
    user_image = request.files['user_image']
    imagename = request.form.get('imagename')
    user = User.query.filter_by(user_id=user_id).first()

    image_path = ''

    # get the basepath
    basepath = os.path.dirname(__file__)

    # os.remove(os.path.join(basepath, module.image))
    # os.remove(os.path.join(basepath, module.file))

    if user_image:
        image_path = os.path.join(basepath, 'static/user_images', secure_filename(imagename))
        # save image in path
        user_image.save(image_path)

    user.user_image = image_path
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