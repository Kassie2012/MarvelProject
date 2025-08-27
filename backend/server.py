from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'marvel'

mysql = MySQL(app)

# Get all characters
@app.route('/characters', methods=['GET'])
def get_characters():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM characters ORDER BY id ASC")
    rows = cur.fetchall()
    cur.close()

    characters = []
    for row in rows:
        characters.append ({
            'id': row[0],
            'name': row[1],
            'alias': row[2],
            'alignment': row[3],
            'powers': row[4],
            'image_url': row[5],
            'userCreated': bool(row[6])
        })

    return jsonify(characters)

# Get a character by ID
@app.route('/characters/<int:character_id>', methods=['GET'])
def get_character(character_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM characters WHERE id = %s", (character_id,))
    row = cur.fetchone()
    cur.close()

    if not row:
        return jsonify({'message': 'Character not found'}), 404

    character = {
        'id': row[0],
        'name': row[1],
        'alias': row[2],
        'alignment': row[3],
        'powers': row[4],
        'image_url': row[5],
        'userCreated': bool(row[6])
    }

    return jsonify(character)

#add a character

@app.route('/characters', methods=['POST'])
def add_character():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    alias = data.get('alias', '').strip()
    powers = data.get('powers', '').strip()
    alignment = (data.get('alignment') or 'neutral').strip().lower()
    image_url = data.get('image_url', '').strip()

    if not name or not powers:
        return jsonify({'message': 'Name and powers are required fields'}), 400

    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO characters (name, alias, alignment, powers, image_url, user_created)
        VALUES (%s, %s, %s, %s, %s, TRUE)
    """, (name, alias, alignment, powers, image_url))
    
    mysql.connection.commit()
    new_id= cur.lastrowid
    cur.close()

    return jsonify({
        'message': 'Character added successfully', 
        'id': new_id, 
        'userCreated': True}), 201

# Update a character

@app.route('/characters/<int:character_id>', methods=['PUT'])
def update_character(character_id):
    data = request.get_json() or {}
    name = (data.get('name') or '').strip()
    alias = (data.get('alias') or '').strip()
    powers = (data.get('powers') or '').strip()
    alignment = (data.get('alignment') or 'neutral').strip().lower()
    image_url = (data.get('image_url') or '').strip()

    cur = mysql.connection.cursor()

    # Check if the character exists
    cur.execute("SELECT id FROM characters WHERE id = %s", (character_id,))
    if not cur.fetchone():
        cur.close()
        return jsonify({'message': 'Character not found'}), 404

    # Update the character
    cur.execute("Select id FROM characters WHERE id = %s", (character_id,))
    if not cur.fetchone():
        cur.close()
        return jsonify({'message': 'Character not found'}), 404

    cur.execute("""
        UPDATE characters
        SET name = %s, alias = %s, alignment = %s, powers = %s, image_url = %s
        WHERE id = %s
    """, (name, alias, alignment, powers, image_url, character_id))
    
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Character updated successfully'})
    
# Delete a character

@app.route('/characters/<int:character_id>', methods=['DELETE'])
def delete_character(character_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT user_created FROM characters WHERE id = %s", (character_id,))
    result = cur.fetchone()
    
    if not result:
        cur.close()
        return jsonify({'message': 'Character not found'}), 404

    user_created = result[0]
    if not user_created:
        return jsonify({'message': 'You cannot delete database mutants'}), 403

    cur.execute("DELETE FROM characters WHERE id = %s", (character_id,))
    mysql.connection.commit()
    cur.close()
    
    return jsonify({'message': 'Character deleted successfully'})



if __name__ == '__main__':
    app.run(debug=True)