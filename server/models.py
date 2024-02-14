from sqlalchemy import Column, DateTime, String, Integer, ForeignKey, Boolean, Enum, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = Column(UUID, primary_key=True)
    email = Column(String)
    password = Column(String)
    role = Column(Integer)
    confirmed = Column(Boolean)
    created_at = Column(DateTime)

class Profile(db.Model):
    __tablename__ = 'Profile'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    first_name = Column(String)
    last_name = Column(String)
    profile_photo = Column(String)
    user = relationship('User', backref='profiles')

class Interests(db.Model):
    __tablename__ = 'Interests'
    id = Column(UUID, primary_key=True)
    event_id = Column(UUID)
    user_id = Column(UUID, ForeignKey('user.id'))
    user = relationship('User', backref='interests')

class Tag(db.Model):
    __tablename__ = 'tag'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    name = Column(String)
    event_id = Column(UUID)
    user = relationship('User', backref='tags')

class Event(db.Model):
    __tablename__ = 'Event'
    id = Column(UUID, primary_key=True)
    name = Column(String)
    description = Column(String)
    organiser_id = Column(UUID, ForeignKey('user.id'))
    start_date = Column(DateTime)
    start_time = Column(DateTime)
    end_date = Column(DateTime)
    end_time = Column(DateTime)
    duration = Column(String)
    venue = Column(String)
    photo_id = Column(UUID)
    created_at = Column(DateTime)
    organiser = relationship('User', backref='events')

class Billing_Info(db.Model):
    __tablename__ = 'Billing_Info'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    payment_method = Column(Enum('credit_card', 'm_pesa', 'airtel_money', name='Ptype'))
    payment_details_id = Column(UUID)
    user = relationship('User', backref='billing_infos')

class Payment_Details(db.Model):
    __tablename__ = 'Payment_Details'
    id = Column(UUID, primary_key=True)
    name = Column(String)
    detail = Column(String)

class Event_Billing(db.Model):
    __tablename__ = 'Event_Billing'
    id = Column(UUID, primary_key=True)
    event_id = Column(UUID, ForeignKey('Event.id'))
    billing_id = Column(UUID, ForeignKey('Billing_Info.id'))
    event = relationship('Event', backref='event_billings')
    billing_info = relationship('Billing_Info', backref='event_billings')

class Pricing(db.Model):
    __tablename__ = 'Pricing'
    event_id = Column(UUID, ForeignKey('Event.id'))
    id = Column(UUID, primary_key=True)
    name = Column(String)
    amount = Column(Float)
    event = relationship('Event', backref='pricings')

class Review(db.Model):
    __tablename__ = 'Review'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    event_id = Column(UUID, ForeignKey('Event.id'))
    comment = Column(String)
    rating = Column(Integer)
    user = relationship('User', backref='reviews')
    event = relationship('Event', backref='reviews')

class Payment(db.Model):
    __tablename__ = 'Payment'
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    event_id = Column(UUID, ForeignKey('Event.id'))
    pricing_id = Column(UUID, ForeignKey('Pricing.id'))
    date_created = Column(DateTime)
    payment_method = Column(String)
    user = relationship('User', backref='payments')
    event = relationship('Event', backref='payments')
    pricing = relationship('Pricing', backref='payments')

class Booking(db.Model):
    __tablename__ = 'Booking'
    id = Column(UUID, primary_key=True)
    event_id = Column(UUID, ForeignKey('Event.id'))
    user_id = Column(UUID, ForeignKey('user.id'))
    pricing_id = Column(UUID, ForeignKey('Pricing.id'))
    date_created = Column(DateTime)
    user = relationship('User', backref='bookings')
    event = relationship('Event', backref='bookings')
    pricing = relationship('Pricing', backref='bookings')

class Photo(db.Model):
    __tablename__ = 'Photo'
    id = Column(UUID, primary_key=True)
    url = Column(String)
