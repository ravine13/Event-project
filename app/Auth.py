from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, current_user, get_jwt)
from flask_restful import Resource, Api, reqparse , abort

from models import User, db

auth_bp = Blueprint('auth',__name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)


