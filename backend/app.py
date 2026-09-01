from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from routes.dashboard import dashboard_bp
from routes.bookings import bookings_bp
from routes.mechanics import mechanics_bp
from routes.customers import customers_bp
from routes.stream import stream_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for frontend deployment (Vercel)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(mechanics_bp)
    app.register_blueprint(customers_bp)
    app.register_blueprint(stream_bp)

    @app.route('/health', methods=['GET'])
    def health_check():
        return {'status': 'healthy', 'service': 'Instant Mechanic Operations API'}, 200

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)