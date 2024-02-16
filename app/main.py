from flask import Flask, Blueprint, jsonify, make_response, request
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4

main_bp = Blueprint('main', __name__)
app = Flask(__name__)
api = Api(main_bp)
ma = Marshmallow(main_bp)

class PhotoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
photo_schema = PhotoSchema()

class ProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
profile_schema = ProfileSchema()

class InterestsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Interests
interest_schema = InterestsSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class Billing_DetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Details
        id = ma.auto_field()
        detail = ma.auto_field()
        name = ma.auto_field()

billing_details_schema = Billing_DetailsSchema()

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
review_schema = ReviewSchema()

class PricingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pricing
pricing_schema = PricingSchema()

class Advert_FeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
advert_fees_schema = Advert_FeesSchema()

class BookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
booking_schema = BookingSchema()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

@main_bp.route('/')
def home():
    return 'welcome to Events projects'

if __name__ == '__main__':
    app.run(port=5555, debug=True)