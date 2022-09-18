from flask import Flask, jsonify, request
import json
import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from flask_socketio import SocketIO, leave_room, join_room, send, emit

load_dotenv()

# Create a Flask server.
app = Flask(__name__)
socketio = SocketIO(app)

connection = psycopg2.connect(dsn=os.environ["DATABASE_URL"], application_name="$ docs_quickstart_python")
connection.set_session(autocommit=True)
cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

# socketio methods
@socketio.on("connect")
def connect():
    print("Connected!")

@socketio.on("changeRoom")
def changeRoom(data):
    join_room(data["name"])

@socketio.on("sendMessage")
def sendMessage(data):
    emit("receiveMessage", {"message": data["message"], "user": data["user"]}, to=data["room"])

# database methods

def db_register(name, phone, email, password):
    cursor.execute(
        "INSERT INTO users (name, phone, email, password) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, email, password))
    result = cursor.fetchall()
    return result

def db_login(email, password):
    cursor.execute(
        "SELECT password FROM users WHERE email = '" + email + "'")
    db_password = cursor.fetchone()['password']
    if (password == db_password):
        cursor.execute(
        "SELECT id FROM users WHERE email = '" + email + "'")
        return cursor.fetchone()
    else:
        return "access denied"

def db_userinfo (id):
    cursor.execute(
        "SELECT * FROM users WHERE id = '" + id + "'")
    result = cursor.fetchone()
    return result

def db_postbike (address, picture, rate_h, time_limit, bike_model, owner) :
    cursor.execute(
        "INSERT INTO bikes (address, picture, rate_h, time_limit, bike_model, owner) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (address, picture, rate_h, time_limit, bike_model, owner))
    result = cursor.fetchall()
    return result

def db_bikebyid (id):
    cursor.execute(
        "SELECT * FROM bikes WHERE id = '" + id + "'")
    result = cursor.fetchone()
    return result

def db_filterbikes (rate, time, model):
    filter_sql = ''
    filter_list = ['SELECT * FROM bikes WHERE 1=1 ']
    if (rate) :
        filter_list.append('rate_h <= ' + rate)
    if (time): 
        filter_list.append('time_limit >= ' + time)
    if (model):
        filter_list.append('bike_model = ' + model)
    filter_sql+=" AND ".join(filter_list)
    print(filter_sql)
    cursor.execute(
        filter_sql
    )
    result = cursor.fetchall()
    return result


# user routes

@app.route("/register", methods=['POST'])
def register():
    try:
        res = db_register(request.args['name'], request.args['phone'], request.args['email'], request.args['password'])
        return jsonify(res)

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/login", methods=['GET'])
def login():
    try:
        res = db_login(request.args['email'], request.args['password'])
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/user", methods=['GET'])
def get_user_by_id():
    try:
        res = db_userinfo(request.args['id'])
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)})

# bike routes

@app.route("/bike", methods=['POST'])
def post_bike():
    try:
        r = json.loads(request.data)
        print(r)
        res = db_postbike(r['address'], r['picture'], r['rate_h'], r['time_limit'], r['bike_model'], r['owner'])
        return jsonify(res)

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/bike", methods=['GET'])
def get_bikebyid():
    try:
        res = db_bikebyid(request.args['id'])
        return jsonify(res)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/search", methods=['GET'])
def filter_bikes():
    rate = None
    time = None
    model = None
    if(request.args.get('rate_h')):
        rate = request.args['rate_h'] 
    if(request.args.get('time_limit')):
        time = request.args['time_limit']
    if(request.args.get('bike_model')):
        model = request.args['bike_model']
    
    result = db_filterbikes(rate, time, model)
    return jsonify(result)

# tutorial stuff:

'''
def db_get_all():
    cursor.execute('SELECT * FROM airbnbs')
    results = cursor.fetchall()
    return results


def db_get_by_id(id):
    cursor.execute('SELECT * FROM airbnbs WHERE id = %s', (id, ))
    result = cursor.fetchone()
    return result


def db_filter_listings(min_year, group):
    cursor.execute(
        'SELECT * FROM airbnbs WHERE neighbourhood_group = %s AND year >= %s',
        (group, min_year))
    result = cursor.fetchall()
    return result


def db_update_title(id, new_title):
    cursor.execute("UPDATE airbnbs SET title = %s WHERE id = %s RETURNING id",
                   (new_title, id))
    result = cursor.fetchall()
    return result


def db_delete_listing(id):
    cursor.execute("DELETE FROM airbnbs WHERE id = %s RETURNING id", (id, ))
    result = cursor.fetchall()
    return result


# Routes!
@app.route('/', methods=['GET'])
def index():
    return jsonify(db_get_all())


@app.route("/<id>", methods=['GET'])
def get_by_id(id):
    airbnb = db_get_by_id(id)
    if not airbnb:
        return jsonify({"error": "invalid id", "code": 404})
    return jsonify(airbnb)


@app.route("/search", methods=['GET'])
def filter_listings():
    result = db_filter_listings(int(request.args.get('min_year')),
                                request.args.get('group'))
    return jsonify(result)


@app.route("/", methods=['POST'])
def create_airbnb():
    new_airbnb = request.json
    try:
        res = db_create_airbnb(new_airbnb['title'], new_airbnb['name'],
                               new_airbnb['neighbourhood'],
                               new_airbnb['neighbourhood_group'],
                               new_airbnb['verified'], new_airbnb['year'])
        return jsonify(res)

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/<id>", methods=['PUT'])
def update_title(id):
    try:
        title = request.json['title']
      
        return jsonify(db_update_title(id, title))
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/<id>", methods=['DELETE'])
def delete_book(id):
    try:
        return jsonify(db_delete_listing(id))
    except Exception as e:
        return jsonify({"error": str(e)})

'''

if __name__ == '__main__':
    app.run(debug=True)