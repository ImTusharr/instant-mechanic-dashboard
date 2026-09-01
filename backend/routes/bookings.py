from datetime import datetime, timezone
from flask import Blueprint, request, jsonify
from database import db
from models import Booking, Customer, Service, Mechanic
from routes.stream import announcer

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/api/bookings', methods=['GET'])
def get_bookings():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    search = request.args.get('search', '', type=str)
    status = request.args.get('status', '', type=str)
    sort_by = request.args.get('sort_by', 'booking_time', type=str)
    sort_order = request.args.get('sort_order', 'desc', type=str)

    query = Booking.query.join(Customer).join(Service).outerjoin(Mechanic)

    # Search filter
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (Booking.id.ilike(search_fmt)) |
            (Customer.name.ilike(search_fmt)) |
            (Booking.vehicle_details.ilike(search_fmt)) |
            (Service.title.ilike(search_fmt))
        )

    # Status filter
    if status and status != 'All':
        query = query.filter(Booking.status == status)

    # Sorting
    sort_column = getattr(Booking, sort_by, Booking.booking_time)
    if sort_order == 'desc':
        query = query.order_by(sort_column.desc())
    else:
        query = query.order_by(sort_column.asc())

    paginated = query.paginate(page=page, per_page=limit, error_out=False)

    return jsonify({
        'bookings': [b.to_dict() for b in paginated.items],
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': paginated.page
    })

@bookings_bp.route('/api/bookings/<string:booking_id>', methods=['GET'])
def get_booking_by_id(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return jsonify(booking.to_dict())

@bookings_bp.route('/api/bookings/<string:booking_id>/status', methods=['PATCH'])
def update_booking_status(booking_id):
    data = request.get_json() or {}
    new_status = data.get('status')
    
    valid_statuses = ['Pending', 'Assigned', 'Mechanic On The Way', 'Completed', 'Cancelled']
    if new_status not in valid_statuses:
        return jsonify({'error': 'Invalid status'}), 400

    booking = Booking.query.get_or_404(booking_id)
    booking.status = new_status
    booking.updated_at = datetime.now(timezone.utc)

    if new_status == 'Completed' and booking.mechanic:
        booking.mechanic.jobs_completed += 1
        booking.mechanic.status = 'Available'

    db.session.commit()

    # Broadcast event to frontend SSE listeners
    announcer.announce({
        'event': 'booking_updated',
        'booking': booking.to_dict()
    })

    return jsonify(booking.to_dict())