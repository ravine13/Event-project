# from models import User, Profile, Interests, Tag, Event, Billing_Info, Payment_Details, Event_Billing, Pricing, Review, Payment, Booking, Photo, db
# from uuid import uuid4
# from datetime import datetime


# for i in range(5):
#     user = User(
#         id=uuid4(),
#         email=f'user{i}@example.com',
#         password='password',
#         role=i,
#         confirmed=True,
#         created_at=datetime.now()
#     )
#     db.session.add(user)


# for i in range(5):
#     profile = Profile(
#         id=uuid4(),
#         user_id=uuid4(),  
#         first_name=f'First{i}',
#         last_name=f'Last{i}',
#         profile_photo=f'photo{i}.jpg'
#     )
#     db.session.add(profile)


# for i in range(5):
#     interest = Interests(
#         id=uuid4(),
#         event_id=uuid4(),  
#         user_id=uuid4()  
#     )
#     db.session.add(interest)


# for i in range(5):
#     tag = Tag(
#         id=uuid4(),
#         user_id=uuid4(), 
#         name=f'tag{i}',
#         event_id=uuid4()  
#     )
#     db.session.add(tag)


# for i in range(5):
#     event = Event(
#         id=uuid4(),
#         name=f'Event{i}',
#         description=f'Description for Event{i}',
#         organiser_id=uuid4(),  
#         start_date=datetime.now().strftime('%Y-%m-%d'),
#         start_time=datetime.now().strftime('%H:%M'),
#         end_date=datetime.now().strftime('%Y-%m-%d'),
#         end_time=datetime.now().strftime('%H:%M'),
#         duration='1 hour',
#         venue='Venue',
#         photo_url='https://example.com/image.jpg',
#         photo_id=uuid4(), 
#         created_at=datetime.now().strftime('%Y-%m-%d')
#     )
#     db.session.add(event)


# for i in range(5):
#     billing_info = Billing_Info(
#         id=uuid4(),
#         user_id=uuid4(),  
#         payment_method='credit_card',
#         payment_details_id=uuid4() 
#     )
#     db.session.add(billing_info)


# for i in range(5):
#     payment_detail = Payment_Details(
#         id=uuid4(),
#         name=f'Payment Detail {i}',
#         detail=f'Detail for Payment Detail {i}'
#     )
#     db.session.add(payment_detail)


# for i in range(5):
#     event_billing = Event_Billing(
#         id=uuid4(),
#         event_id=uuid4(),  
#         billing_id=uuid4()  
#     )
#     db.session.add(event_billing)


# for i in range(5):
#     pricing = Pricing(
#         event_id=uuid4(), 
#         id=uuid4(),
#         name=f'Pricing {i}',
#         amount=float(i)
#     )
#     db.session.add(pricing)


# for i in range(5):
#     review = Review(
#         id=uuid4(),
#         user_id=uuid4(), 
#         event_id=uuid4(),  
#         comment=f'Comment {i}',
#         rating=i
#     )
#     db.session.add(review)


# for i in range(5):
#     payment = Payment(
#         id=uuid4(),
#         user_id=uuid4(),  
#         event_id=uuid4(),  
#         pricing_id=uuid4(),  
#         date_created=datetime.now(),
#         payment_method='credit_card'
#     )
#     db.session.add(payment)


# for i in range(5):
#     booking = Booking(
#         id=uuid4(),
#         event_id=uuid4(), 
#         user_id=uuid4(),  
#         pricing_id=uuid4(),  
#         date_created=datetime.now()
#     )
#     db.session.add(booking)


# for i in range(5):
#     photo = Photo(
#         id=uuid4(),
#         url=f'https://example.com/photo{i}.jpg'
#     )
#     db.session.add(photo)

# db.session.commit()

from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from uuid import uuid4
from datetime import datetime, timedelta
from app import app

with app.app_context():
    session = db.session

    users = []
    profiles = []
    events = []
    photos = []
    billing_details = []
    advert_fees = []

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
        users.append(user)

    db.session.commit()

    for i, user in enumerate(users):
        profile = Profile(
            id=uuid4(),
            user_id=user.id,  
            first_name=f'User{i}',
            last_name=f'LastName{i}',
            profile_photo=f'https://example.com/photo{i}.jpg'
        )
        db.session.add(profile)
        profiles.append(profile)

    db.session.commit()

    image_urls = [
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/akili-02.jpg1707317289.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fkmcconaugheyray%2Fevent-posters%2F&psig=AOvVaw1mJ88lA6MzlUfmVekJsBCO&ust=1708578481592000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDEhoHVu4QDFQAAAAAdAAAAABAE',
        'https://mir-s3-cdn-cf.behance.net/project_modules/disp/14cda14926289.560c6103a2798.png',
        'https://marketplace.canva.com/EAFJMl8KcjI/1/0/1131w/canva-purple-black-tropical-party-club-poster-orVwDS2lrfY.jpg',
        'https://www.ticketsasa.com/components/com_enmasse/upload/davido__king_promise_1080_by_1080-4.jpg1707721788.jpg'
    ]

    for i in range(5):
        photo = Photo(
            id=uuid4(),
            url=image_urls[i]
        )
        db.session.add(photo)
        photos.append(photo)

    db.session.commit()

    for i in range(5):
        event = Event(
            id=uuid4(),
            name=f'Event{i}',
            description=f'This is a description for Event{i}',
            organiser_id=users[i].id,  
            start_date=datetime.now() + timedelta(days=i),
            start_time=datetime.now(),  
            end_date=datetime.now() + timedelta(days=i+1),
            end_time=datetime.now(),  
            duration='1 hour',
            venue=f'Venue {i}',
            photo_id=photos[i].id,  
            created_at=datetime.now()  
        )
        db.session.add(event)
        events.append(event)

    db.session.commit()

    for i, user in enumerate(users):
        interest = Interests(
            id=uuid4(),
            event_id=events[i].id,  
            user_id=user.id  
        )
        db.session.add(interest)

    db.session.commit()

    for i, user in enumerate(users):
        tag = Tag(
            id=uuid4(),
            user_id=user.id, 
            name=f'tag{i}',
            event_id=events[i].id  
        )
        db.session.add(tag)

    db.session.commit()

    for i in range(5):
        billing_detail = Billing_Details(
            id=uuid4(),
            name=f'Billing Detail {i}',
            detail=f'This is a detail for Billing Detail {i}'
        )
        db.session.add(billing_detail)
        billing_details.append(billing_detail)

    db.session.commit()

    for i, user in enumerate(users):
        billing_info = Billing_Info(
            id=uuid4(),
            user_id=user.id,  
            payment_method='credit_card',
            payment_details_id=billing_details[i].id 
        )
        db.session.add(billing_info)

    db.session.commit()

    for i, event in enumerate(events):
        pricing = Pricing(
            event_id=event.id, 
            id=uuid4(),
            name=f'Pricing {i}',
            amount=float(i*10)
        )
        db.session.add(pricing)

    db.session.commit()

    for i, user in enumerate(users):
        review = Review(
            id=uuid4(),
            user_id=user.id, 
            event_id=events[i].id,  
            comment=f'This is a comment {i}',
            rating=i
        )
        db.session.add(review)

    db.session.commit()

    for i, user in enumerate(users):
        booking = Booking(
            id=uuid4(),
            event_id=events[i].id, 
            user_id=user.id,  
            pricing_id=pricing.id,  
            date_created=datetime.now()  
        )
        db.session.add(booking)

    db.session.commit()

    for i, user in enumerate(users):
        for event in events:
            advert_fee = Advert_Fees(
                id=uuid4(),
                user_id=user.id,  
                event_id=event.id,  
                amount=float(i*10),
                created_at=datetime.now()  
            )
            db.session.add(advert_fee)
            advert_fees.append(advert_fee)

    db.session.commit()

print("Seed data has been added to the database.")
