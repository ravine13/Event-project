from flask import Blueprint, request, make_response, jsonify, abort
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required
from models import Photo
from models import db


class PhotoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
photo_schema = PhotoSchema()


photo_bp = Blueprint('photo_bp', __name__)
api = Api(photo_bp)

class Photo_Rsrc(Resource):
    def get(self):
        photos = Photo.query.all()
        photos_list = photo_schema.dump(photos, many=True)
        
        response = make_response(jsonify(photos_list), 200)
        return response
    
    # @jwt_required()
    def post(self):
        data = request.get_json()
        if data is not None:            
            new_photo = Photo(url = data.get('url'))
            db.session.add(new_photo)
            db.session.commit()
            return(make_response(jsonify(photo_schema.dump(new_photo)), 201))
    
class Photo_By_ID(Resource):
    def get(self, id):
        photo = Photo.query.filter_by(id = id).first()
        
        try:
            if photo is not None:
                event = photo_schema.dump(photo.events, many=True)
                response = make_response(jsonify({
                    'photo': photo_schema.dump(photo),
                    'event': event,
                }), 200)
                return response
            
            else:
                abort(404, details='Not Found!')
        except Exception as e:
            return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
            }, 500
            
    # @jwt_required()
    def patch(self, id):
        data = request.get_json()
        photo = Photo.query.filter_by(id = id).first()
        
        try:
            if photo is not None and data is not None:
                for attr in data:
                    setattr(photo, attr, data[attr])
                db.session.commit()

                response = make_response(jsonify(photo_schema.dump(photo)), 200)
                return response
            
            else:
                return(make_response(jsonify({'message': 'Action Aborted! Invalid Data!'}), 404))
            
        except Exception as e:
            return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
            }, 500
            
    # @jwt_required() 
    def delete(self, id):
        photo = Photo.query.filter_by(id = id).first()
        if photo is not None:
            db.session.delete(photo)
            db.session.commit()
        else:
            abort(404, details='Not Found!')

api.add_resource(Photo_Rsrc, '/photos')
api.add_resource(Photo_By_ID, '/photos/<id>')