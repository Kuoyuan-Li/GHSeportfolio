import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'This-is-a-secret'
    user = 'root'
    password = 'root'
    database = 'eportfolio'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'mysql://%s:%s@127.0.0.1:3306/%s' % (user,password,database)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

