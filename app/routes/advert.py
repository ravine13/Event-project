from flask import Blueprint, jsonify, make_response
from flask_restful import reqparse, Api, Resource
from app.models import db, Advert_Fees
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
import uuid
from flask_marshmallow import Marshmallow



advert_fees_bp = Blueprint('Advert_Fees', __name__)
api = Api(advert_fees_bp)
ma = Marshmallow(advert_fees_bp)


class Advert_FeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
advert_fees_schema = Advert_FeesSchema()

class Advert_Fees_Resource(Resource):
    
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('user_id', type=str, help='ID of the User')
    post_args.add_argument('amount', type=float, help='Amount of the Advert Fee', required=True)
    post_args.add_argument('event_id', type=str, help='ID of the Event')
    def get(self):
        advert = Advert_Fees.query.all()
        adverts = advert_fees_schema.dump(advert, many=True)

        res = make_response(
            jsonify(adverts),
            200
        )

        return res
    
    
    def post(self):
        new_advert_fees = self.post_args.parse_args()
        new_advert_fees['id'] = uuid.uuid4()
        new_advert_fees['user_id'] = uuid.uuid4()
        new_advert_fees['event_id'] = uuid.uuid4()
        new_advert_fee = Advert_Fees(**new_advert_fees)
        db.session.add(new_advert_fee)
        db.session.commit()
        res = make_response(
            jsonify(advert_fees_schema.dump(new_advert_fee)),
            201
        )
        
        return res
        


class Advert_FeesByID(Resource):

    patch_args = reqparse.RequestParser(bundle_errors=True)
    patch_args.add_argument('user_id', type=str)
    patch_args.add_argument('amount', type=str)
    patch_args.add_argument('event_id', type=str)
    def get(self, id):
        id = uuid.UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            res = make_response(
                jsonify({"Error": "Advert Fee not found"}),
                404
            )
            return res
        
        else:
            res = make_response(
                jsonify({
                    "id": advert_fee.id,
                    "user_id": advert_fee.user_id,
                    "amount": advert_fee.amount,
                    "event_id": advert_fee.event_id,
                    "created_at": advert_fee.created_at
                }),
                200
            )
            return res
  
    def delete(self, id):
        id = uuid.UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            response = make_response(
                jsonify({"error": "Advert Fee not found"}),
                404
            )
            return response

        else:
            db.session.delete(advert_fee)
            db.session.commit()

            response = make_response(
                jsonify({"message": "Advert Fee deleted"}),
                200
            )
            return response
        
    def patch(self, id):
        id = uuid.UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            response = make_response(
                jsonify({"Error": "Advert Fee not found"}),
                404
            )
            return response

        update_advert_fees = self.patch_args.parse_args()
        if update_advert_fees['user_id']:
            advert_fee.user_id = uuid.UUID(update_advert_fees['user_id'])
        if update_advert_fees['amount']:
            advert_fee.amount = float(update_advert_fees['amount'])
        if update_advert_fees['event_id']:
            advert_fee.event_id = uuid.UUID(update_advert_fees['event_id'])

        db.session.commit()

        response = make_response(
            jsonify({"message": "Advert Fee updated"}),
            200
            )
        return response


    
api.add_resource(Advert_Fees_Resource, '/advert_fees')
api.add_resource(Advert_FeesByID, '/advert_fees/<string:id>')
