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

class GetUserDetails(BaseModel):
    user_id: int
    user_name: str
    phone_no: str
    service_name: str
    service_per_year: int
    start_date: date
    end_date: date
    status: str
    visit_date: date
    visit_status: str
