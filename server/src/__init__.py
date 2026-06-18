from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from sqlalchemy import inspect, text
from src.config import Config
from flask_cors import CORS
import logging

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config_class=Config):
    logging.getLogger('werkzeug').setLevel(logging.INFO)
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)
    
    db.init_app(app)
    bcrypt.init_app(app)


    with app.app_context():
        db.create_all()

    from src.home.routes import main
    from src.input.routes import input_bp

    app.register_blueprint(main)
    app.register_blueprint(input_bp)

    return app
