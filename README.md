# 📝 Notes App

A simple **Notes Application** built with **React (frontend)** and **Django REST Framework (backend)** using **JWT authentication**.  
Users can create, view, and delete notes through a clean popup UI. Authentication is handled with JSON Web Tokens (JWT) for secure access to the API.  
The backend is configured with **CORS headers** so the React app can communicate with the Django API.

---

## 🚀 Features
- 🔐 JWT-based authentication (login required to access notes)
- ➕ Create new notes via popup modal
- 📖 View all notes in a responsive grid layout
- ❌ Delete notes with one click
- ⚡ Persistent backend using Django REST API
- 🌍 Configured CORS headers to allow frontend requests

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Axios, CSS, Unicons
- **Backend:** Django, Django REST Framework, SimpleJWT, django-cors-headers
- **API:** RESTful JSON endpoints at `/notes/`

---

## 📦 Installation

### Backend (Django)
```bash
# clone the repo
git clone <your-repo-url>
cd backend

# create virtual environment
python -m venv venv
source venv/bin/activate   # (on Windows: venv\Scripts\activate)

# install dependencies
pip install -r requirements.txt

# run migrations
python manage.py migrate

# run the server
python manage.py runserver

```


### Frontend (React)
```bash
# install dependencies
npm install

# start the dev server
npm start

create a .env frontend root

and fill this in the .env
VITE_API_URL=http://127.0.0.1:8000

```
