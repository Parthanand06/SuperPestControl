from pydantic import BaseModel
from datetime import date, datetime

class ShowClient(BaseModel):
    user_id: int
    user_name: str
    phone_no: str
    created_ts: datetime

class ClientCreate(BaseModel):
    user_name: str
    phone_no: str


class SubscriptionCreate(BaseModel):
    user_id: int
    service_id: int
    service_per_year: int
    start_date: date