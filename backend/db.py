import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Siri@1234",
        database="ai_parser"
    )
