import oracledb

def get_connection():
    return oracledb.connect(
        user="PESTCONTROL",
        password="Abc@1234",
        dsn="localhost:1521/ORCLPDB"
    )