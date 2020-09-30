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


@app.route('/upload', methods=['POST'])
def upload():
    image = request.files['image']
    file = request.files['file']

    section_id = request.get_json()['section_id']
    title = request.get_json()['title']
    date = request.get_json()['time']
    text = request.get_json()['text']

    image_path = ''
    file_path = ''

    # get the basepath
    basepath = os.path.dirname(__file__)

    # no image or type of image is incorrect
    if image:
        image_path = os.path.join(basepath, 'static/images', secure_filename(image.imagename))
        # save image in path
        image.save(image_path)

    if file:
        file_path = os.path.join(basepath, 'static/files', secure_filename(file.filename))
        # save file in path
        file.save(file_path)

    module = Module(section_id = section_id, title = title, date = date, text = text, image = image_path, file = file_path)
    db.session.add(module)
    db.session.commit()

    return jsonify({"success": True})


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
    
    
    imagename = request.form['imagename']
    filename = request.form['filename']
    module_id = request.form['module_id']
    section_id = request.form['section_id']
    title = request.form['title']
    date = request.form['time']
    text = request.form['text']
    print("hello")
    image = request.files['image']
    file = request.files['file']
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
    module.file = file_path,
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
    return jsonify({"success": True})
    


@app.route('/addModule', methods=['POST'])
def add_module():
    section_id = request.get_json()['section_id']
    title = "new module"
    module = Module(section_id = section_id, title = title)
    db.session.add(module)
    db.session.commit()
    return jsonify({"success": True})
'''
if __name__ == "__main__":
    app.run(host = '0.0.0.0',debug = False,post = os.environ.get('PORT',80))
'''