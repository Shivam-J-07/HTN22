from flask import Flask, jsonify, request
import json
import os
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

load_dotenv()

# Create a Flask server.
app = Flask(__name__)

connection = psycopg2.connect(dsn=os.environ["DATABASE_URL"], application_name="$ docs_quickstart_python")
connection.set_session(autocommit=True)
cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

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

# routes

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