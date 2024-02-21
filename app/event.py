from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema,auto_field
from app.models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4
from datetime import datetime

event_bp = Blueprint('event', __name__)
api = Api(event_bp)
ma = Marshmallow(event_bp)

class PhotoSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Photo
photo_schema = PhotoSchema()

class EventSchema(SQLAlchemyAutoSchema):
    photo = fields.Nested(PhotoSchema)  # Add this line

    class Meta:
        model = Event
event_schema = EventSchema()

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review
review_schema = ReviewSchema()

class BookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
booking_schema = BookingSchema()

def uuid_type(value):
    return UUID(value)

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
        id = UUID(id)
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
            photo = photo_schema.dump(event.photo)  # Add this line

            response = make_response(
                jsonify({
                    "event": event_schema.dump(event),
                    "bookings": bookings,
                    "reviews": reviews,
                    "photo": photo  # And this line
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

api.add_resource(EventByID, '/events/<string:id>')


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
        new_event = Event(id=uuid4(),**new_events)

        new_events['start_date'] = datetime.strptime(new_events['start_date'] + ' ' + new_events['start_time'], '%Y-%m-%d %H:%M:%S')
        new_events['end_date'] = datetime.strptime(new_events['end_date'] + ' ' + new_events['end_time'], '%Y-%m-%d %H:%M:%S')

        del new_events['start_time']
        del new_events['end_time']
        db.session.add(new_event)
        db.session.commit()
        res = make_response(
            jsonify(event_schema.dump(new_event))
            ,201

            )
        
        return res

api.add_resource(new_Event, '/new_event')
