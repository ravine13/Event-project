from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Resource,Api
from marshmallow import Schema, fields
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import base64
import requests
from datetime import datetime
import pytz

mpesa_bp = Blueprint('mpesa', __name__)
api = Api(mpesa_bp)
ma = Marshmallow(mpesa_bp)

class PhoneNumberSchema(Schema):
    phoneNumber = fields.Str(required=True)

class PaymentResource(Resource):
    def post(self):
        schema = PhoneNumberSchema()
        errors = schema.validate(request.json)
        if errors:
            return errors, 400

        number = request.json['phoneNumber']
        def authorization(url):
            key = 'CBWuU1uUR0TYP2CzOaKoHAssKLJ0ATwSBJALvjCPsixPbGnw'
            secret = 'BAieVz2YXERN2n5Vf5DQMZXb5Tf0rQ6XAV6FHWpFByPUA30NUEwkn0qKH6IYcuPa'

            plain_text = f'{key}:{secret}'
            bytes_obj = bytes(plain_text,'utf-8')
            bs4 = base64.b64encode(bytes_obj)
            bs4str = bs4.decode().replace('=', '')

            headers = {'Authorization':'Basic '+bs4str}

            res = requests.get(url, headers=headers)
            return res.json()['access_token']

        def generate_timestamp():
            kenya_timezone = pytz.timezone('Africa/Nairobi')
            current_time = datetime.now(kenya_timezone)
            time = current_time.strftime('%Y%m%d%H%M%S')
            return time

        def create_password(shortcode, passkey, timestamp):
            plain_text = shortcode+passkey+timestamp
            bytes_obj = bytes(plain_text, 'utf-8')
            bs4 = base64.b64encode(bytes_obj)
            bs4 = bs4.decode()
            return bs4

        timestamp = generate_timestamp()
        password = create_password('174379','bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',timestamp)
        payload = {    
            "BusinessShortCode": "174379",    
            "Password": password,    
            "Timestamp": timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": "1",    
            "PartyA": number,    
            "PartyB":"174379",    
            "PhoneNumber": number,    
            "CallBackURL": "https://mydomain.com/pat",    
            "AccountReference":"Test",    
            "TransactionDesc":"Test"
        }

        token = authorization('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
        headers = {'Authorization':'Bearer '+token}

        res = requests.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers=headers, json=payload)
        return res.json()

api.add_resource(PaymentResource, '/api/make_payment')

if __name__ == '__main__':
    app.run(debug=True)
