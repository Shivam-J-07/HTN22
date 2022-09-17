import os
import psycopg2
# import psycopg2.extras
from dotenv import load_dotenv

load_dotenv()

# database exec statement
def exec_statement(conn, stmt):
    try:
        with conn.cursor() as cur:
            cur.execute(stmt)
            row = cur.fetchone()
            conn.commit()
            if row: print(row[0])
    except psycopg2.ProgrammingError as e:
        print(e)
        return

def main():

    # Connect to CockroachDB
    connection = psycopg2.connect(dsn=os.environ["DATABASE_URL"], application_name="$ docs_quickstart_python")
    connection.set_session(autocommit=True)

    statements = [
        # CREATE users table
        "CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name STRING, phone INT, email STRING, password STRING, user_rooms UUID[])",
        # CREATE rooms table
        "CREATE TABLE IF NOT EXISTS rooms (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), messages STRING[], room_users UUID[])",
        # CREATE bikes table
        "CREATE TABLE IF NOT EXISTS bikes (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), latitude FLOAT, longitude FLOAT, picture BYTES, rate_h FLOAT, time_limit FLOAT, bike_model STRING, owner UUID)",
        # CREATE ticket table
        "CREATE TABLE IF NOT EXISTS tickets (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), bike UUID, user_list UUID[], received TIMESTAMPTZ, returned TIMESTAMPTZ)"
    ]

    for statement in statements:
        print(exec_statement(connection, statement)
)
    # Close communication with the database
    connection.close()


if __name__ == "__main__":
    main()