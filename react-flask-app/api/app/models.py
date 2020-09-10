from app import db
from app import loginMngr
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


@loginMngr.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    # user db model
    id = db.Column(db.Integer, primary_key=True) #fields
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    # set password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # verify password when logging in
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Post(db.Model):
    # idk why its here, just part of the tutorial, will be deleted
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)