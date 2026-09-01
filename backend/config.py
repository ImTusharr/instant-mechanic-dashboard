import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'instant-mechanic-secret-key-2026')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False