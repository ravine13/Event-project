from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required

main_bp = Blueprint('main', __name__)
app = Flask(__name__)
api = Api(main_bp)
ma = Marshmallow(main_bp)

@main_bp.route('/')
def home():
    return 'welcome to Events projects '

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

class ProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
profile_schema = ProfileSchema()

class InterestsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Interests
interest_schema = InterestsSchema()

class TagSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
tag_schema = TagSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class Billing_InfoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Info
billing_info_schema = Billing_InfoSchema()

class Billing_DetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Details
billing_details_schema = Billing_DetailsSchema()

class Advert_FeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
advert_fees_schema = Advert_FeesSchema()

class PricingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pricing
pricing_schema = PricingSchema()

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
review_schema = ReviewSchema()

class BookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
booking_schema = BookingSchema()

class PhotoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
photo_schema = PhotoSchema()