import express from 'express';
import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Song from '../models/Song.js';

const router = express.Router();

// Get all artists
router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all albums
router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find().populate('artist');
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all songs
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find().populate('artist').populate('album');
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get album by id
router.get('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    const songs = await Song.find({ album: req.params.id });
    res.json({ album, songs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
