from flask import Blueprint, make_response, jsonify, request, abort
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from flask_restful import Api, Resource, reqparse
from uuid import UUID, uuid4
from flask_jwt_extended import jwt_required
from models import User, db
from datetime import datetime

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True

user_schema = UserSchema()

user_bp = Blueprint('user_bp', __name__)
api = Api(user_bp)

class Users(Resource):
    def get(self):
        users = User.query.all()
        user = user_schema.dump(users, many = True)

        res = make_response(
            jsonify(user), 
            200
            )
        return res
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        id = UUID(id)
        user = User.query.filter_by(id=id).first()
        if not user:
            return {'message': 'User not found'}, 404
        res = make_response(jsonify(user_schema.dump(user)),200)
        return res

    def patch(self, id):
        id = UUID(id)
        user = User.query.filter_by(id=id).first()
        patch_args = reqparse.RequestParser()
        patch_args.add_argument('email', type=str, help='Email')
        patch_args.add_argument('password', type=str, help='Password')
        patch_args.add_argument('confirmed', type=bool)
        patch_args.add_argument('role', type=int)
        
        if user is not None:
            data = patch_args.parse_args()
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.commit()
            response = make_response(jsonify(user_schema.dump(user)), 200)
            return response
        else:
            res = make_response(
                jsonify({'message': 'User not found'}), 404)
            return res

api.add_resource(UserByID, '/users/<string:id>')


class new_User(Resource):
      def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email is required')
        parser.add_argument('password', type=str, required=True, help='Password is required')
        parser.add_argument('confirmed', type=bool, required=False)
        parser.add_argument('role', type=int, required=False)
        args = parser.parse_args()

        new_user = User(
             id=str(uuid4()),
            email=args['email'], 
            password=args['password'], 
            confirmed=args.get('confirmed', False), 
            role=args.get('role', 0),  
            created_at=datetime.utcnow())
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(user_schema.dump(new_user)), 201)
      
api.add_resource(new_User, '/new_user')
