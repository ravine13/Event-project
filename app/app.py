from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
import os
from app.models import db
from app.main import main_bp
from app.tags import tags_bp
from app.event import event_bp
from app.review import review_bp
from app.userroute import user_bp
from app.booking import booking_bp
from app.interests import interest_bp
from app.photo_controller import photo_bp
from app.Auth import jwt, bcrypt, auth_bp
from app.billing_info import billing_info_bp
from app.pricing_controller import pricing_bp
from app.routes.advert import advert_fees_bp
from app.routes.profiles import profiles_bp



def create_app():
    app = Flask(__name__)    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    app.config['SECRET_KEY'] = b"\x06F\x14\x91\xba\xdc\x9a\x96g'\xc7\xb0"
    
    main_bp = Blueprint('main', __name__)
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    ma = Marshmallow(app)

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
 
    
    return app

app = create_app()
