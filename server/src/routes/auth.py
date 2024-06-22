from flask import Blueprint, request, jsonify  
# auth.py
from server.src.database import db
from models.User import User

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/sign-up', methods=['POST'])
def sign_up():
    print("Sign up route hit")
    form_data = request.json
    
    # create new user object
    new_user = User(
        first_name=form_data['firstname'],
        last_name=form_data['lastname'],
        username=form_data['username'],
        email=form_data['email'],
        password=form_data['password']
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User signed up successfully'}), 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    print("Login route hit")
    form_data = request.json
    
    # Check if user exists
    user = User.query.filter_by(email=form_data['email']).first()
    if user is None:
        print("User not found")
        return jsonify({'message': 'User not found'}), 404
    
    # Check if password is correct
    if user.password != form_data['password']:
        print("Incorrect password")
        return jsonify({'message': 'Incorrect password'}), 401

    
    return jsonify({'username': user.username}), 200