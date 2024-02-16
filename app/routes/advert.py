from flask import Blueprint, jsonify, make_response
from flask_restful import reqparse, Api, Resource
from models import db, Advert_Fees
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID
from flask_marshmallow import Marshmallow



advert_fees_bp = Blueprint('Advert_Fees', __name__)
api = Api(advert_fees_bp)
ma = Marshmallow(advert_fees_bp)


class Advert_FeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
advert_fees_schema = Advert_FeesSchema()

class Advert_FeesResource(Resource):
    def get(self):
        advert = Advert_Fees.query.all()
        adverts = advert_fees_schema.dump(advert, many=True)

        res = make_response(
            jsonify(adverts),
            200
        )

        return res
        
api.add_resource(Advert_FeesResource, '/advert_fees')

class Advert_FeesByID(Resource):
    def get(self, id):
        id = UUID(id)
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
        id = UUID(id)
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
        id = UUID(id)
        advert_fee = Advert_Fees.query.filter_by(id=id).first()

        if advert_fee is None:
            res = make_response(
                jsonify({"Error": "Advert Fee not found"}),
                404
            )
            return res

        else:
            update_advert_fees = self.patch_args.parse_args()
            if update_advert_fees['user_id']:
                advert_fee.user_id = update_advert_fees['user_id']
            if update_advert_fees['amount']:
                advert_fee.amount = update_advert_fees['amount']
            if update_advert_fees['event_id']:
                advert_fee.event_id = update_advert_fees['event_id']

            db.session.commit()

            res = make_response(
                jsonify({"message": "Advert Fee updated"}),
                200
            )
            return res


class new_Advert_Fees(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('user_id', type=UUID, help='ID of the User', required=True)
    post_args.add_argument('amount', type=float, help='Amount of the Advert Fee', required=True)
    post_args.add_argument('event_id', type=UUID, help='ID of the Event', required=True)

    def post(self):
        new_advert_fees = self.post_args.parse_args()
        new_advert_fee = Advert_Fees(id=UUID(), **new_advert_fees)
        db.session.add(new_advert_fee)
        db.session.commit()
        res = make_response(
            jsonify(advert_fees_schema.dump(new_advert_fee)),
            201
        )
        
        return res

api.add_resource(Advert_FeesByID, '/advert_fees/<string:id>')
api.add_resource(new_Advert_Fees, '/new_advert_fees')