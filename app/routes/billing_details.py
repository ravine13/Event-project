from flask import Flask, Blueprint, jsonify, make_response, request
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.models import Billing_Details, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4

billing_details_bp = Blueprint('billing_details', __name__)
api = Api(billing_details_bp)
ma = Marshmallow(billing_details_bp)

post_args = reqparse.RequestParser(bundle_errors = True)
post_args.add_argument('detail', type=str, help='Please Add your billing detail', required = True)
post_args.add_argument('name', type=str, help='Please Add your name', required = True)

patch_args = reqparse.RequestParser(bundle_errors = True)
patch_args.add_argument('detail', type=str, help='Please Add your billing detail')
patch_args.add_argument('name', type=str, help='Please Add your name')

class Billing_DetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Details
        id = ma.auto_field()
        detail = ma.auto_field()
        name = ma.auto_field()

billing_details_schema = Billing_DetailsSchema()

class Billing_Details_Resources(Resource):
    def get(self):
        billing_details = Billing_Details.query.all()
        if not billing_details:
            res = make_response(
                jsonify({"message": "No billing details found"}), 
                404
                )
            return res
        billing_details_schema = Billing_DetailsSchema(many=True)
        billing_details_data = billing_details_schema.dump(billing_details)

        res = make_response(
            jsonify(billing_details_data), 200)

        return res
api.add_resource(Billing_Details_Resources, '/billing_details')

class Billing_Details_ById(Resource):
    def get(self, id):
        id = UUID(id)
        bill_detail = Billing_Details.query.filter_by(id=id).first()

        if bill_detail is None:
            response = make_response(
                jsonify({"error": "Billing detail not found"}),
                404
            )
            return response

        else:
            response = make_response(
                jsonify({
                    "bill_detail": billing_details_schema.dump(bill_detail)
                }),
                200
            )
            return response
    
    def patch(self, id):
        id = UUID(id)
        bill_detail = Billing_Details.query.filter_by(id = id).first()
        
        if bill_detail is None:
            return {"message": "Billing_Details not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('detail', type=str, help='Billing detail is required')
        parser.add_argument('name', type=str, help='Name is required')
        data = parser.parse_args()

        for key, value in data.items():
            if value is not None:
                setattr(bill_detail, key, value)
        db.session.commit()

        return billing_details_schema.dump(bill_detail), 200
    
    def delete(self, id):
        id = UUID(id)
        Billing_Details.query.filter_by(id = id).delete()
        db.session.commit()
        return {'detail': 'Billing detail has been deleted successfully'}
    

api.add_resource(Billing_Details_ById, '/billing_details/<string:id>')

class new_Billing_Details(Resource):
    post_args = reqparse.RequestParser(bundle_errors = True)
    post_args.add_argument('detail', type=str, help='Please Add your billing detail', required = True)
    post_args.add_argument('name', type=str, help='Please Add your name', required = True)

    def post(self):
        new_billing_detail = self.post_args.parse_args()
        detail = new_billing_detail['detail']
        name = new_billing_detail['name']

        new_billing_detail = Billing_Details(id=uuid4(), detail=detail, name=name)
        db.session.add(new_billing_detail)
        db.session.commit()

        return {"message": "Billing detail successfully created"}, 201


    
api.add_resource(new_Billing_Details, '/new_billing_details')
