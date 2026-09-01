import random
from datetime import datetime, timedelta, timezone
from flask import Flask
from config import Config
from database import db
from models import Customer, Mechanic, Service, Booking

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    return app

FIRST_NAMES = [
    "Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Dakota",
    "Riley", "Reese", "Casey", "Avery", "Logan", "Parker", "Quinn", "Skyler",
    "Cameron", "Jesse", "Jamie", "Kendall", "Peyton", "Harper", "Rowan", "Hayden"
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson"
]

VEHICLES = [
    "2020 Toyota Camry", "2018 Honda Civic", "2021 Ford F-150", "2019 Tesla Model 3",
    "2022 BMW X5", "2017 Chevrolet Silverado", "2020 Hyundai Elantra", "2021 Nissan Altima",
    "2019 Subaru Outback", "2022 Mercedes-Benz C-Class", "2018 Audi A4", "2021 Jeep Grand Cherokee",
    "2020 Kia Optima", "2019 Volkswagen Jetta", "2022 Volvo XC90", "2017 Dodge Charger"
]

SERVICES_DATA = [
    {"title": "Full Engine Diagnostics", "category": "Engine", "base_price": 149.99},
    {"title": "Oil & Filter Change", "category": "Oil Change", "base_price": 49.99},
    {"title": "Brake Pad Replacement", "category": "Brakes", "base_price": 189.99},
    {"title": "Tire Rotation & Balancing", "category": "Tyres", "base_price": 79.99},
    {"title": "Battery Replacement & Test", "category": "Electrical", "base_price": 129.99},
    {"title": "Transmission Fluid Flush", "category": "Engine", "base_price": 199.99},
    {"title": "Brake Rotor Resurfacing", "category": "Brakes", "base_price": 229.99},
    {"title": "Alternator Repair", "category": "Electrical", "base_price": 299.99},
    {"title": "Synthetic Oil Service", "category": "Oil Change", "base_price": 89.99},
    {"title": "Full Tyre Replacement (4x)", "category": "Tyres", "base_price": 449.99}
]

STATUS_WEIGHTS = {
    'Completed': 0.65,
    'Pending': 0.10,
    'Assigned': 0.10,
    'Mechanic On The Way': 0.10,
    'Cancelled': 0.05
}

def seed_database():
    app = create_app()
    with app.app_context():
        print("Resetting database tables...")
        db.drop_all()
        db.create_all()

        print("Seeding Services...")
        services = []
        for item in SERVICES_DATA:
            service = Service(
                title=item["title"],
                category=item["category"],
                base_price=item["base_price"]
            )
            db.session.add(service)
            services.append(service)
        db.session.commit()

        print("Seeding 25 Mechanics...")
        mechanics = []
        statuses = ['Available', 'On Job', 'Offline']
        for i in range(25):
            name = f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"
            # Base location around city center (e.g. lat 40.7128, lng -74.0060)
            lat = 40.7128 + random.uniform(-0.08, 0.08)
            lng = -74.0060 + random.uniform(-0.08, 0.08)
            mechanic = Mechanic(
                name=name,
                status=random.choice(statuses),
                jobs_completed=0,
                current_lat=round(lat, 6),
                current_lng=round(lng, 6)
            )
            db.session.add(mechanic)
            mechanics.append(mechanic)
        db.session.commit()

        print("Seeding 60 Customers...")
        customers = []
        used_emails = set()
        for i in range(60):
            first = random.choice(FIRST_NAMES)
            last = random.choice(LAST_NAMES)
            name = f"{first} {last}"
            email = f"{first.lower()}.{last.lower()}{random.randint(1, 999)}@example.com"
            while email in used_emails:
                email = f"{first.lower()}.{last.lower()}{random.randint(1000, 9999)}@example.com"
            used_emails.add(email)

            phone = f"+1-555-{random.randint(100, 999):03d}-{random.randint(1000, 9999):04d}"
            created_days_ago = random.randint(1, 60)
            created_at = datetime.now(timezone.utc) - timedelta(days=created_days_ago)

            customer = Customer(
                name=name,
                email=email,
                phone=phone,
                created_at=created_at
            )
            db.session.add(customer)
            customers.append(customer)
        db.session.commit()

        print("Seeding 550 Bookings...")
        status_choices = list(STATUS_WEIGHTS.keys())
        status_probabilities = list(STATUS_WEIGHTS.values())

        now = datetime.now(timezone.utc)

        for i in range(550):
            customer = random.choice(customers)
            service = random.choice(services)
            status = random.choices(status_choices, weights=status_probabilities, k=1)[0]
            vehicle = random.choice(VEHICLES)

            # Random timestamp over the past 30 days, plus today's live activity
            days_ago = random.choices([0, random.randint(1, 30)], weights=[0.25, 0.75], k=1)[0]
            hours_ago = random.randint(0, 23)
            minutes_ago = random.randint(0, 59)
            booking_time = now - timedelta(days=days_ago, hours=hours_ago, minutes=minutes_ago)

            mechanic = None
            if status in ['Assigned', 'Mechanic On The Way', 'Completed']:
                mechanic = random.choice(mechanics)
                if status == 'Completed':
                    mechanic.jobs_completed += 1

            # Slight price variance (+/- 10%) based on specific vehicle requirements
            amount = round(service.base_price * random.uniform(0.95, 1.10), 2)

            booking = Booking(
                customer_id=customer.id,
                mechanic_id=mechanic.id if mechanic else None,
                service_id=service.id,
                vehicle_details=vehicle,
                status=status,
                amount=amount,
                booking_time=booking_time,
                updated_at=booking_time + timedelta(minutes=random.randint(5, 120))
            )
            db.session.add(booking)

        db.session.commit()
        print("Database successfully seeded with 550+ bookings, 60 customers, and 25 mechanics!")

if __name__ == '__main__':
    seed_database()