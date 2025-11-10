# Song Management Backend API

A RESTful API for managing songs built with Node.js, Express, MongoDB, and TypeScript.

## Features

- ✅ CRUD operations for songs
- ✅ Filtering by genre, artist, album
- ✅ Search functionality
- ✅ Pagination support
- ✅ Comprehensive statistics endpoint
- ✅ Clean layered architecture
- ✅ TypeScript for type safety
- ✅ MongoDB aggregation pipelines

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Type safety

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.ts        # MongoDB connection
│   │   └── env.ts       # Environment variables
│   ├── models/          # Mongoose models
│   │   └── Song.ts      # Song model
│   ├── routes/          # API routes
│   │   ├── songRoutes.ts
│   │   └── statsRoutes.ts
│   ├── controllers/     # Request handlers
│   │   ├── songController.ts
│   │   └── statsController.ts
│   ├── services/        # Business logic
│   │   ├── songService.ts
│   │   └── statsService.ts
│   ├── middlewares/     # Custom middlewares
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── utils/           # Utility functions
│   │   ├── ApiError.ts
│   │   └── ApiResponse.ts
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── package.json
├── tsconfig.json
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository and navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB URI:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/song-management
NODE_ENV=development
```

### Running the Application

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## API Endpoints

### Songs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs` | Get all songs (with filtering, search, pagination) |
| GET | `/api/songs/:id` | Get song by ID |
| POST | `/api/songs` | Create a new song |
| PUT | `/api/songs/:id` | Update song by ID |
| DELETE | `/api/songs/:id` | Delete song by ID |

### Statistics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get comprehensive statistics |

## API Usage Examples

### Create a Song
```bash
POST /api/songs
Content-Type: application/json

{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "album": "A Night at the Opera",
  "genre": "rock"
}
```

### Get All Songs (with filters)
```bash
GET /api/songs?genre=rock&page=1&limit=10
GET /api/songs?search=queen
GET /api/songs?artist=Queen&album=A Night at the Opera
```

### Update a Song
```bash
PUT /api/songs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "genre": "pop"
}
```

### Delete a Song
```bash
DELETE /api/songs/:id
```

### Get Statistics
```bash
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "totals": {
      "songs": 100,
      "artists": 50,
      "albums": 75,
      "genres": 10
    },
    "songsPerGenre": {
      "rock": 30,
      "pop": 25,
      "jazz": 20
    },
    "songsPerArtist": {
      "Queen": 15,
      "The Beatles": 12
    },
    "songsPerAlbum": {
      "Abbey Road": 8,
      "A Night at the Opera": 7
    },
    "albumsPerArtist": {
      "Queen": 5,
      "The Beatles": 8
    },
    "mostCommonGenre": "rock",
    "leastCommonGenre": "classical",
    "topArtist": {
      "name": "Queen",
      "songs": 15
    },
    "genreDistribution": {
      "rock": "30.00%",
      "pop": "25.00%",
      "jazz": "20.00%"
    }
  }
}
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Architecture

This project follows a clean layered architecture:

1. **Routes Layer** - Define endpoints and map to controllers
2. **Controllers Layer** - Handle HTTP requests/responses, validation
3. **Services Layer** - Business logic and data operations
4. **Models Layer** - Database schemas and models
5. **Middlewares** - Error handling, validation
6. **Utils** - Helper functions and classes

## License

ISC
