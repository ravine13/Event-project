from flask import Flask, Blueprint, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from datetime import datetime
from uuid import uuid4, UUID
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
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
class InterestsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Interests
        include_fk = True  

    id = auto_field()
    event_id = auto_field()
    user_id = auto_field()

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
            return UserSchema().dump(user)
        else:
            users = User.query.all()
            return jsonify(UserSchema(many=True).dump(users))
        
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('confirmed', type=bool, required=False)
        parser.add_argument('role', type=int, required=False)
        args = parser.parse_args()

        role = int(args['role']) if args['role'] is not None else None

        new_user = User(
            id=uuid4(), 
            email=args['email'], 
            password=args['password'], 
            confirmed=args.get('confirmed', False), 
            role= role,  
            created_at=datetime.utcnow())
        db.session.add(new_user)
        db.session.commit()

        # serialized_user = UserSchema().dump(new_user)
        
        response = make_response (
        jsonify(UserSchema().dump(new_user)), 201

        )

        return response


class InterestResource(Resource):
    def get(self):
        interests = Interests.query.all()
        if not interests:
            res = make_response(
                jsonify({"message": "No interests found"}), 
                404
                )
            return res
        interests_data = interest_schema.dump(interests, many=True)

        res = make_response(
            jsonify(interests_data), 200)

        return res

        
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=str, required=True, help='User ID is required')
        parser.add_argument('event_id', type=str, required=True, help='Event ID is required')

        args = parser.parse_args()

        new_interest = Interests(
            id = uuid4,
            user_id = args['user_id'],
            event_id = args['event_id']
            )
        
        db.session.add(new_interest)
        db.session.commit()

        response = make_response (
        jsonify(InterestsSchema().dump(new_interest)), 201

        )

        return response


api.add_resource(UserResource, '/users')
api.add_resource(InterestResource, '/interests')


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5555, debug=True)
