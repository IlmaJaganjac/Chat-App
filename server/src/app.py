from flask import Flask
from flask_cors import CORS
from database import db
from views.auth import auth_blueprint

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configure MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Konacno11!!@localhost/twit_credentials'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

def register_blueprints(app):
    app.register_blueprint(auth_blueprint, url_prefix='/api')
    print('Registered blueprints')

if __name__ == '__main__':
    register_blueprints(app)

    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)
