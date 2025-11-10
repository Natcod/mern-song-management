# Docker Setup Guide

This project is fully dockerized for easy deployment.

## 📦 What's Included

- **Backend** - Node.js + Express + TypeScript API (connects to MongoDB Atlas)

## 🚀 Quick Start

Run the backend:

```bash
docker-compose up -d
```

This will start:
- Backend API on `localhost:5000`
- Connected to MongoDB Atlas (same database as local development)

## 🛠️ Docker Commands

### Build and Start Services

```bash
# Start services
docker-compose up -d

# Build without cache
docker-compose build --no-cache

# View logs while starting
docker-compose up
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### View Logs

```bash
# Backend logs
docker-compose logs -f backend
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

## 🔍 Service Details

### Backend
- **Port**: 5000
- **Build**: Production-ready build
- **Database**: MongoDB Atlas (cloud)
- **Features**: 
  - TypeScript compiled to JavaScript
  - Alpine-based for smaller image size
  - All dependencies included
  - Connects to same database as local development

## 📝 Environment Variables

The docker-compose file sets these automatically:

```env
PORT=5000
MONGO_URI=mongodb+srv://songadmin:Songadmin@atlas123@songcluster.hbyktwi.mongodb.net/?appName=SongCluster
NODE_ENV=production
```

**Note**: The MongoDB URI is configured to connect to MongoDB Atlas, ensuring Docker uses the same database as local development.

## 🧪 Testing the Dockerized API

Once services are running:

```bash
# Health check
curl http://localhost:5000

# Create a song
curl -X POST http://localhost:5000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Song",
    "artist": "Test Artist",
    "album": "Test Album",
    "genre": "rock"
  }'

# Get all songs
curl http://localhost:5000/api/songs

# Get statistics
curl http://localhost:5000/api/stats
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5000 or 27017 is already in use:

1. Stop existing services:
```bash
# Stop local MongoDB
sudo systemctl stop mongodb

# Or kill process on port
sudo lsof -ti:5000 | xargs kill -9
```

2. Or change ports in `docker-compose.yml`

### Database Connection Issues

Check if backend is running:
```bash
docker-compose ps
```

View backend logs:
```bash
docker-compose logs backend
```

Ensure MongoDB Atlas is accessible and credentials are correct.

### Rebuild After Code Changes (Production)

```bash
docker-compose down
docker-compose build --no-cache backend
docker-compose up -d
```

### Access Backend Container

```bash
docker exec -it song-backend sh
```

## 📊 Container Management

### View Running Containers
```bash
docker ps
```

### Execute Commands in Container
```bash
# Backend container
docker exec -it song-backend sh

# MongoDB container
docker exec -it song-mongodb sh
```

### Remove All Containers and Volumes
```bash
docker-compose down -v
docker system prune -a
```

## 🔐 Security Notes

**For Production Deployment:**
1. Change MongoDB credentials in `docker-compose.yml`
2. Use environment variables or secrets management
3. Enable MongoDB authentication
4. Use HTTPS/TLS
5. Implement rate limiting
6. Add firewall rules

## 📦 Image Sizes

- **Backend**: ~180MB (Alpine-based)

## 🎯 Next Steps

1. Start services: `docker-compose up -d`
2. Check logs: `docker-compose logs -f`
3. Test API: `curl http://localhost:5000`
4. Stop services: `docker-compose down`
