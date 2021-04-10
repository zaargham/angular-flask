from flask import Flask, jsonify, request, make_response
import os
import jwt 
import datetime
from functools import wraps
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

CORS(app)

app.config['SECRET_KEY'] = 'cvisionsecretkey'

UPLOAD_FOLDER = 'static/uploads/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') 

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 403

        return f(*args, **kwargs)

    return decorated


@app.route('/protected',methods=['POST'])
@token_required
def protected():
    if 'file' not in request.files:
        print('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        print('No image selected for uploading')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
         
        print('Image successfully ')
        return jsonify({'filename':filename})
    else:
        print('Allowed image types are -> png, jpg, jpeg, gif')
        return redirect(request.url)
    return jsonify({'message' : 'This is only available with valid tokens.'})

@app.route('/login/')
@limiter.limit("1/minute", override_defaults=False)
def login():
    token = jwt.encode({'user' : 'zargham', 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=15)}, app.config['SECRET_KEY'])

    return jsonify({'token' : token.decode('UTF-8')})


if __name__ == '__main__':
    app.run(debug=True)
