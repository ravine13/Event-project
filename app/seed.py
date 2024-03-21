from models.models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, TokenBlocklist, db
from datetime import datetime, timedelta
from app import app
from faker import Faker
from random import choice as rc

fake = Faker()

with app.app_context():
    Billing_Info.query.delete()
    Advert_Fees.query.delete()
    Booking.query.delete()
    Pricing.query.delete()
    Review.query.delete()
    Interests.query.delete()
    Tag.query.delete()
    Event.query.delete()
    Photo.query.delete()
    Profile.query.delete()
    User.query.delete()
    Billing_Info.query.delete()
    Billing_Details.query.delete()
    TokenBlocklist.query.delete()
    
    session = db.session

    users = []
    profiles = []
    events = []
    photos = []
    prices = []
    billing_details = []
    advert_fees = []

    for i in range(10):
        user = User(
            email = fake.email(),
            password = fake.password(),
            role = rc([100, 101, 111]),
            created_at = datetime.now()  
        )
        db.session.add(user)
        db.session.commit()
        users.append(user)

    for i, user in enumerate(users):
        profile = Profile(
            user_id=user.id,  
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            profile_photo = fake.image_url()
        )
        db.session.add(profile)
        db.session.commit()
        profiles.append(profile)

    
    image_urls = [
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/akili-02.jpg1707317289.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/WhatsApp_Image_2024-03-02_at_19.10.07_1.jpeg1709396522.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://marketplace.canva.com/EAFJMl8KcjI/1/0/1131w/canva-purple-black-tropical-party-club-poster-orVwDS2lrfY.jpg',
        'https://www.ticketsasa.com/components/com_enmasse/upload/davido__king_promise_1080_by_1080-4.jpg1707721788.jpg',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Social-Media-Poster.png1707213039.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/IMG-20240302-WA0007.jpg1709411677.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/jazzbythelake.png1708006194.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Virunga-Mountains-Marathon-Website-Image.png1708510546.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Save_the_date_KE.jpeg1702969299.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5',
        'https://www.ticketsasa.com/images/images.php?src=components/com_enmasse/upload/Afro-Coustic-2024-New-Venue1.png1708343562.jpg&h=320&w=320&zc=1&q=100&s=1&f=3,5|4,-5' 
    ]

    for i in range(10):
        photo = Photo(
            url=image_urls[i]
        )
        db.session.add(photo)
        db.session.commit()
        photos.append(photo)

    for i in range(10):
        event = Event(
            name=rc(["Sparkling Soiree",
                    "Midnight Masquerade",
                    "Garden Gala",
                    "Enchanted Evening",
                    "Moonlit Mixer",
                    "Starry Night Spectacular",
                    "Twilight Tango",
                    "Sapphire Serenade",
                    "Mystic Moonlight",
                    "Emerald Elegance",
                    "Golden Glitterati",
                    "Sunset Sojourn",
                    "Celestial Celebration",
                    "Aurora Affair",
                    "Harvest Harmony",
                    "Winter Wonderland",
                    "Spring Fling",
                    "Summer Solstice Soiree",
                    "Autumn Allegro",
                    "Fireside Festivity"]
                    ),
            description=rc(
                [
                    "A glamorous evening filled with sparkling lights and enchanting music.",
                    "An elegant masked ball under the cloak of midnight.",
                    "A delightful gathering amidst blooming flowers and lush greenery.",
                    "Step into a fairytale world of wonder and magic.",
                    "Dance under the stars in a dreamy atmosphere.",
                    "An evening of enchantment and celestial splendor.",
                    "Dance the night away as twilight falls upon the city.",
                    "A luxurious event adorned with shades of sapphire and elegance.",
                    "A mysterious affair bathed in the glow of the moon.",
                    "Experience sophistication and grace in a sea of emerald hues.",
                    "Shine bright like gold in an evening of glamour and opulence.",
                    "Bid farewell to the day in a serene and picturesque setting.",
                    "A celestial-themed celebration under the vast night sky.",
                    "Immerse yourself in the beauty of dancing lights and colors.",
                    "Celebrate the bounties of the harvest season with joy and merriment.",
                    "Embrace the magic of winter in a whimsical wonderland.",
                    "Welcome the arrival of spring with laughter and joy.",
                    "Celebrate the longest day of the year with a vibrant gathering.",
                    "Fall into the warmth of autumn with music and laughter.",
                    "Gather around the fire for cozy conversations and festive cheer."
                    ]
                ),
            organiser_id=users[i].id,  
            start_date=datetime.now() + timedelta(days=i),
            start_time=datetime.now(),  
            end_date=datetime.now() + timedelta(days=i+1),
            end_time=datetime.now(),  
            duration=rc(['4 Hours', '8 Hours', '12 Hours', '16 Hours',
                         '20 Hours', '24 Hours', '30 Hours', '48 Hours'
                         ]),
            venue=rc(['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret', 'Nakuru', 'Malindi'
                      'Thika', 'Kitale', 'Machakos', 'Nyeri']),
            photo_id=photos[i].id,
            confirmed = rc([True, False]),
            created_at=datetime.now()  
        )
        db.session.add(event)
        db.session.commit()
        events.append(event)

    for i, user in enumerate(users):
        interest = Interests(
            event_id=events[i].id,  
            user_id=user.id  
        )
        db.session.add(interest)
        db.session.commit()

    for i, user in enumerate(users):
        tag = Tag(
            user_id=user.id, 
            name=fake.name(),
            event_id=events[i].id  
        )
        db.session.add(tag)
        db.session.commit()

    for i in range(10):
        billing_detail = Billing_Details(
            name=f'Billing Detail {i}',
            detail=f'This is a detail for Billing Detail {i}'
        )
        db.session.add(billing_detail)
        db.session.commit()
        billing_details.append(billing_detail)

    for i, user in enumerate(users):
        billing_info = Billing_Info(
            user_id=user.id,  
            payment_method='credit_card',
            payment_details_id=billing_details[i].id 
        )
        db.session.add(billing_info)
        db.session.commit()

    for i, event in enumerate(events):
        pricing = Pricing(
            event_id=event.id, 
            name=f'Pricing {i}',
            amount=float(i*10)
        )
        db.session.add(pricing)
        db.session.commit()
        prices.append(pricing)
        

    for i, user in enumerate(users):
        review = Review(
            user_id=user.id, 
            event_id=events[i].id,  
            comment=f'This is a comment {i}',
            rating=i
        )
        db.session.add(review)
        db.session.commit()


    for i, user in enumerate(users):
        booking = Booking(
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
                user_id=user.id,  
                event_id=event.id,  
                amount=float(i*10),
                created_at=datetime.now()  
            )
            db.session.add(advert_fee)
            advert_fees.append(advert_fee)

    db.session.commit()

print("Seed data has been added to the database.")
