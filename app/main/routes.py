from app import pusher
from app.main import bp
from flask import render_template, jsonify
from random import *
from flask_login import login_required  # , current_user


@bp.route('/api/random')
def random_number():
    response = {
        'randomNumber': randint(1, 100)
    }
    pusher.client.trigger(u'my-channel', u'my-event',
                          {u'message': u'hello world'})
    return jsonify(response)


@bp.route('/api/pusher_app')
@login_required
def get_pusher_app_id():
    cluster = pusher.client.host.split(".")[0].split("-")[1]
    response = {
        'key': pusher.client.key,
        'cluster': cluster
    }
    return jsonify(response)


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
@login_required
def catch_all(path):
    return render_template("index.html")
