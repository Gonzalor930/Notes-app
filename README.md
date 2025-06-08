# Notes App – Full Stack (Spring Boot + React)

This is a full stack notes application developed for a technical challenge. The app allows users to create, edit, delete, archive/unarchive, and categorize their notes through a responsive and intuitive interface.

## 📁 Project Structure

    notes-app/
│
├── backend/ # Java Spring Boot backend (REST API)
│ └── src/main/java/...
│
├── frontend/ # React frontend (SPA)
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── api.js
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
│
├── setup.sh # Script to start backend and frontend together
└── README.md


---

## ⚙️ Requirements & Versions

| Tool / Runtime        | Version        |
|----------------------|----------------|
| Java                 | 17             |
| Maven                | 3.8+           |
| Spring Boot          | 3.5.0          |
| PostgreSQL           | 15+            |
| Node.js              | 18.17+         |
| npm                  | 9+             |
| Vite                 | 5+             |
| React                | 18+            |
| Axios                | 1+             |
| React Router DOM     | 6+             |

---

## 🚀 Setup & Run Instructions

To run both the backend and frontend with a single command:

```bash
chmod +x setup.sh
./setup.sh

The script will:

Start the backend using mvn spring-boot:run

Wait 15 seconds to ensure the backend is ready

Start the frontend using npm run dev

The 15-second delay is necessary to avoid launching the frontend before the backend is fully ready, which could cause initial connection issues.

 If the frontend loads with an error (e.g. notes not fetched), simply refresh the page after a few seconds once the backend is ready.

Once running, access the app at:
📍 http://localhost:5173

🔧 Backend – Spring Boot
Features
RESTful API for notes and categories

Create, update, delete, archive/unarchive notes

Assign multiple categories to notes

Use of JPA (Hibernate) with PostgreSQL

Validation with Jakarta Bean Validation

CORS configuration for frontend communication

Endpoints
Base URL: http://localhost:8080/api

📘 Notes
    | Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/notes`                     | Create a new note       |
| GET    | `/notes/active`              | List all active notes   |
| GET    | `/notes/archived`            | List all archived notes |
| PUT    | `/notes/{id}`                | Update a note by ID     |
| DELETE | `/notes/{id}`                | Delete a note by ID     |
| PATCH  | `/notes/{id}/toggle-archive` | Toggle archive status   |

Note format (JSON):

            {
        "title": "Example Title",
        "content": "Example content",
        "archived": false,
        "categories": [
            { "id": 1 },
            { "id": 2 }
        ]
        }

🗂️ Categories
| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/categories`      | Create a new category   |
| GET    | `/categories`      | List all categories     |
| DELETE | `/categories/{id}` | Delete a category by ID |

🎨 Frontend – React
This is the frontend of the Notes App, a single-page application (SPA) built using React. It connects to the backend API via HTTP and provides a smooth user experience.

Features
List active and archived notes

Create new notes with title, content, and categories

Edit and delete existing notes

Archive/unarchive notes

Filter notes by category

Responsive and clean UI

Technologies
React 18+

React Router DOM

Axios

Vite

CSS (custom styling, no frameworks)

🧪 API Testing (Optional)
You can also test the backend endpoints manually using Postman or curl.

Example:

curl -X POST http://localhost:8080/api/notes \
-H "Content-Type: application/json" \
-d '{"title":"Test","content":"Hello","archived":false,"categories":[]}'

📌 Notes
The frontend uses relative paths like /api/notes and proxies them to http://localhost:8080 via vite.config.js

Make sure PostgreSQL is running and accessible with the correct credentials defined in application.properties

The database schema is auto-generated using Spring JPA