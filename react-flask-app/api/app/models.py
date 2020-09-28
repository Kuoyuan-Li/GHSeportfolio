from app import db, loginMngr
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

@loginMngr.user_loader
def load_user(id):
    return User.query.get(int(id))

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True) #fields
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    family_name = db.Column(db.String(64), nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    gender = db.Column(db.String(25), nullable=False)
    date_of_birth = db.Column(db.Time)
    address = db.Column(db.String(200))
    studentID = db.Column(db.Integer, nullable=False, unique=True)
    phone_number = db.Column(db.String(45))
    linkedin = db.Column(db.String(200))

    sections = db.relationship('Section', backref='sections', lazy='dynamic')

    # set password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # verify password when logging in
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Section(db.Model):

    section_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    title = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    modules = db.relationship('Module', backref='modules', lazy='dynamic')

    def get_section_id(self):
        return self.id

    def convert_to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result



class Module(db.Model):

    module_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Time)
    text = db.Column(db.String(500))
    image = db.Column(db.String(300))

    video = db.Column(db.String(300))
    audio = db.Column(db.String(300))

    file = db.Column(db.String(300))
    section_id = db.Column(db.Integer, db.ForeignKey('section.section_id'))

    def convert_to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result

    '''
        Position = db.Column(db.String(45))
        StartTime = db.Column(db.Time)
        EndTime = db.Column(db.Time)
    '''

