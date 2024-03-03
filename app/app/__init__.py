from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from datetime import timedelta
from flask_cors import CORS
import os
from flask_mail import Mail

from models.models import db

from routes.tags import tags_bp
from routes.event import event_bp
from routes.review import review_bp
from routes.userroute import user_bp
from routes.booking import booking_bp
from routes.interests import interest_bp
from routes.photo_controller import photo_bp
from routes.Auth import jwt, bcrypt, auth_bp
from routes.billing_info import billing_info_bp
from routes.pricing_controller import pricing_bp
from routes.advert import advert_fees_bp
from routes.profiles import profiles_bp
from routes.billing_details import billing_details_bp
from routes.mpesa import mpesa_bp
from routes.reset_password import email_reset_bp


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = b"\x06F\x14\x91\xba\xdc\x9a\x96g'\xc7\xb0"
app.config["JWT_SECRET_KEY"] = b'\xb2_8\xcc\xfc\xec3n\xc5\x7f\x01-\xdal[\xc7'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.json.compact = False

bcrypt.init_app(app)
jwt.init_app(app)
db.init_app(app)
migrate = Migrate(app, db)

CORS(app, resources={r"*": {"origins": "*"}})

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)