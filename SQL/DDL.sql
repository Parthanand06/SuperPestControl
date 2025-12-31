create table USR_TBL (
    user_id        NUMBER PRIMARY KEY,
    user_name      VARCHAR2(100),
    phone_no       VARCHAR2(15),
    created_ts     TIMESTAMP
);


create table SVC_TBL (
    service_id     NUMBER PRIMARY KEY,
    service_name   VARCHAR2(100),
    description    VARCHAR2(255),
    price          NUMBER
);


create table ORDER_SUBSCRIPTION (
    order_id           NUMBER PRIMARY KEY,
    user_id            NUMBER,
    service_id         NUMBER,
    service_per_year   NUMBER,
    start_date         DATE,
    end_date           DATE,
    status             VARCHAR2(20),
    created_ts         TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USR_TBL(user_id),
    FOREIGN KEY (service_id) REFERENCES SVC_TBL(service_id)
);



create table SERVICE_VISIT (
    visit_id       NUMBER PRIMARY KEY,
    order_id       NUMBER,
    visit_date     DATE,
    visit_status   VARCHAR2(20), -- PLANNED / DONE / MISSED

    FOREIGN KEY (order_id) REFERENCES ORDER_SUBSCRIPTION(order_id)
);
