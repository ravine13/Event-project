from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID


main_bp = Blueprint('main', __name__)
app = Flask(__name__)
api = Api(main_bp)
ma = Marshmallow(main_bp)


class PhotoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
photo_schema = PhotoSchema()

class ProfileSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
profile_schema = ProfileSchema()

class InterestsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Interests
interest_schema = InterestsSchema()

class TagSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tag
tag_schema = TagSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class Billing_InfoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Info
billing_info_schema = Billing_InfoSchema()

class Billing_DetailsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Billing_Details
billing_details_schema = Billing_DetailsSchema()

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
review_schema = ReviewSchema()

class PricingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pricing
pricing_schema = PricingSchema()

class Advert_FeesSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Advert_Fees
advert_fees_schema = Advert_FeesSchema()

class BookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
booking_schema = BookingSchema()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

def uuid_type(value):
    return UUID(value)

@main_bp.route('/')
def home():
    return 'welcome to Events projects'

class Events(Resource):
    def get(self):
        events = Event.query.all()
        event =event_schema.dump(events,many = True)
        
        response =  make_response(
            jsonify(event),
            200
        )
        return response
    
api.add_resource(Events, '/events')

class EventByID(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()

        if event is None:
            response = make_response(
                jsonify({"error": "event not found"}),
                404
            )
            return response

        else:
            bookings = booking_schema.dump(event.bookings, many=True)
            reviews = review_schema.dump(event.reviews, many=True)

            response = make_response(
                jsonify({
                    "event": event_schema.dump(event),
                    "bookings": bookings,
                    "reviews": reviews
                }),
                200
            )
            return response

    def delete(self, id):
        event = Event.query.filter_by(id=id).first()

        if event is None:
            response = make_response(
                jsonify({"error": "event not found"}),
                404
            )
            return response

        else:
            db.session.delete(event)
            db.session.commit()

            response = make_response(
                jsonify({"message": "event deleted"}),
                200
            )
            return response

    def patch(self, id):
        patch_args = reqparse.RequestParser(bundle_errors=True)
        patch_args.add_argument('name', type=str, help='Updated name of the Event')
        patch_args.add_argument('description', type=str, help='Updated description of the Event')
        patch_args.add_argument('start_date', type=str, help='Updated start date of the Event')
        patch_args.add_argument('start_time', type=str, help='Updated start time of the Event')
        patch_args.add_argument('end_date', type=str, help='Updated end date of the Event')
        patch_args.add_argument('end_time', type=str, help='Updated end time of the Event')
        patch_args.add_argument('duration', type=str, help='Updated duration of the Event')
        patch_args.add_argument('venue', type=str, help='Updated venue of the Event')
        patch_args.add_argument('photo_id', type=str, help='Updated photoID of the Event')

        event = Event.query.filter_by(id=id).first()

        if event is None:
            response = make_response(
                jsonify({"error": "event not found"}),
                404
            )
            return response

        else:
            update_event = patch_args.parse_args()
            for key, value in update_event.items():
                if value is not None:
                    if key == 'photo_id':
                        value = UUID(value)
                    setattr(event, key, value)
            db.session.commit()
            res = make_response(
                jsonify(event_schema.dump(event)),
                200
            )

            return res

api.add_resource(EventByID, '/events/<id>')


class new_Event(Resource):

    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('name', type=str, help='Name of the Event', required=True)
    post_args.add_argument('description', type=str, help='Description of the Event', required=True)
    post_args.add_argument('start_date', type=str, help='Start date of the Event', required=True)
    post_args.add_argument('start_time', type=str, help='Start time of the Event', required=True)
    post_args.add_argument('end_date', type=str, help='End date of the Event', required=True)
    post_args.add_argument('end_time', type=str, help='End time of the Event', required=True)
    post_args.add_argument('duration', type=str, help='Duration of the Event', required=True)
    post_args.add_argument('venue', type=str, help='Venue of the Event', required=True)
    post_args.add_argument('photo_id', type=uuid_type, help='PhotoID of the Event', required=True)


    def post(self):
        new_events = self.post_args.parse_args()
        new_event = Event(**new_events)
        db.session.add(new_event)
        db.session.commit()
        res = make_response(
            jsonify(event_schema.dump(new_event))
            ,201

            )
        
        return res

api.add_resource(new_Event, '/new_event')

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
    def get(self):
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


api.add_resource(ReviewByID, '/review/<id>')

class new_Review(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('user_id', type=uuid_type, help='ID of the User', required=True)
    post_args.add_argument('event_id', type=uuid_type, help='ID of the Event', required=True)
    post_args.add_argument('rating', type=int, help='Rating of the Review', required=True)
    post_args.add_argument('comment', type=str, help='Comment of the Review', required=True)

    def post(self):
        new_reviews = self.post_args.parse_args()
        new_review = Review(**new_reviews)
        db.session.add(new_review)
        db.session.commit()
        res = make_response(
            jsonify(review_schema.dump(new_review)),
            201
        )
        return res

api.add_resource(new_Review, '/new_review')

class Bookings(Resource):
    def get(self):
        booking = Booking.query.all()

        bookings = booking_schema.dump(booking,many = True)

        res = make_response(
            jsonify(bookings),
            200
        )

        return res
    
api.add_resource(Bookings, '/bookings')

class BookingByID(Resource):
    def get(self, id):
        booking = Booking.query.filter_by(id=id).first()

        if booking is None:
            res = make_response(
                jsonify({"Error": "Booking not found"}),
                400
            )
            return res

        else:
            pricing = pricing_schema.dump(booking.pricing)
            event = event_schema.dump(booking.event)
            user = user_schema.dump(booking.user)

            res = make_response(
                jsonify({
                    "booking": booking_schema.dump(booking),
                    "pricing": pricing,
                    "event": event,
                    "user": user
                }),
                200
            )
            return res

    def delete(self, id):
        booking = Booking.query.filter_by(id=id).first()

        if booking is None:
            response = make_response(
                jsonify({"error": "booking not found"}),
                404
            )
            return response

        else:
            db.session.delete(booking)
            db.session.commit()

            response = make_response(
                jsonify({"message": "booking deleted"}),
                200
            )
            return response

    def patch(self, id):
        patch_args = reqparse.RequestParser(bundle_errors=True)
        patch_args.add_argument('event_id', type=uuid_type, help='Updated Event ID of the Booking')
        patch_args.add_argument('user_id', type=uuid_type, help='Updated User ID of the Booking')
        patch_args.add_argument('pricing_id', type=uuid_type, help='Updated Pricing ID of the Booking')

        booking = Booking.query.filter_by(id=id).first()

        if booking is None:
            response = make_response(
                jsonify({"error": "booking not found"}),
                404
            )
            return response

        else:
            update_booking = self.patch_args.parse_args()
            for key, value in update_booking.items():
                if value is not None:
                    setattr(booking, key, value)
            db.session.commit()

            res = make_response(
                jsonify(booking_schema.dump(booking)), 
                200
            )
            return res


api.add_resource(BookingByID, '/bookings/<id>')

class new_Booking(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('event_id', type=uuid_type, help='ID of the Event', required=True)
    post_args.add_argument('user_id', type=uuid_type, help='ID of the User', required=True)
    post_args.add_argument('pricing_id', type=uuid_type, help='ID of the Pricing', required=True)

    def post(self):
        new_bookings = self.post_args.parse_args()
        new_booking = Booking(**new_bookings)
        db.session.add(new_booking)
        db.session.commit()
        res = make_response(
            jsonify(booking_schema.dump(new_booking)),
            201
        )
        
        return res

api.add_resource(new_Booking, '/new_booking')


if __name__ == '__main__':
    app.run(port=5555, debug=True)