from datetime import date
from dateutil.relativedelta import relativedelta
from app.database import get_connection

def calculate_end_date(start_date: date) -> date:
    return start_date + relativedelta(months=12) - relativedelta(days=1)


def generate_service_visits(start_date: date, service_per_year: int):
    gap_months = int(12 / service_per_year)
    return [
        start_date + relativedelta(months=i * gap_months)
        for i in range(service_per_year)
    ]

def show_client():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM USR_TBL")

    columns = [col[0].lower() for col in cur.description]
    all_client = [dict(zip(columns, row)) for row in cur.fetchall()]

    conn.close()
    return all_client

def create_client(user_name: str, phone_no: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT NVL(MAX(user_id),0)+1 FROM USR_TBL")
    user_id = cur.fetchone()[0]

    cur.execute("INSERT INTO USR_TBL (user_id, user_name, phone_no, created_ts) VALUES (:1, :2, :3, SYSTIMESTAMP)", (user_id, user_name, phone_no))

    conn.commit()
    conn.close()
    return user_id


def create_subscription(user_id, service_id, service_per_year, start_date):
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT NVL(MAX(order_id),0)+1 FROM ORDER_SUBSCRIPTION")
        order_id = cur.fetchone()[0]

        end_date = calculate_end_date(start_date)

        cur.execute("""
            INSERT INTO ORDER_SUBSCRIPTION
            (order_id, user_id, service_id, service_per_year,
             start_date, end_date, status, created_ts)
            VALUES (:1,:2,:3,:4,:5,:6,'ACTIVE',SYSTIMESTAMP)
        """, (
            order_id, user_id, service_id,
            service_per_year, start_date, end_date
        ))

        visit_dates = generate_service_visits(start_date, service_per_year)

        for visit_date in visit_dates:
            cur.execute("SELECT NVL(MAX(visit_id),0)+1 FROM SERVICE_VISIT")
            visit_id = cur.fetchone()[0]

            cur.execute("""
                INSERT INTO SERVICE_VISIT
                (visit_id, order_id, visit_date, visit_status)
                VALUES (:1, :2, :3, 'PLANNED')
            """, (visit_id, order_id, visit_date))

        conn.commit()

    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

    return order_id