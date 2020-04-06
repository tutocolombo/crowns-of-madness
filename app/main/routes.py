# from app import pusher_client
from app.main import bp
from flask import current_app
from flask import render_template, jsonify
from random import *
from flask_login import login_required


@bp.route('/api/random')
def random_number():
    response = {
        'randomNumber': randint(1, 100)
    }
    current_app.pusher_client.trigger(u'my-channel', u'my-event',
                                      {u'message': u'hello world'})
    return jsonify(response)


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
@login_required
def catch_all(path):
    return render_template("index.html")
