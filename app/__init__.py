from flask import Flask
from pusher import Pusher
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail


cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'auth.login'
mail = Mail()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    mail.init_app(app)

    app.pusher_client = Pusher(
        app_id=app.config['PUSHER_APP_ID'],
        key=app.config['PUSHER_APP_KEY'],
        secret=app.config['PUSHER_APP_SECRET'],
        cluster=app.config['PUSHER_APP_CLUSTER'],
        ssl=True
    )

    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    return app


from app import models
