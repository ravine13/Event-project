from flask import Flask, Blueprint, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema,auto_field
from models import User, Event, Advert_Fees,  db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4
from datetime import datetime

advert_fees_bp = Blueprint('advert_fees', __name__)
api = Api(advert_fees_bp)
ma = Marshmallow(advert_fees_bp)

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class AdvertFeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
        include_fk = True
advert_fees_schema = AdvertFeesSchema()

def uuid_type(value):
    return UUID(value)

class AdvertFees(Resource):
    def get(self):
        advert_fees = Advert_Fees.query.all()
        fees = advert_fees_schema.dump(advert_fees, many=True)
        response = make_response(jsonify(fees), 200)
        return response

api.add_resource(AdvertFees, '/advert_fees')

class AdvertFeeByID(Resource):
    def get(self, id):
        id = UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            response = make_response(jsonify({"error": "Advert fee not found"}), 404)
            return response

        else:
            user = user_schema.dump(advert_fee.user)
            event = event_schema.dump(advert_fee.event)

            response = make_response(
                jsonify({
                    "advert_fee": advert_fees_schema.dump(advert_fee),
                    "user": user,
                    "event": event
                }),
                200
            )
            return response

    def delete(self, id):
        id = UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            response = make_response(jsonify({"error": "Advert fee not found"}), 404)
            return response

        else:
            db.session.delete(advert_fee)
            db.session.commit()

            response = make_response(jsonify({"message": "Advert fee deleted"}), 200)
            return response

    def patch(self, id):
        patch_args = reqparse.RequestParser(bundle_errors=True)
        patch_args.add_argument('user_id', type=uuid_type, help='Updated User ID of the Advert Fee')
        patch_args.add_argument('amount', type=float, help='Updated Amount of the Advert Fee')
        patch_args.add_argument('event_id', type=uuid_type, help='Updated Event ID of the Advert Fee')

        id = UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            response = make_response(jsonify({"error": "Advert fee not found"}), 404)
            return response

        else:
            update_advert_fee = patch_args.parse_args()
            for key, value in update_advert_fee.items():
                if value is not None:
                    setattr(advert_fee, key, value)
            db.session.commit()

            res = make_response(jsonify(advert_fees_schema.dump(advert_fee)), 200)
            return res

api.add_resource(AdvertFeeByID, '/advert_fees/<string:id>')

class new_AdvertFee(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('user_id', type=uuid_type, help='ID of the User', required=True)
    post_args.add_argument('amount', type=float, help='Amount of the Advert Fee', required=True)
    post_args.add_argument('event_id', type=uuid_type, help='ID of the Event', required=True)

    def post(self):
        new_advert_fees = self.post_args.parse_args()
        new_advert_fee = Advert_Fees(id=uuid4(), **new_advert_fees)
        db.session.add(new_advert_fee)
        db.session.commit()
        res = make_response(jsonify(advert_fees_schema.dump(new_advert_fee)), 201)
        return res

api.add_resource(new_AdvertFee, '/new_advert_fee')
