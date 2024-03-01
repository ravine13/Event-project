from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
import os
from flask_mail import Mail
from models import db
from tags import tags_bp
from event import event_bp
from review import review_bp
from userroute import user_bp
from booking import booking_bp
from interests import interest_bp
from photo_controller import photo_bp
from Auth import jwt, bcrypt, auth_bp
from billing_info import billing_info_bp
from pricing_controller import pricing_bp
from routes.advert import advert_fees_bp
from routes.profiles import profiles_bp
from billing_details import billing_details_bp
from mpesa import mpesa_bp

from reset_password import email_reset_bp

def create_app():
    app = Flask(__name__)    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    app.config['SECRET_KEY'] = b"\x06F\x14\x91\xba\xdc\x9a\x96g'\xc7\xb0"
    CORS(app, resources={r"*": {"origins": "*"}})
    main_bp = Blueprint('main', __name__)
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    # ma = Marshmallow(app)

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
    app.register_blueprint(mpesa_bp)
    app.register_blueprint(billing_details_bp)
    app.register_blueprint(email_reset_bp)
    
 
    
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)
