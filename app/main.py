from flask import Flask, Blueprint, jsonify, make_response
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

post_args = reqparse.RequestParser(bundle_errors = True)
post_args.add_argument('payment_method', type=str, help='Please Add your payment method', required = True)
post_args.add_argument('billing_details', type=str, help='Please Add your payment details', required = True)
post_args.add_argument('user', type=str, help='Please Add User', required = True)

patch_args = reqparse.RequestParser(bundle_errors = True)
patch_args.add_argument('payment_method', type=object, help='Please Add your payment method')
patch_args.add_argument('billing_details', type=str, help='Please Add your payment details')
patch_args.add_argument('user', type=str, help='Please Add User')

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
        id = ma.auto_field()
        user_id = ma.auto_field()
        name = ma.auto_field()
        event_id = ma.auto_field()
        event = ma.Nested('EventSchema', only=['name'])
        user = ma.Nested('UserSchema', only=['email'])

tag_schema = TagSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class Billing_InfoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Info
        id = ma.auto_field()
        payment_method = ma.auto_field()
        payment_details_id = ma.auto_field()
        billing_details = ma.Nested('Billing_DetailsSchema', only=['detail'])
        user_id = ma.auto_field()
        user = ma.Nested('UserSchema', only=['email'])

billing_info_schema = Billing_InfoSchema()

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

class Billing_Info_Resources(Resource):
    def get(self):
        billing = Billing_Info.query.all()
        bill = billing_info_schema.dump(billing, many=True)
        response = make_response(
            jsonify(bill), 200
        )
        return response

    def post(self):
        data = self.post_args.parse_args()
        new_billing_details = Billing_Details(id=uuid4(),**data)
        db.session.add(new_billing_details)
        db.session.commit()
        response = make_response(
            jsonify(billing_info_schema.dump(new_billing_details)), 201
        )
        return response

class Billing_Info_ById(Resource):
    def get(self, id):
        id = UUID(id)
        bill = Billing_Info.query.filter_by(id=id).first()

        if bill is None:
            response = make_response(
                jsonify({"error": "Bill not found"}),
                404
            )
            return response

        else:
            response = make_response(
                jsonify({
                    "bill": billing_info_schema.dump(bill)
                }),
                200
            )
            return response
    
    def patch(self, id):
        bill = Billing_Info.query.filter_by(id = id).first()
        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(bill, key, value)
        db.session.commit()
        return bill.to_dict()
    
    def delete(self, id):
        id = UUID(id)
        Billing_Info.query.filter_by(id = id).delete()
        db.session.commit()
        return {'detail': 'Billing Information has been deleted successfully'}
    
api.add_resource(Billing_Info_Resources, '/billing_info')
api.add_resource(Billing_Info_ById, '/billing_info/<string:id>')

class TagResources(Resource):
    def get(self):
        tags = Tag.query.all()
        tag = tag_schema.dump(tags, many=True)
        response = make_response(
            jsonify(tag), 200
        )
        return response

    def post(self):
        data = self.post_args.parse_args()
        new_tags = Tag(id=uuid4(), **data)
        db.session.add(new_tags)
        db.session.commit()
        response = make_response(
            jsonify(tag_schema.dump(new_tags)), 201
        )
        return response

class TagResourcesById(Resource):
    def get(self, id):
        id = UUID(id)
        tag = Tag.query.filter_by(id = id).first()

        if tag is None:
            response = make_response(
                jsonify({"error": "Hash tag not found"}),
                404
            )
            return response

        else:
            response = make_response(
                jsonify({
                    "tag": tag_schema.dump(tag)
                }),
                200
            )
            return response
    
    def patch(self, id):
        tag = Tag.query.filter_by(id = id).first()
        data = patch_args.parse_args()
        for key, value in data.items():
            if value is None:
                continue
            setattr(tag, key, value)
        db.session.commit()
        return tag.to_dict()
    
    def delete(self, id):
        id = UUID(id)
        Tag.query.filter_by(id = id).delete()
        db.session.commit()
        return {'detail': 'Hash Tag Information has been deleted successfully'}
    
api.add_resource(TagResources, '/hash_tags')
api.add_resource(TagResourcesById, '/hash_tags/<string:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)