# Lost & Found Management API

A REST API for reporting and managing lost and found items. It is built with Node.js and Express 5. The current version stores data in a JavaScript array in memory; it does not use a database.

## Technologies

- Node.js
- Express 5
- JavaScript
- Postman

## Requirements

- Node.js 22.9 or later
- npm

## Installation and Run

1. Clone or download this repository.
2. Open the project folder in a terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your local environment file by copying `.env.example` to a new file named `.env`.
5. Open `.env` and replace the example value with your own long, random token:

   ```env
   AUTH_TOKEN=your-own-long-random-token
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   Or start it normally:

   ```bash
   npm start
   ```

7. Open the API at `http://localhost:3000`.

**Important:** Keep your `.env` file private. It is ignored by Git and must never be uploaded to GitHub. The `.env.example` file is safe to share because it contains only a placeholder.

## Authentication for DELETE

The DELETE route requires an authentication token.

In Postman, open the **Headers** tab and add:

| Key | Value |
|---|---|
| `x-auth-token` | The same value you set for `AUTH_TOKEN` in your local `.env` file |

A DELETE request without the correct header receives **401 Unauthorized**.

## API Routes

| Method | Path | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/items` | List all reports |
| GET | `/items/:id` | Get one report by ID |
| POST | `/items` | Create a report |
| PUT | `/items/:id` | Update a report |
| DELETE | `/items/:id` | Delete a report (token required) |
| GET | `/items/category` | List items through the category route |
| GET | `/items/category/:name` | Filter items by category |
| GET | `/items/search?q=wallet` | Search reports |
| GET | `/files/*path` | Wildcard route example |
| Any unknown URL | — | Return 404 |

## Example POST/PUT JSON Body

```json
{
  "itemName": "Black Wallet",
  "category": "Personal",
  "location": "University Library",
  "status": "Lost",
  "date": "2026-11-26",
  "description": "Small black wallet"
  "estimatedValue": 150000
}
```

## Postman Tests

The following API endpoints and validation cases were tested successfully using Postman.

| No. | Test | Expected Status |
| --- | --- | --- |
| 1 | GET / – Welcome message | 200 OK |
| 2 | GET /items – Get all items | 200 OK |
| 3 | GET /items/:id – Get item by ID | 200 OK |
| 4 | GET /items/99999 – Unknown item | 404 Not Found |
| 5 | POST /items – Create a new item | 201 Created |
| 6 | POST /items – Missing required fields | 400 Bad Request |
| 7 | PUT /items/:id – Update an item | 200 OK |
| 8 | DELETE /items/:id – Delete an item with authentication | 200 OK |
| 9 | DELETE /items/:id – Delete without authentication | 401 Unauthorized |
| 10 | GET /items/search?q=wallet – Search items | 200 OK |
| 11 | GET /items/category/Electronics – Filter by category | 200 OK |

Postman screenshots are saved in the `screenshots` folder.

## Project Structure

```text
Lost-Found-API/
├── index.js
├── middleware.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── README.md
├── routes/
│   └── items.js
└── screenshots/
    └── Postman test screenshots
```

## Notes

- New item IDs are generated automatically.
- Data resets when the server restarts because it is stored in memory.
- The `node_modules` folder is installed by npm and is not included in the repository.
- Do not commit private tokens, passwords, or your local `.env` file.
