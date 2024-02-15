from flask import Flask, Blueprint, jsonify, make_response
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User, Profile, Interests, Tag, Event, Billing_Info, Payment_Details, Event_Billing, Pricing, Review, Payment, Booking, Photo, db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required




main_bp = Blueprint('main', __name__)
app = Flask(__name__)
api = Api(main_bp)
ma = Marshmallow(main_bp)