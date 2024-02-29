from models import User, Profile, Interests, Tag, Event, Billing_Info, Billing_Details, Advert_Fees, Pricing, Review, Booking, Photo, db
from app import app

# def clear_database():
#     with app.app_context():
#         session = db.session

#         session.query(User).delete()
#         session.query(Profile).delete()
#         session.query(Interests).delete()
#         session.query(Tag).delete()
#         session.query(Event).delete()
#         session.query(Billing_Info).delete()
#         session.query(Billing_Details).delete()
#         session.query(Advert_Fees).delete()
#         session.query(Pricing).delete()
#         session.query(Review).delete()
#         session.query(Booking).delete()
#         session.query(Photo).delete()

#         session.commit()

# if __name__ == "__main__":
#     clear_database()
