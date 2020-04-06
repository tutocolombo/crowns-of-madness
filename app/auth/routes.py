from flask import render_template, redirect, url_for, request, jsonify
from flask_login import login_user, logout_user, current_user
from app import db
from app.auth import bp
from app.models import User
from app.auth.email import send_password_reset_email


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.catch_all'))
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(username=data["username"]).first()
        if user is None or not user.check_password(data["password"]):
            return jsonify(message="Invalid username or password", ok=False)
        login_user(user, remember=data["remember_me"])
        return jsonify(ok=True)
    return render_template('login.html', title='Sign In')


@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@bp.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    data = request.get_json()

    user = User.query.filter_by(username=data["username"]).first()
    if user is not None:
        return jsonify(message="Username already in use. Please choose a different one.", ok=False)
    user = User.query.filter_by(email=data["email"]).first()
    if user is not None:
        return jsonify(message="Email adress already linked to an account. Please use a different one.", ok=False)

    user = User(username=data["username"], email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify(message='Congratulations, you are now a registered user!', ok=True)


@bp.route('/reset_password_request', methods=['POST'])
def reset_password_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()
    if user:
        send_password_reset_email(user)
        return jsonify(message='Check your email for the reset password token', ok=True)
    return jsonify(message='User does not exist.', ok=False)


@bp.route('/reset_password', methods=['POST'])
def reset_password():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    data = request.get_json()
    user = User.verify_reset_password_token(data["token"])
    if not user:
        return jsonify(message='Invalid token', ok=False)
    user.set_password(data["password"])
    db.session.commit()
    return jsonify(message='Your password has been reset.', ok=True)
