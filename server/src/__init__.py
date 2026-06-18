import os
from pathlib import Path
import json
from logging.config import dictConfig

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from src.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config_class=Config):
    current_dir = Path(__file__).parent
    log_config_path = current_dir / "logging_config.json"

    Path('logs').mkdir(exist_ok=True)

    with open(log_config_path, 'r') as file:
        config = json.load(file)
        dictConfig(config)

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
