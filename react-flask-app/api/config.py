from os import environ

class Config(object):
    SECRET_KEY = environ.get('SECRET_KEY') or 'This-is-a-secret'

    user = 'root'
    password = 'root'
    database = 'eportfolio'

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@127.0.0.1:3306/eportfolio' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = "smtp.126.com"
    MAIL_PORT = '465'
    # MAIL_USE_TLS = True
    MAIL_USE_SSL = True
    MAIL_USERNAME = "yuchen99@126.com"
    MAIL_PASSWORD = "PMKOEEWVGKEWLLER"  
    MAIL_DEFAULT_SENDER = "yuchen99@126.com"