import express, { Application } from 'express';
import cors from 'cors';
import songRoutes from './routes/songRoutes';
import statsRoutes from './routes/statsRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Song Management API is running',
    version: '1.0.0',
  });
});

// Routes
app.use('/api/songs', songRoutes);
app.use('/api/stats', statsRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
