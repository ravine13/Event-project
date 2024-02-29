from flask import Blueprint, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import secrets
from models import User, db, TokenBlocklist
from flask_restful import Resource, Api, reqparse , abort
from uuid import UUID

bcrypt = Bcrypt()

email_reset_bp = Blueprint('email_reset_bp', __name__)
api = Api(email_reset_bp)

reset_tokens = {}

reset_password_parser = reqparse.RequestParser()
reset_password_parser.add_argument('email', type=str, required=True, help="Email is required")

class ResetPassword(Resource):
    def post(self):
        # data = reset_password_parser.parse_args()
        data = request.get_json()
        email = data['email'].lower()
        # email = data.get('email')

        user = User.query.filter_by(email=email).first()

        if not user:
            return {"message": "User not found"}, 404

        token = secrets.token_urlsafe(32)

        expires_delta = timedelta(hours=24) 
        expiration_date = datetime.utcnow() + expires_delta

        reset_tokens[user.id] = {"token": token, "expiration_date": expiration_date}

        jwt_token = create_access_token(identity=str(user.id), expires_delta=expires_delta)

        return {"message": "Reset token generated successfully", "token": jwt_token}, 200

api.add_resource(ResetPassword, '/reset_password/request')

class VerifyPasswordReset(Resource):
    @jwt_required()
    def post(self):
        
        current_user_id = UUID(get_jwt_identity())

        user = User.query.filter_by(id=current_user_id).first()

        if not user:
            return {"message": "User not found"}, 404

        data = request.get_json()
        new_password = data.get('new_password')

        if not new_password:
            return {"message": "New password cannot be empty"}, 400
        user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

        if user.id in reset_tokens:
            del reset_tokens[user.id]

        db.session.commit()

        return {"message": "Password reset successfully"}, 200

api.add_resource(VerifyPasswordReset, '/reset_password/verify')
