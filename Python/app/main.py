from fastapi import FastAPI
from app.schemas import ClientCreate, SubscriptionCreate
from app.services import create_client, create_subscription

app = FastAPI(title="Pest Control Backend")

@app.post("/clients")
def create_client_api(payload: ClientCreate):
    user_id = create_client(
        payload.user_name,
        payload.phone_no
    )
    return {
        "message": "Client created successfully",
        "user_id": user_id
    }


@app.post("/subscriptions")
def create_subscription_api(payload: SubscriptionCreate):
    order_id = create_subscription(
        payload.user_id,
        payload.service_id,
        payload.service_per_year,
        payload.start_date
    )
    return {
        "message": "Subscription created successfully",
        "order_id": order_id
    }
