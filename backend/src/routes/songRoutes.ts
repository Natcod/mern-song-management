import { Router } from 'express';
import { songController } from '../controllers/songController.js';

const router = Router();

// POST /songs - Create a new song
router.post('/', songController.createSong);

// GET /songs - Get all songs with filtering, searching, and pagination
router.get('/', songController.getAllSongs);

// GET /songs/:id - Get song by ID
router.get('/:id', songController.getSongById);

// PUT /songs/:id - Update song by ID
router.put('/:id', songController.updateSong);

// DELETE /songs/:id - Delete song by ID
router.delete('/:id', songController.deleteSong);

export default router;
