# Song Management Frontend

A modern React + TypeScript frontend for managing songs with real-time updates and beautiful statistics.

## 🎯 Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete songs
- ✅ **Advanced Filtering** - Filter by genre, artist, album
- ✅ **Search** - Search across title, artist, and album
- ✅ **Pagination** - Navigate through large song collections
- ✅ **Real-time Updates** - UI updates automatically after mutations (no page reload)
- ✅ **Statistics Dashboard** - Beautiful charts and insights
- ✅ **Modern UI** - Built with Emotion and responsive design
- ✅ **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **Redux-Saga** - Side effects and API calls
- **React Router** - Navigation
- **Emotion** - CSS-in-JS styling
- **Styled System** - Design system utilities
- **Recharts** - Data visualization
- **Axios** - HTTP client

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend API running on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create .env file:
```bash
cp .env.example .env
```

3. Update .env with your backend URL:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

The app will be available at http://localhost:5173

Build for production:
```bash
npm run build
```

## 📖 Usage

### Songs Page (/)

- View all songs in a paginated table
- Add, edit, and delete songs
- Filter by genre, artist, album
- Search across multiple fields
- Navigate through pages

### Statistics Page (/stats)

- View totals and insights
- Beautiful charts with Recharts
- Genre distribution
- Top artists and albums

## 📝 License

ISC
