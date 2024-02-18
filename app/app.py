from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
from main import main_bp
from userroute import user_bp
from interests import interest_bp
from billing_info import billing_info_bp
from tags import tags_bp
from pricing_controller import pricing_bp
from photo_controller import photo_bp
from main import main_bp
from routes.advert import advert_fees_bp
from routes.profiles import profiles_bp
import os


from Auth import jwt, bcrypt, auth_bp
from models import db
from event import event_bp
from review import review_bp
from booking import booking_bp

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    app.config['SECRET_KEY'] = b"\x06F\x14\x91\xba\xdc\x9a\x96g'\xc7\xb0"
    
    main_bp = Blueprint('main', __name__)
    db.init_app(app)
    # jwt.init_app(app)
    # bcrypt.init_app(app)
    migrate = Migrate(app, db)
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(event_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(interest_bp)
    app.register_blueprint(billing_info_bp)
    app.register_blueprint(profiles_bp)
    app.register_blueprint(advert_fees_bp)
    app.register_blueprint(tags_bp)
    app.register_blueprint(pricing_bp)
    app.register_blueprint(photo_bp)
    CORS(app, resources={r"*": {"origins": "*"}})
 
    ma = Marshmallow(app)
    return app

app = create_app()
