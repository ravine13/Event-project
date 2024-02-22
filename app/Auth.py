from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager,
                                 create_access_token, 
                                 jwt_required,
                                  current_user,
                                  get_jwt
)
from flask_restful import Resource, Api, reqparse , abort


from models import User, db,TokenBlocklist
from uuid import uuid4

auth_bp = Blueprint('auth',__name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)

register_args = reqparse.RequestParser()
register_args.add_argument('email',type=str, required=True)
register_args.add_argument('password',type=str, required=True)
register_args.add_argument('confirm-password',type=str, required=True)


login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, required=True)
login_args.add_argument('password', type=str, required=True)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

class UserLogin(Resource):
    
    @jwt_required()
    def get(self):
        return current_user.to_dict()

    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(email= data.email).first()
        if not user:
            return abort(404, detail="User does not exist")
        if not bcrypt.check_password_hash(user.password, data.password):
            return abort(403, detail="Wrong password")

        token = create_access_token(identity=user.id)
        return token
    
api.add_resource(UserLogin,'/login')

class UserRegister(Resource):

     def post(self):
        data = register_args.parse_args()
        if data['password'] != data['confirm-password']:
            return abort(422,detail='Passwords do not match')
        new_user = User(id=uuid4(), email=data.email, password=bcrypt.generate_password_hash(data.password))
        db.session.add(new_user)
        db.session.commit()
        return {'detail':f'User {data.email} has been created successfully'}


api.add_resource(UserRegister,'/register')

class UserLogout(Resource):

    @jwt_required()
    def get(self):
        token = get_jwt()
        blocked_token = TokenBlocklist(jti=token['jti'], created_at=datetime.now(timezone.utc))
        db.session.add(blocked_token)
        db.session.commit()
        return {"detail":"token logging out"}
    
api.add_resource(UserLogout,'/logout')

