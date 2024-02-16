from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
import os

from Auth import jwt, bcrypt, auth_bp
from models import db
from event import event_bp
from review import review_bp
from booking import booking_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    app.register_blueprint(auth_bp)
    app.register_blueprint(event_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(booking_bp)
    CORS(app, resources={r"*": {"origins": "*"}})

    return app

app = create_app()
