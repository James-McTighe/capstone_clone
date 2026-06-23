import os
from pathlib import Path
import json
import logging
from logging.config import dictConfig

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from src.config import Config
from src.log_utils import ColoredFormatter

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    app.logger.handlers.clear()
    app.logger.setLevel(logging.INFO)
    app.logger.propagate = False

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(ColoredFormatter())
    app.logger.addHandler(console_handler)
    logging.getLogger("werkzeug").setLevel(logging.INFO)
    logging.getLogger("werkzeug").addHandler(console_handler)

    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        db.create_all()

    from src.home.routes import main
    from src.input.routes import input_bp

    app.register_blueprint(main)
    app.register_blueprint(input_bp)

    return app
