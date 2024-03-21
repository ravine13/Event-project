from flask import Flask, Blueprint, jsonify, make_response, request
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4

billing_info_bp = Blueprint('billing_info', __name__)
app = Flask(__name__)
api = Api(billing_info_bp)
ma = Marshmallow(billing_info_bp)

post_args = reqparse.RequestParser(bundle_errors = True)
post_args.add_argument('payment_method', type=str, help='Please Add your payment method', required = True)
post_args.add_argument('billing_details', type=str, help='Please Add your payment details', required = True)
post_args.add_argument('user', type=str, help='Please Add User', required = True)

patch_args = reqparse.RequestParser(bundle_errors = True)
patch_args.add_argument('payment_method', type=object, help='Please Add your payment method')
patch_args.add_argument('billing_details', type=str, help='Please Add your payment details')
patch_args.add_argument('user', type=str, help='Please Add User')

class Billing_InfoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Info
        id = ma.auto_field()
        payment_method = ma.auto_field()
        payment_details_id = ma.auto_field()
        billing_details = ma.Nested('Billing_DetailsSchema')
        user_id = ma.auto_field()
        user = ma.Nested('UserSchema')
        include_fk = True

billing_info_schema = Billing_InfoSchema()


class Billing_DetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Details
        id = ma.auto_field()
        detail = ma.auto_field()
        name = ma.auto_field()

billing_details_schema = Billing_DetailsSchema()

class Billing_Info_Resources(Resource):
    
    def get(self):
        billing = Billing_Info.query.all()
        if not billing:
            res = make_response(
                jsonify({"message": "No billing found"}), 
                404
                )
            return res
        billing_info_schema = Billing_InfoSchema(many=True)
        billing_data = billing_info_schema.dump(billing)

        res = make_response(
            jsonify(billing_data), 200)

        return res
api.add_resource(Billing_Info_Resources, '/billing_info')

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
        id = UUID(id)
        bill = Billing_Info.query.filter_by(id = id).first()
        
        if bill is None:
            return {"message": "Billing_Info not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('payment_method', type=str, help='Payment method is required')
        parser.add_argument('payment_details_id', type=str, help='Payment details ID is required')
        parser.add_argument('user_id', type=str, help='User ID is required')
        data = parser.parse_args()

        for key, value in data.items():
            if value is not None:
                setattr(bill, key, value)
        db.session.commit()

        return billing_info_schema.dump(bill), 200
    
    def delete(self, id):
        id = UUID(id)
        Billing_Info.query.filter_by(id = id).delete()
        db.session.commit()
        return {'detail': 'Billing Information has been deleted successfully'}
    

api.add_resource(Billing_Info_ById, '/billing_info/<string:id>')

class new_Billing_info(Resource):
    post_args = reqparse.RequestParser(bundle_errors = True)
    post_args.add_argument('payment_method', type=str, help='Please Add your payment method', required = True)
    post_args.add_argument('billing_details', type=str, help='Please Add your payment details', required = True)
    post_args.add_argument('user', type=str, help='Please Add User', required = True)

    def post(self):
        new_billing_info = self.post_args.parse_args()
        payment_method = new_billing_info['payment_method']
        billing_details_id = UUID(new_billing_info['billing_details'])
        user_id = UUID(new_billing_info['user'])

        billing_details = Billing_Details.query.get(billing_details_id)
        user = User.query.get(user_id)

        if billing_details is None or user is None:
            return {"message": "Billing_Details or User not found"}, 404

        new_billing_info = Billing_Info(id=uuid4(), payment_method=payment_method, billing_details=billing_details, user=user)
        db.session.add(new_billing_info)
        db.session.commit()

        return {"message": "Billing info successfully created"}, 201


    
api.add_resource(new_Billing_info, '/billing_info')