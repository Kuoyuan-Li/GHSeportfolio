from os import environ

class Config(object):
    SECRET_KEY = environ.get('SECRET_KEY') or 'This-is-a-secret'
    ## Alibaba Cloud Server
    
    # user = 'eportfolio'
    # password = 'sW6anHhCnmmBZEdA'
    # database = 'eportfolio'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://eportfolio:sW6anHhCnmmBZEdA@47.115.90.152:3306/eportfolio'
    
    ## local Server
    
    user = 'root'
    password = '123456'
    database = 'eportfolio'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/eportfolio'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    MAIL_SERVER = "smtp.126.com"
    MAIL_PORT = '465'
    # MAIL_USE_TLS = True
    MAIL_USE_SSL = True
    MAIL_USERNAME = "GHSeportfolio@126.com"
    MAIL_PASSWORD = "SBRBTSATTHTVQBPT"  
    MAIL_DEFAULT_SENDER = "GHSeportfolio@126.com"