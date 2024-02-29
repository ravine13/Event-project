import base64
import requests
from datetime import datetime
import pytz

# Creating mpesa authorization
def authorization(url):
    key = 'CBWuU1uUR0TYP2CzOaKoHAssKLJ0ATwSBJALvjCPsixPbGnw'
    secret = 'BAieVz2YXERN2n5Vf5DQMZXb5Tf0rQ6XAV6FHWpFByPUA30NUEwkn0qKH6IYcuPa'

    # Combination of consumer secret and key
    plain_text = f'{key}:{secret}'

    # Convert to bytes
    bytes_obj = bytes(plain_text,'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4str = bs4.decode().replace('=', '')

    headers = {'Authorization':'Basic '+bs4str}

    res = requests.get(url, headers=headers)
    return res.json()['access_token']

# Generating timestamp
def generate_timestamp():
    kenya_timezone = pytz.timezone('Africa/Nairobi')
    current_time = datetime.now(kenya_timezone)
    time = current_time.strftime('%Y%m%d%H%M%S')
    return time

# Generating password
def create_password(shortcode, passkey, timestamp):
    plain_text = shortcode+passkey+timestamp
    bytes_obj = bytes(plain_text, 'utf-8')
    bs4 = base64.b64encode(bytes_obj)
    bs4 = bs4.decode()
    return bs4

# Payment making request
def make_payment(number):
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
make_payment('254705820725')
