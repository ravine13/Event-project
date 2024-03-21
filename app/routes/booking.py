from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema,auto_field
from models.models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from marshmallow import Schema, fields
from sqlalchemy import func
from flask_jwt_extended import jwt_required
from uuid import UUID
from uuid import uuid4
from datetime import datetime


booking_bp = Blueprint('booking', __name__)
api = Api(booking_bp)
ma = Marshmallow(booking_bp)


class BookingSchema(SQLAlchemyAutoSchema):
    event_name = fields.Str(attribute="event.name")

    class Meta:
        model = Booking
        include_fk = True

booking_schema = BookingSchema()

class PricingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pricing
pricing_schema = PricingSchema()

class EventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Event
event_schema = EventSchema()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

def uuid_type(value):
    return UUID(value)


class Bookings(Resource):
    def get(self):
        bookings = db.session.query(
            Booking.id,
            Booking.date_created,
            Event.name.label('event_name')
        ).join(Event, Booking.event_id == Event.id).all()

        bookingname = [
            {
                "id": booking.id,
                "date_created": booking.date_created,
                "event_name": booking.event_name
            }
            for booking in bookings
        ]

       
        bookings = booking_schema.dump(bookingname, many=True)

        res = make_response(
            jsonify(bookings),
            200
        )

        return res
    
api.add_resource(Bookings, '/bookings')

class BookingByID(Resource):
    def get(self, id):
        id = UUID(id)
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
        id = UUID(id)
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

        id = UUID(id)
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


api.add_resource(BookingByID, '/bookings/<string:id>')

class new_Booking(Resource):
    post_args = reqparse.RequestParser(bundle_errors=True)
    post_args.add_argument('card_name', type=uuid_type, help="Card holder's name required", required=True)
    post_args.add_argument('card_number', type=uuid_type, help='Card name required', required=True)
    post_args.add_argument('exp_date', type=uuid_type, help='Expiration date required', required=True)
    post_args.add_argument('cvv', type=uuid_type, help='cvv required', required=True)

    def post(self):
        new_bookings = self.post_args.parse_args()
        new_booking = Booking(id=uuid4(), **new_bookings)
        db.session.add(new_booking)
        db.session.commit()
        res = make_response(
            jsonify(booking_schema.dump(new_booking)),
            201
        )
        
        return res

api.add_resource(new_Booking, '/new_booking')
