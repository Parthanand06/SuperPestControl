INSERT INTO SVC_TBL (service_id, service_name, description, price)
VALUES (1, 'Termite Control', 'Complete termite treatment for home', 4500);

INSERT INTO SVC_TBL (service_id, service_name, description, price)
VALUES (2, 'Cockroach Control', 'Gel-based cockroach treatment', 1800);

INSERT INTO SVC_TBL (service_id, service_name, description, price)
VALUES (3, 'Mosquito Control', 'Outdoor and indoor mosquito treatment', 2500);


INSERT INTO USR_TBL (user_id, user_name, phone_no, created_ts)
VALUES (101, 'Rahul Patil', '9876543210', SYSTIMESTAMP);

INSERT INTO USR_TBL (user_id, user_name, phone_no, created_ts)
VALUES (102, 'Sneha Kulkarni', '9123456780', SYSTIMESTAMP);


INSERT INTO ORDER_SUBSCRIPTION (
    order_id,
    user_id,
    service_id,
    service_per_year,
    start_date,
    end_date,
    status,
    created_ts
)
VALUES (
    1001,
    101,
    1,
    2,
    DATE '2025-02-01',
    ADD_MONTHS(DATE '2025-02-01', 12) - 1,
    'ACTIVE',
    SYSTIMESTAMP
);

INSERT INTO ORDER_SUBSCRIPTION (
    order_id,
    user_id,
    service_id,
    service_per_year,
    start_date,
    end_date,
    status,
    created_ts
)
VALUES (
    1002,
    102,
    2,
    4,
    DATE '2025-01-15',
    ADD_MONTHS(DATE '2025-01-15', 12) - 1,
    'ACTIVE',
    SYSTIMESTAMP
);


INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5001, 1001, DATE '2025-02-01', 'PLANNED');

INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5002, 1001, ADD_MONTHS(DATE '2025-02-01', 6), 'PLANNED');


INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5003, 1002, DATE '2025-01-15', 'PLANNED');

INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5004, 1002, ADD_MONTHS(DATE '2025-01-15', 3), 'PLANNED');

INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5005, 1002, ADD_MONTHS(DATE '2025-01-15', 6), 'PLANNED');

INSERT INTO SERVICE_VISIT (visit_id, order_id, visit_date, visit_status)
VALUES (5006, 1002, ADD_MONTHS(DATE '2025-01-15', 9), 'PLANNED');


SELECT u.user_name,
       s.service_name,
       o.start_date,
       o.end_date,
       o.service_per_year
FROM ORDER_SUBSCRIPTION o
JOIN USR_TBL u ON u.user_id = o.user_id
JOIN SVC_TBL s ON s.service_id = o.service_id;
