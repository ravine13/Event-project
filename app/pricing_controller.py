from flask import Blueprint, make_response, jsonify, request, abort
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from marshmallow.fields import Nested
from flask_restful import Api, Resource, reqparse
from uuid import UUID
from uuid import uuid4
from flask_jwt_extended import jwt_required
from app.models import Pricing, Event
from app.models import db

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        fields = ("name",) 
event_schema = EventSchema()

class PricingSchema(SQLAlchemyAutoSchema):
    event = Nested(EventSchema)  

    class Meta:
        model = Pricing
        include_relationships = True
        load_instance = True

pricing_schema = PricingSchema()

pricing_bp = Blueprint('pricing_bp', __name__)
api = Api(pricing_bp)

class Pricing_Rsrc(Resource):
    def get(self):
        pricing_list = Pricing.query.all()
        pricingList = pricing_schema.dump(pricing_list, many = True)

        res = make_response(
            jsonify(pricingList), 
            200
            )
        return res

api.add_resource(Pricing_Rsrc, '/pricing_list')
    
class Pricing_By_ID(Resource):
    def get(self, id):
        id = UUID(id)
        pricing = Pricing.query.filter_by(id = id).first()

        if pricing  is None:
            response = make_response(
                jsonify({"error": "price not found"}),
                404
            )
            return response
        else:
            event = event_schema.dump(pricing.event)
            pricing = pricing_schema.dump(pricing)

            res = make_response(
                jsonify({
                    "event": event,
                    "pricing": pricing
                }),
                200
            )
            return res
        
    # @jwt_required()
    def patch(self, id):
        id = UUID(id)
        pricing = Pricing.query.filter_by(id = id).first()
        patch_args = reqparse.RequestParser()
        patch_args.add_argument('name', type=str, help='Pricing Name')
        patch_args.add_argument('amount', type=float, help='Amount')
        patch_args.add_argument('event_id', type=UUID, help='Event ID')
        
        if pricing is not None:
            data = patch_args.parse_args()
            for attr in data:
                setattr(pricing, attr, data[attr])
                db.session.commit()
            response = make_response(jsonify(pricing_schema.dump(pricing)), 200)
            return response
        else:
            res = make_response(
                jsonify({'message': 'Pricing not found'}), 404)
            
            return res
        
    # @jwt_required()
    def delete(self, id):
        id = UUID(id)
        pricing = Pricing.query.filter_by(id=id).first()
        if pricing is not None:
            db.session.delete(pricing)
            db.session.commit()
            
            response = make_response(
                jsonify(
                    {'message': 'Successfully Deleted'}
                    ))
            return response
        else:
            abort(404, details='Not Found!')

api.add_resource(Pricing_By_ID, '/pricing_list/<string:id>')

class new_Price(Resource):
    # @jwt_required()
    def post(self):
        post_args = reqparse.RequestParser()
        post_args.add_argument('name', type=str, help='Pricing Name', required=True)
        post_args.add_argument('amount', type=float, help='Amount', required=True)
        post_args.add_argument('event_id', type=UUID, help='Event ID', required=True)

        data = post_args.parse_args()
        new_pricing = Pricing(id = uuid4(),  
                      name = data.get('name'),
                      amount = data.get('amount'),
                      event_id = data.get('event_id')
                    )

        db.session.add(new_pricing)
        db.session.commit()
        response = make_response(
            jsonify(
                pricing_schema.dump(new_pricing)), 
                201
                )
        return response

api.add_resource(new_Price, '/new_price')