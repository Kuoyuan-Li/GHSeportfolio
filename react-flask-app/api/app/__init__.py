from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from datetime import timedelta
from flask_mail import Mail




app = Flask(__name__, static_folder = '../../build',static_url_path = '/')  # instantiate the app
app.config.from_object(Config)  # apply config from config.py file
# Sets the static file cache expiration time
app.send_file_max_age_default = timedelta(seconds=1)
db = SQLAlchemy(app)  # db using SQLAlchemy library
mail = Mail(app)
loginMngr = LoginManager(app)  # login feature
CORS(app)

from app import routes, models  #models define the structure of DB