import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Song from '../models/Song.js';
import User from '../models/User.js';
import { searchMetalArtists, getArtistAlbums, getAlbumTracks } from '../services/spotify.js';
import { metalBands } from './metalData.js';

export const seedDatabase = async () => {
  console.log('Checking database state...');
  
  // Check if data exists
  const userCount = await User.countDocuments();
  if (userCount === 0) {
      console.log('Seeding Default Users...');
      await User.create({
          name: 'Admin Metalhead',
          email: 'admin@metal.com',
          password: 'adminpassword',
          role: 'admin'
      });
      await User.create({
          name: 'Regular Metalhead',
          email: 'user@metal.com',
          password: 'userpassword',
          role: 'user'
      });
      console.log('Users Seeded (admin@metal.com / adminpassword) 🤘');
  }

  const artistCount = await Artist.countDocuments();
  if (artistCount > 0) {
      console.log('Database already has data. Skipping seed.');
      return;
  }

  console.log('Database is empty. Attempting to seed... 🤘');

  // Try Spotify First (will fail gracefully if no creds)
  const spotifySuccess = await seedFromSpotify();
  
  if (!spotifySuccess) {
    console.log('Falling back to EXTENDED Local Metal Dataset... 🤘');
    await seedManualData();
  }
};

const seedFromSpotify = async () => {
  try {
    const spotifyArtists = await searchMetalArtists();
    if (!spotifyArtists || spotifyArtists.length === 0) return false;

    console.log(`Found ${spotifyArtists.length} artists from Spotify. Seeding...`);
      
    for (const artistData of spotifyArtists) {
        // Create Artist
        const artist = await Artist.create({
            name: artistData.name,
            genre: 'Metal',
            imageUrl: artistData.images[0]?.url || '',
            bio: `Popularity: ${artistData.popularity}`
        });

        // Get Albums
        const albumsData = await getArtistAlbums(artistData.id);
        for (const albumData of albumsData) {
            const album = await Album.create({
                title: albumData.name,
                artist: artist._id,
                year: new Date(albumData.release_date).getFullYear(),
                coverUrl: albumData.images[0]?.url || ''
            });

            // Get Tracks
            const tracksData = await getAlbumTracks(albumData.id);
            for (const trackData of tracksData) {
                await Song.create({
                    title: trackData.name,
                    artist: artist._id,
                    album: album._id,
                    duration: msToTime(trackData.duration_ms),
                    audioUrl: trackData.preview_url || ''
                });
            }
        }
    }
    console.log('Database Seeded from Spotify Successfully! 🤘');
    return true;
  } catch (error) {
    console.log('Spotify Seed skipped (Creds missing or error).');
    return false;
  }
}

const msToTime = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const seedManualData = async () => {
  // Clear existing (just in case)
  await Artist.deleteMany({});
  await Album.deleteMany({});
  await Song.deleteMany({});

  console.log(`Seeding ${metalBands.length} legendary metal bands...`);

  for (const band of metalBands) {
    // Create Artist
    const artist = await Artist.create({
      name: band.name,
      genre: band.genre,
      imageUrl: band.imageUrl,
      bio: band.bio
    });

    for (const alb of band.albums) {
      // Create Album
      const album = await Album.create({
        title: alb.title,
        artist: artist._id,
        year: alb.year,
        coverUrl: alb.coverUrl
      });

      // Create Songs
      for (const s of alb.songs) {
        await Song.create({
          title: s.title,
          artist: artist._id,
          album: album._id,
          duration: s.duration,
          audioUrl: '' // Placeholder
        });
      }
    }
  }

  console.log('Database Seeded with Extended Metal Dataset Successfully! 🤘');
};
