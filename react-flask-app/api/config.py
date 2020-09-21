from os import environ

class Config(object):
    SECRET_KEY = environ.get('SECRET_KEY') or 'This-is-a-secret'

    user = 'root'
    password = 'root'
    database = 'eportfolio'

    SQLALCHEMY_DATABASE_URI = 'mysql://%s:%s@localhost:3306/%s' % (user, password, database)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
