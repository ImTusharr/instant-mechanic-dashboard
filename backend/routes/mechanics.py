from flask import Blueprint, jsonify
from models import Mechanic

mechanics_bp = Blueprint('mechanics', __name__)

@mechanics_bp.route('/api/mechanics', methods=['GET'])
def get_mechanics():
    mechanics = Mechanic.query.all()
    
    result = []
    for m in mechanics:
        m_dict = m.to_dict()
        # Fetch current active booking if available
        active_booking = [b for b in m.bookings if b.status in ['Assigned', 'Mechanic On The Way']]
        m_dict['active_booking_id'] = active_booking[0].id if active_booking else None
        result.append(m_dict)

    return jsonify(result)