import dotenv from 'dotenv';
import Artist from './models/Artist.js';
import Album from './models/Album.js';
import Song from './models/Song.js';
import { connectDB, disconnectDB } from './db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('Starting Seed Process...');

    // Clear existing data
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Song.deleteMany({});
    console.log('Cleared existing data');

    // Create Artists
    const metallica = await Artist.create({
      name: 'Metallica',
      genre: 'Thrash Metal',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png',
      bio: 'Legendary Thrash Metal band from San Francisco.'
    });

    const ironMaiden = await Artist.create({
      name: 'Iron Maiden',
      genre: 'Heavy Metal',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Iron_Maiden_Logo.svg/1200px-Iron_Maiden_Logo.svg.png',
      bio: 'Pioneers of the New Wave of British Heavy Metal.'
    });

    const blackSabbath = await Artist.create({
      name: 'Black Sabbath',
      genre: 'Heavy Metal',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Black_Sabbath_logo.svg/1200px-Black_Sabbath_logo.svg.png',
      bio: 'The Godfathers of Heavy Metal.'
    });

    // Create Albums
    const masterOfPuppets = await Album.create({
      title: 'Master of Puppets',
      artist: metallica._id,
      year: 1986,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg'
    });

    const numberOfTheBeast = await Album.create({
      title: 'The Number of the Beast',
      artist: ironMaiden._id,
      year: 1982,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Iron_Maiden_-_The_Number_of_the_Beast.jpg'
    });

    const paranoid = await Album.create({
      title: 'Paranoid',
      artist: blackSabbath._id,
      year: 1970,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.jpg'
    });

    // Create Songs
    const songs = [
      { title: 'Battery', artist: metallica, album: masterOfPuppets, duration: '5:12' },
      { title: 'Master of Puppets', artist: metallica, album: masterOfPuppets, duration: '8:35' },
      { title: 'The Thing That Should Not Be', artist: metallica, album: masterOfPuppets, duration: '6:36' },
      { title: 'Invaders', artist: ironMaiden, album: numberOfTheBeast, duration: '3:24' },
      { title: 'The Number of the Beast', artist: ironMaiden, album: numberOfTheBeast, duration: '4:51' },
      { title: 'Run to the Hills', artist: ironMaiden, album: numberOfTheBeast, duration: '3:53' },
      { title: 'War Pigs', artist: blackSabbath, album: paranoid, duration: '7:57' },
      { title: 'Paranoid', artist: blackSabbath, album: paranoid, duration: '2:48' },
      { title: 'Iron Man', artist: blackSabbath, album: paranoid, duration: '5:56' },
    ];

    for (const s of songs) {
      await Song.create({
        title: s.title,
        artist: s.artist._id,
        album: s.album._id,
        duration: s.duration,
        audioUrl: '' // Placeholder
      });
    }

    console.log('Database Seeded Successfully! 🤘');
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
