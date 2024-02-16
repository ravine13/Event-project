from flask import Blueprint, jsonify, make_response
from flask_restful import reqparse, Api, Resource
from models import db, Profile
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.dialects.postgresql import UUID
from flask_marshmallow import Marshmallow


profiles_bp = Blueprint('Profile', __name__)

api = Api(profiles_bp)
ma = Marshmallow(profiles_bp)


class ProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
profile_schema = ProfileSchema()


class Profiles(Resource):
    def get(self):
        profile =  Profile.query.all()
        profiles = profile_schema.dump(profile, many= True)

        response = make_response(
            jsonify(profiles), 200
        )
        return response
    

class ProfilesById(Resource):
    def get(self, id):
        id = UUID(id)
        profile = Profile.query.filter_by(id=id).first()

        if profile is None:
            response = make_response(
                jsonify({"Error":"Profile not Found"}),
                400
            )
            return response
        
        else:
            response = make_response(
                jsonify({
                    "id":profile.id,
                    "user_id": profile.user_id,
                    "first_name": profile.first_name,
                    "last_name": profile.last_name,
                    "profile_photo": profile.profile_photo
                }), 200
            )
            return response
        
    def delete(self,id):
        id = UUID(id)
        profile = Profile.query.filter_by(id=id).first()
        
        if profile is None:
            response = make_response(
                jsonify({"Error":"Profile not Found"}),
                400
            )
            return response
        else:
            db.session.delete(profile)
            db.session.commit()

    def patch(self, id):
        
        patch_args = reqparse.RequestParser(bundle_errors=True)
        patch_args.add_argument('first_name', type=str, help='Updated first name of the user')
        patch_args.add_argument('last_name', type=str, help='Updated last name of the user')
        patch_args.add_argument('profile_photo', type=str, help='Updated profile photo of the user')

        id = UUID(id)
        profile = Profile.query.filter_by(id=id).first()

        if profile is None:
            response = make_response(
                jsonify({"Error": "Profile not found"}),
                404
            )
            return response
        else:
            update_profile = self.patch_args.parse_args()
            if update_profile['first_name']:
                profile.first_name = update_profile['first_name']
            if update_profile['last_name']:
                profile.last_name = update_profile['last_name']
            if update_profile['profile_photo']:
                profile.profile_photo = update_profile['profile_photo']

            db.session.commit()

            res = make_response(
                jsonify({"message": "Profile updated"}),
                200
            )
            return res


api.add_resource(Profiles, '/profile')
api.add_resource(ProfilesById, '/profile/<string:id>')
