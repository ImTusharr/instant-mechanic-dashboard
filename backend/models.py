from datetime import datetime, timezone
import uuid
from database import db

class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    bookings = db.relationship('Booking', backref='customer', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Mechanic(db.Model):
    __tablename__ = 'mechanics'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(30), default='Available', nullable=False)  # Available, On Job, Offline
    jobs_completed = db.Column(db.Integer, default=0, nullable=False)
    current_lat = db.Column(db.Float, nullable=True)
    current_lng = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    bookings = db.relationship('Booking', backref='mechanic', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'status': self.status,
            'jobs_completed': self.jobs_completed,
            'current_lat': self.current_lat,
            'current_lng': self.current_lng,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Engine, Tyres, Brakes, Electrical, Oil Change
    base_price = db.Column(db.Float, nullable=False)

    bookings = db.relationship('Booking', backref='service', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'base_price': self.base_price
        }

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.String(36), primary_key=True, default=lambda: f"BK-{str(uuid.uuid4())[:6].upper()}")
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    mechanic_id = db.Column(db.Integer, db.ForeignKey('mechanics.id'), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    vehicle_details = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(30), default='Pending', nullable=False)  # Pending, Assigned, Mechanic On The Way, Completed, Cancelled
    amount = db.Column(db.Float, nullable=False)
    booking_time = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'customer_name': self.customer.name if self.customer else None,
            'mechanic_id': self.mechanic_id,
            'mechanic_name': self.mechanic.name if self.mechanic else 'Unassigned',
            'service_id': self.service_id,
            'service_title': self.service.title if self.service else None,
            'service_category': self.service.category if self.service else None,
            'vehicle_details': self.vehicle_details,
            'status': self.status,
            'amount': self.amount,
            'booking_time': self.booking_time.isoformat() if self.booking_time else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }