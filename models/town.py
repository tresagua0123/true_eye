from app import db
from datetime import datetime
import pytz

class TownsList(db.model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
    default=datetime.now(pytz.timezone('Asia/Tokyo')))
