from flask import Flask, request, abort
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields
from dotenv import load_dotenv
from os import getenv


load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = getenv("SECRET_KEY")
app.config["TESTING"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DB_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

api = Api(app)

class FlavorModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Flavor(id={self.id}, name={self.name})"

class FlavorSchema(Schema):
    id = fields.Int()
    name = fields.Str()

flavor_schema = FlavorSchema()

class Flavor(Resource):
    def post(self, id):
        self.abort_if_id_is_not_digit(id)

        flavor_exists = bool( FlavorModel.query.get(id) )
        if flavor_exists:
            abort(400, f"Cannot make a new flavor with id '{id}' as it is already taken")

        errors = flavor_schema.validate(request.json)
        if errors: 
            abort(400, str(errors))
        
        new_flavor_name = request.json["name"]
        new_flavor = FlavorModel(id=id, name=new_flavor_name)
        db.session.add(new_flavor)
        db.session.commit()

        return f"Added flavor '{new_flavor_name}' with id '{id}'"

    def get(self, id):
        if id == "all":
            flavors = FlavorModel.query.order_by(FlavorModel.id).all()
            result = flavor_schema.dump(flavors, many=True)
        else:
            self.abort_if_id_is_not_digit(id)

            flavor = FlavorModel.query.filter_by(id=id).first()
            if not flavor:
                abort(400, f"Flavor with id '{id}' does not exist")
            result = flavor_schema.dump(flavor)

        return result

    def patch(self, id):
        self.abort_if_id_is_not_digit(id)

        request_data = request.json
        errors = flavor_schema.validate(request_data)
        if errors:
            abort(400, str(errors))
        
        flavor_to_be_updated = FlavorModel.query.filter_by(id=id).first()
        for key, value in request_data.items():
            if key == "id":
                abort(400, "Cannot change the id")
            setattr(flavor_to_be_updated, key, value)
        db.session.commit()

        return f"Updated flavor with id '{id}'"

    def delete(self, id):
        self.abort_if_id_is_not_digit(id)
            
        flavor_to_be_deleted = FlavorModel.query.filter_by(id=id).first()
        db.session.delete(flavor_to_be_deleted)
        db.session.commit()

        return f"Deleted flavor with id '{id}'"

    def abort_if_id_is_not_digit(self, id):
        if not id.isdigit():
            abort(400, f"Your id '{id}' must either be a number or 'all'")

api.add_resource(Flavor, "/api/flavors/<string:id>")

if __name__ == "__main__":
    app.run(debug=True)