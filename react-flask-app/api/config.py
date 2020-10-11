from os import environ

class Config(object):
    SECRET_KEY = environ.get('SECRET_KEY') or 'This-is-a-secret'

    user = 'root'
    password = 'root'
    database = 'eportfolio'

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@127.0.0.1:3306/eportfolio' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = "smtp.qq.com"
    MAIL_PORT = '587'
    MAIL_USE_TLS = True
    # MAIL_USE_SSL
    MAIL_USERNAME = "1414518976@qq.com"
    MAIL_PASSWORD = "*****"  
    MAIL_DEFAULT_SENDER = "1414518976@qq.com"