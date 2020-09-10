from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):  # login form include 4 fields: name, password, remember me and submit
    username = StringField('Username',validators = [DataRequired()])  #first argument: label
    password = PasswordField('Password',validators = [DataRequired()])
    remember_me = BooleanField('Remember Me',validators=None)
    submit = SubmitField('Sign In',validators=None)

