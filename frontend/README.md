M7PROJECT Mutant Database
Overview

The Friends of Humanity (FoH) have created a satirical “classified” mutant database to track and catalog mutants from around the world.

This fictional application is inspired by the X-Men universe, designed to log both heroes and villains—mirroring the FoH’s obsessive mission to monitor all mutants, regardless of alignment.

The project was built as part of a full-stack learning experience using React, Flask, and MySQL, styled with Bootstrap.

Features

Mutant Index – Browse all mutants in the database (Heroes, Villains, Neutral).
Mutant Details – View powers, aliases, and alignment for each mutant.
Add Mutant – Submit custom mutants (saved as user-created records).
Edit Mutant – Update alias, alignment, or powers for user-created entries.
Delete Mutant – Remove user-created records (official database entries remain locked).

Tech Stack
Frontend
React
React Bootstrap
React Router DOM

Backend
Flask (Python)
MySQL
Flask-CORS for cross-origin support
Database Structure
Table: characters

id – Primary Key
name – Real name of the mutant
alias – Codename / alias
alignment – Hero / Villain / Neutral
powers – Description of abilities
image_url – Character image link
user_created – Boolean (True = user-added, False = official database entry)

Getting Started
Prerequisites

Node.js & npm
Python 3.x
MySQL
Backend Setup (Flask + MySQL)

Navigate to the backend folder:

cd backend


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows


Install dependencies:

pip install -r requirements.txt

Run the server:
python server.py

Frontend Setup (React)
Navigate to the frontend folder:

cd frontend
Install dependencies:

npm install

Run the app:
npm run dev