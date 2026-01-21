from pydantic import BaseModel
from datetime import date

class ClientCreate(BaseModel):
    user_name: str
    phone_no: str


class SubscriptionCreate(BaseModel):
    user_id: int
    service_id: int
    service_per_year: int
    start_date: date
