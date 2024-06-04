from flask import Flask, request, jsonify, Blueprint
from db import Database
import hashlib


cursor = Database()


login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=["POST"])
def login():
    if request.method == 'POST':
        cursor.use("information")
        result_json = request.get_json()
        print(result_json)
        classnumber = result_json['classnumber']
        password = result_json['password']
        query = "SELECT classnumber, username, password FROM user WHERE classnumber=%s;"
        params = (classnumber, )
        cursor.query(query, params)
        result = cursor.fetchone()
        encoded_password = hashlib.sha256(password.encode()).hexdigest()
        if result["classnumber"] == classnumber:
            if result["password"] == encoded_password:
                return jsonify(
                    # access_token = create_access_token(identity = classnumber, expires_delta= False), username = result['username'],
                    ok = True)
            else:
                return jsonify(
                    result_id = "ok", result="fail"
                )
        else:
            return jsonify(False)
