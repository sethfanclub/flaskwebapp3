from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from os import getenv


load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DB_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
api = Api(app)

class Flavors(Resource):
    def post(self):
        pass
    def get(self):
        pass
    def put(self):
        pass
    def delete(self):
        pass

if __name__ == "__main__":
    app.run(debug=True)