from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from uuid import uuid4, UUID
from models import Interests, db
from flask_jwt_extended import jwt_required
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field


interest_bp = Blueprint('interest', __name__)
api = Api(interest_bp)
ma = Marshmallow(interest_bp)

class InterestsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Interests
        include_fk = True  

    id = auto_field()
    event_id = auto_field()
    user_id = auto_field()

interest_schema = InterestsSchema()

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

    @jwt_required()    
    def post(self):
        data = request.get_json()

        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=str, required=True, help='User ID is required')
        parser.add_argument('event_id', type=str, required=True, help='Event ID is required')

        # args = parser.parse_args()

        new_interest = Interests(
            id = uuid4(),
            user_id = UUID(data.get('user_id')),
            event_id = UUID(data.get('event_id'))
            )
        
        db.session.add(new_interest)
        db.session.commit()

        response = make_response (
        jsonify(InterestsSchema().dump(new_interest)), 201

        )

        return response
    

api.add_resource(InterestResource, '/interests')