from flask import Blueprint, make_response, jsonify, request, abort
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required
from models import Pricing
from models import db

class PricingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pricing
pricing_schema = PricingSchema()

pricing_bp = Blueprint('pricing_bp', __name__)
api = Api(pricing_bp)

class Pricing_Rsrc(Resource):
    def get(self):
        pricing_list = Pricing.query.all()
        pricingList = pricing_schema.dump(pricing_list, many = True)

        return(make_response(jsonify(pricingList), 200))
    
    # @jwt_required()
    def post(self):
        post_args = reqparse.RequestParser()
        post_args.add_argument('name', type=str, help='Pricing Name', required=True)
        post_args.add_argument('amount', type=float, help='Amount', required=True)
        post_args.add_argument('event_id', type=str, help='Event ID')
        
        data = post_args.parse_args()
        new_pricing = Pricing(**data)        
        db.session.add(new_pricing)
        db.session.commit()
        return(make_response(jsonify(pricing_schema.dump(new_pricing)), 201))
        

class Pricing_By_ID(Resource):
    def get(self, id):
        pricing = Pricing.query.filter_by(id = id).first()
        return(make_response(jsonify(pricing_schema.dump(pricing))))
    
    # @jwt_required()
    def patch(self, id):
        pricing = Pricing.query.filter_by(id = id).first()
        patch_args = reqparse.RequestParser()
        patch_args.add_argument('name', type=str, help='Pricing Name')
        patch_args.add_argument('amount', type=float, help='Amount')
        patch_args.add_argument('event_id', type=str, help='Event ID')
        
        if pricing is not None:
            data = patch_args.parse_args()
            for attr in data:
                setattr(pricing, attr, data[attr])
            return(make_response(jsonify(pricing_schema.dump(pricing)), 200))
        else:
            return(make_response(jsonify({'message': 'Pricing not found'}), 404))
        
    # @jwt_required()
    def delete(self, id):
        pricing = Pricing.query.filter_by(id=id).first()
        if pricing is not None:
            db.session.delete(pricing)
            db.session.commit()
        else:
            abort(404, details='Not Found!')

api.add_resource(Pricing_By_ID, '/pricing_list/<id>')
api.add_resource(Pricing_Rsrc, '/pricing_list')