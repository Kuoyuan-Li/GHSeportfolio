from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS


app = Flask(__name__)  # instantiate the app
app.config.from_object(Config)  # apply config from config.py file
db = SQLAlchemy(app)  # db using SQLAlchemy library
loginMngr = LoginManager(app)  # login feature

CORS(app)
from app import routes, models  #models define the structure of DB