from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from sqlalchemy import inspect, text
from src.config import Config
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    
    db.init_app(app)
    bcrypt.init_app(app)

    # from src import models

    with app.app_context():
        db.create_all()

    from src.home.routes import main

    app.register_blueprint(main)

    return app
