from models import User, Profile, Interests, Tag, Event, Billing_Info, Payment_Details, Event_Billing, Pricing, Review, Payment, Booking, Photo, db
from uuid import uuid4
from datetime import datetime


for i in range(5):
    user = User(
        id=uuid4(),
        email=f'user{i}@example.com',
        password='password',
        role=i,
        confirmed=True,
        created_at=datetime.now()
    )
    db.session.add(user)


for i in range(5):
    profile = Profile(
        id=uuid4(),
        user_id=uuid4(),  
        first_name=f'First{i}',
        last_name=f'Last{i}',
        profile_photo=f'photo{i}.jpg'
    )
    db.session.add(profile)


for i in range(5):
    interest = Interests(
        id=uuid4(),
        event_id=uuid4(),  
        user_id=uuid4()  
    )
    db.session.add(interest)


for i in range(5):
    tag = Tag(
        id=uuid4(),
        user_id=uuid4(), 
        name=f'tag{i}',
        event_id=uuid4()  
    )
    db.session.add(tag)


for i in range(5):
    event = Event(
        id=uuid4(),
        name=f'Event{i}',
        description=f'Description for Event{i}',
        organiser_id=uuid4(),  
        start_date=datetime.now(),
        start_time=datetime.now(),
        end_date=datetime.now(),
        end_time=datetime.now(),
        duration='1 hour',
        venue='Venue',
        photo_id=uuid4(), 
        created_at=datetime.now()
    )
    db.session.add(event)


for i in range(5):
    billing_info = Billing_Info(
        id=uuid4(),
        user_id=uuid4(),  
        payment_method='credit_card',
        payment_details_id=uuid4() 
    )
    db.session.add(billing_info)


for i in range(5):
    payment_detail = Payment_Details(
        id=uuid4(),
        name=f'Payment Detail {i}',
        detail=f'Detail for Payment Detail {i}'
    )
    db.session.add(payment_detail)


for i in range(5):
    event_billing = Event_Billing(
        id=uuid4(),
        event_id=uuid4(),  
        billing_id=uuid4()  
    )
    db.session.add(event_billing)


for i in range(5):
    pricing = Pricing(
        event_id=uuid4(), 
        id=uuid4(),
        name=f'Pricing {i}',
        amount=float(i)
    )
    db.session.add(pricing)


for i in range(5):
    review = Review(
        id=uuid4(),
        user_id=uuid4(), 
        event_id=uuid4(),  
        comment=f'Comment {i}',
        rating=i
    )
    db.session.add(review)


for i in range(5):
    payment = Payment(
        id=uuid4(),
        user_id=uuid4(),  
        event_id=uuid4(),  
        pricing_id=uuid4(),  
        date_created=datetime.now(),
        payment_method='credit_card'
    )
    db.session.add(payment)


for i in range(5):
    booking = Booking(
        id=uuid4(),
        event_id=uuid4(), 
        user_id=uuid4(),  
        pricing_id=uuid4(),  
        date_created=datetime.now()
    )
    db.session.add(booking)


for i in range(5):
    photo = Photo(
        id=uuid4(),
        url=f'https://example.com/photo{i}.jpg'
    )
    db.session.add(photo)

db.session.commit()
