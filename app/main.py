from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from uuid import UUID
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


class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'message': 'User not found'}, 404
            return user.jsonify()
        else:
            users = User.query.all()
            return [user.jsonify() for user in users]
        
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('confirmed', type=bool, required=False)
        parser.add_argument('role', type=str, required=False)
        args = parser.parse_args()

        user_id = str(UUID.uuid4())

        new_user = User(id=user_id, email=args['email'], password=args['password'], confirmed=args.get('confirmed', False), role=args.get('role', None))
        db.session.add(new_user)
        db.session.commit()
        
        return new_user.jsonify(), 201
    

    class InterestResource(Resource):
        def get(self, interest_id=None):
            if interest_id:
                interest = Interests.query.get(interest_id)
                if not interest:
                    return {'message': 'Interest not found'}, 404
                return interest.jsonify()
            else:
                interests = Interests.query.all()
                return [interest.jsonify() for interest in interests]

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5555, debug=True)