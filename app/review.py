from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema,auto_field
from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4
from datetime import datetime


review_bp = Blueprint('review', __name__)
api = Api(review_bp)
ma = Marshmallow(review_bp)

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
review_schema = ReviewSchema()


def uuid_type(value):
    return UUID(value)


class Reviews(Resource):
    def get(self):
        review = Review.query.all()
        reviews = review_schema.dump(review,many=True)

        res = make_response(
            jsonify(reviews),
            200
        )

        return res
api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):
    def get(self,id):
        id = UUID(id)
        review = Review.query.filter_by(id=id).first()

        if review is None:
            response = make_response(
                jsonify({"error": "review not found"}),
                404
            )
            return response
        
        else:
            user = User.query.filter_by(id=id).first()
            event = Event.query.filter_by(id=id).first()

            res = make_response(
                jsonify({
                    "review":review_schema.dump(review),
                    "user":user,
                    "event":event
                }),
                200
            )

            return res
    def delete(self, id):
        id = UUID(id)
        review = Review.query.filter_by(id=id).first()
    
        if review is None:
            response = make_response(
                jsonify({"error": "review not found"}),
                404
            )
            return response

        else:
            db.session.delete(review)
            db.session.commit()

            response = make_response(
                jsonify({"message": "review deleted"}),
                200
            )
            return response
        
    def patch(self,id):

        patch_args = reqparse.RequestParser(bundle_errors=True)
        patch_args.add_argument('rating', type=int, help='Updated rating of the Review')
        patch_args.add_argument('comment', type=str, help='Updated comment of the Review')

        id = UUID(id)
        review = Review.query.filter_by(id=id).first()

        if review is None:
            response = make_response(
                jsonify({"error": "review not found"}),
                404
            )
            return response

        else:
            update_review = patch_args.parse_args()
            for key, value in update_review.items():
                if value is not None:
                    setattr(review, key, value)
            db.session.commit()

            res = make_response(
                jsonify(review_schema.dump(review)), 
                200

                )
            return res


api.add_resource(ReviewByID, '/reviews/<string:id>')

class new_Review(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('user_id', type=uuid_type, help='ID of the User', required=True)
    post_args.add_argument('event_id', type=uuid_type, help='ID of the Event', required=True)
    post_args.add_argument('rating', type=int, help='Rating of the Review', required=True)
    post_args.add_argument('comment', type=str, help='Comment of the Review', required=True)

    def post(self):
        new_reviews = self.post_args.parse_args()
        new_review = Review(id=uuid4(),**new_reviews)
        db.session.add(new_review)
        db.session.commit()
        res = make_response(
            jsonify(review_schema.dump(new_review)),
            201
        )
        return res

api.add_resource(new_Review, '/new_review')
