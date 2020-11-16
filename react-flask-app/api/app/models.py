from app import db, loginMngr
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, nullable=False, unique=True, autoincrement=True) #fields
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    sections = db.relationship('Section', backref='sections', lazy='dynamic')

    # set password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # verify password when logging in
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def to_json(self):
        json = self.__dict__
        if "_sa_instance_state" in json:
            del json["_sa_instance_state"]
        return json


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
    title = db.Column(db.String(100))
    date = db.Column(db.String(50))
    text = db.Column(db.String(500))
    image_path = db.Column(db.String(300))
    image_name = db.Column(db.String(100))
    file_path = db.Column(db.String(300))
    file_name = db.Column(db.String(100))
    video_path = db.Column(db.String(300))
    video_name = db.Column(db.String(100))
    audio_path = db.Column(db.String(300))
    audio_name = db.Column(db.String(100))
    section_id = db.Column(db.Integer, db.ForeignKey('section.section_id'))

    def convert_to_dict(self):
        result = {}
        for key in self.__mapper__.c.keys():
            if getattr(self, key) is not None:
                result[key] = str(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result


