from flask import Blueprint
import pymysql
import pymysql.cursors
from config import Config




database_bp = Blueprint('database', __name__)

class Database():
    def __init__(self):
        self.connection = pymysql.connect(
            host = Config.host,
            user = Config.user,
            password = Config.password,
            database = Config.database,
            charset = Config.charset
        )
        self.cursor = self.connection.cursor()
    def use(self, database):
        self.cursor.execute("USE {}".format(database) )
    
    def query(self, query, params):
        self.cursor.execute(query, params)

    def fetchone(self):
        self.cursor.fetchone()
        
    def fetchall(self):
        self.cursor.fetchall()


    
    