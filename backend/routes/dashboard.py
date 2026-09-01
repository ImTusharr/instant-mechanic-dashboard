from datetime import datetime, timedelta, timezone
from flask import Blueprint, jsonify
from sqlalchemy import func
from database import db
from models import Booking, Mechanic, Customer, Service

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/dashboard/overview', methods=['GET'])
def get_overview():
    now = datetime.now(timezone.utc)
    today_start = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)

    total_bookings = Booking.query.count()
    todays_bookings = Booking.query.filter(Booking.booking_time >= today_start).count()
    completed_bookings = Booking.query.filter_by(status='Completed').count()
    pending_bookings = Booking.query.filter_by(status='Pending').count()
    cancelled_bookings = Booking.query.filter_by(status='Cancelled').count()

    total_revenue_result = db.session.query(func.sum(Booking.amount)).filter(Booking.status != 'Cancelled').scalar()
    total_revenue = round(total_revenue_result or 0.0, 2)

    active_mechanics = Mechanic.query.filter(Mechanic.status.in_(['Available', 'On Job'])).count()
    
    thirty_days_ago = now - timedelta(days=30)
    new_customers = Customer.query.filter(Customer.created_at >= thirty_days_ago).count()

    return jsonify({
        'total_bookings': total_bookings,
        'todays_bookings': todays_bookings,
        'completed_bookings': completed_bookings,
        'pending_bookings': pending_bookings,
        'cancelled_bookings': cancelled_bookings,
        'total_revenue': total_revenue,
        'active_mechanics': active_mechanics,
        'new_customers': new_customers
    })

@dashboard_bp.route('/api/dashboard/analytics', methods=['GET'])
def get_analytics():
    # 1. Bookings and Revenue over time (Last 30 days)
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
    
    daily_stats = db.session.query(
        func.date(Booking.booking_time).label('date'),
        func.count(Booking.id).label('count'),
        func.sum(Booking.amount).label('revenue')
    ).filter(Booking.booking_time >= thirty_days_ago)\
     .group_by(func.date(Booking.booking_time))\
     .order_by('date').all()

    time_series = [
        {
            'date': str(stat.date),
            'bookings': stat.count,
            'revenue': round(stat.revenue or 0.0, 2)
        } for stat in daily_stats
    ]

    # 2. Status Breakdown
    status_stats = db.session.query(
        Booking.status,
        func.count(Booking.id)
    ).group_by(Booking.status).all()

    status_breakdown = [{'status': s[0], 'count': s[1]} for s in status_stats]

    # 3. Category Breakdown
    category_stats = db.session.query(
        Service.category,
        func.count(Booking.id)
    ).join(Booking, Service.id == Booking.service_id)\
     .group_by(Service.category).all()

    category_breakdown = [{'category': c[0], 'count': c[1]} for c in category_stats]

    return jsonify({
        'time_series': time_series,
        'status_breakdown': status_breakdown,
        'category_breakdown': category_breakdown
    })