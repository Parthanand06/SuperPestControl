from fastapi import FastAPI
from app.schemas import ShowClient, ClientCreate, SubscriptionCreate
from app.services import create_client, create_subscription, show_client
from typing import List
app = FastAPI(title="Pest Control Backend")

@app.get('/',response_model=List[ShowClient])
def show():
    return show_client()
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


from fastapi import HTTPException
import oracledb

@app.post("/subscriptions")
def create_subscription_api(payload: SubscriptionCreate):
    try:
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

    except oracledb.IntegrityError as e:
        raise HTTPException(
            status_code=400,
            detail="Subscription already exists or constraint violated"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

