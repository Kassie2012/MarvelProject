# Friends of Humanity Mutant Database

## Overview
The **Friends of Humanity (FoH)** have decided to create their own mutant database to catalog and monitor mutants from around the world.  
This fictional web application is based in the **X-Men universe** and lists **heroes** and **villains** alike, reflecting the group's agenda of identifying and tracking all mutants, regardless of their alignment.

This project was created as part of a learning experience using **React**, **Flask**, and **MySQL**, with styling provided by **Bootstrap**.

---

## Features
- **Mutant Index** – View all mutants in the database (Heroes, Villains, Neutral).  
- **Mutant Details Page** – View detailed information about each mutant and their abilities.  
- **Add Mutant** – Users can submit new mutants to the database (stored separately as user-created).  
- **Edit Mutant** – User-created mutants can be edited to update information.  
- **Delete Mutant** – User-created mutants can also be deleted.

---

## Tech Stack
### Frontend
- React
- React Bootstrap
- React Router DOM

### Backend
- Flask (Python)
- MySQL Database
- Flask-CORS for cross-origin requests

---

## Database Structure
### Table: `characters`
- **id** – Primary Key  
- **name** – Name of the mutant  
- **alias** – Known alias or code name  
- **alignment** – Hero / Villain / Neutral  
- **powers** – Description of mutant powers  
- **image_url** – Link to character image  
- **user_created** – Boolean (whether this record was added by a user)


