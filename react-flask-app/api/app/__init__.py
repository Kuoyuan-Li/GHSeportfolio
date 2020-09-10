from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)  # instantiate the app
app.config.from_object(Config)  # apply config from config.py file
app.config['JWT_SECRET_KEY'] = 'secret'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)  # db using SQLAlchemy library
migrate = Migrate(app, db)
loginMngr = LoginManager(app)  # login feature
loginMngr.login_view = 'login'

CORS(app)
from app import routes, models  #models define the structure of DB