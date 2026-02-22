from fastapi import FastAPI
from app.schemas import ShowClient, ClientCreate, SubscriptionCreate, GetUserDetails
from app.services import create_client, create_subscription, show_client, get_user_details_by_id
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from typing import List
app = FastAPI(title="Pest Control Backend")

app.mount("/static", StaticFiles(directory="app/static"), name="static")


# Templates
templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "active_page": "clients"}
    )


@app.get("/add-client")
def add_client_page(request: Request):
    return templates.TemplateResponse(
        "add_client.html",
        {"request": request, "active_page": "add_client"}
    )


@app.get("/subscriptions")
def subscription_page(request: Request):
    return templates.TemplateResponse(
        "subscriptions.html",
        {"request": request, "active_page": "subscriptions"}
    )

@app.get("/userdetails-page/{user_id}")
def user_details_page(request: Request, user_id: int):
    return templates.TemplateResponse(
        "user_details.html",
        {"request": request, "active_page": "clients", "user_id": user_id}
    )

@app.get("/client-details")
def client_details_page(request: Request):
    return templates.TemplateResponse(
        "client_details.html",
        {"request": request, "active_page": "client_details"}
    )

@app.get("/create-client-subscription")
def create_client_subscription_page(request: Request):
    return templates.TemplateResponse(
        "create_client_subscription.html",
        {"request": request, "active_page": "create_client_subscription"}
    )




@app.get("/api/clients", response_model=List[ShowClient])
def get_clients():
    return show_client()

@app.post("/add-client")
def create_client_api(payload: ClientCreate):
    print("Here1")
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

@app.get("/userdetails/{user_id}", response_model=List[GetUserDetails])
def get_usr_details_by_id(user_id: int):
    return get_user_details_by_id(user_id)

