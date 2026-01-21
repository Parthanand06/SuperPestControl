import oracledb

def get_connection():
    return oracledb.connect(
        user="SYSDBA",
        password="Abc@1234",
        dsn="localhost:1521/orcl"
    )

conn = get_connection()
cur = conn.cursor()

cur.execute("select * from dual")