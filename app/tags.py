from flask import Flask, Blueprint, jsonify, make_response, request
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4

tags_bp = Blueprint('tag', __name__)
app = Flask(__name__)
api = Api(tags_bp)
ma = Marshmallow(tags_bp)

post_args = reqparse.RequestParser(bundle_errors = True)
post_args.add_argument('payment_method', type=str, help='Please Add your payment method', required = True)
post_args.add_argument('billing_details', type=str, help='Please Add your payment details', required = True)
post_args.add_argument('user', type=str, help='Please Add User', required = True)

patch_args = reqparse.RequestParser(bundle_errors = True)
patch_args.add_argument('payment_method', type=object, help='Please Add your payment method')
patch_args.add_argument('billing_details', type=str, help='Please Add your payment details')
patch_args.add_argument('user', type=str, help='Please Add User')

class TagSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
        id = ma.auto_field()
        user_id = ma.auto_field()
        name = ma.auto_field()
        event_id = ma.auto_field()
        event = ma.Nested('EventSchema', only=['name'])
        user = ma.Nested('UserSchema', only=['email'])
        include_fk = True

tag_schema = TagSchema()

class TagResources(Resource):
    def get(self):
        tags = Tag.query.all()
        tag = tag_schema.dump(tags, many=True)
        response = make_response(
            jsonify(tag), 200
        )
        return response

    def post(self):
        data = request.get_json()
        new_tags = Tag(
            id = uuid4(),
            name = data.get('name'),
            event_id = UUID(data.get('event_id'))
            )
        
        db.session.add(new_tags)
        db.session.commit()

        response = make_response (
        jsonify(TagSchema().dump(new_tags)), 201

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
        id = UUID(id)
        tag = Tag.query.filter_by(id = id).first()
        
        if tag is None:
            return {"message": "Tag not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, help='Payment method is required')
        args = parser.parse_args()

        for key, value in args.items():
            if value is not None:
                setattr(tag, key, value)
        db.session.commit()

        return tag_schema.dump(tag), 200
    
    def delete(self, id):
        id = UUID(id)
        Tag.query.filter_by(id = id).delete()
        db.session.commit()
        return {'detail': 'Hash Tag Information has been deleted successfully'}
    
api.add_resource(TagResources, '/hash_tags')
api.add_resource(TagResourcesById, '/hash_tags/<string:id>')