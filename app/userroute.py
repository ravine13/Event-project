from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from datetime import datetime
from uuid import uuid4, UUID
from app.models import User, db
from flask_jwt_extended import jwt_required
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


user_bp = Blueprint('user', __name__)
api = Api(user_bp)
ma = Marshmallow(user_bp)

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'message': 'User not found'}, 404
            return UserSchema().dump(user)
        else:
            users = User.query.all()
            return jsonify(UserSchema(many=True).dump(users))
        
    # @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('confirmed', type=str, required=False)
        parser.add_argument('role', type=str, required=False)
        args = parser.parse_args()

        role = int(args['role']) if args['role'] is not None else None

        new_user = User(
            id=uuid4(), 
            email=args['email'], 
            password=args['password'], 
            confirmed=args.get('confirmed', False), 
            role= role,  
            created_at=datetime.utcnow())
        db.session.add(new_user)
        db.session.commit()
        
        response = make_response (
        jsonify(UserSchema().dump(new_user)), 201

        )

        return response
    
    @jwt_required()
    def patch(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('confirmed', type=bool, required=False)
        parser.add_argument('role', type=int, required=False)
        args = parser.parse_args()

        role = int(args['role']) if args['role'] is not None else None

        new_user = User(
            id=uuid4(), 
            email=args['email'], 
            password=args['password'], 
            confirmed=args.get('confirmed', False), 
            role= role,  
            created_at=datetime.utcnow())
        db.session.add(new_user)
        db.session.commit()

        serialized_user = UserSchema().dump(new_user)

        response = make_response(jsonify(serialized_user), 201)

        return response

api.add_resource(UserResource, '/users')



