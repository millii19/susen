from flask import Flask



app = Flask(__name__)


@app.route('/version')
def version():
    return {
        "version": "0.0.1-beta_1.3.44"
    }