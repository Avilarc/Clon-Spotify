import { useState, useEffect } from 'react'
import { getAlbums, getAlbumById } from '../services/api'
import AlbumCard from '../components/AlbumCard'
import Player from '../components/Player'

function Home({ searchTerm }) {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAlbums()
        setAlbums(data)
      } catch (error) {
        console.error('Error loading albums:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePlayAlbum = async (albumId) => {
    try {
      const data = await getAlbumById(albumId);
      if (data && data.songs && data.songs.length > 0) {
        // Play the first song
        setCurrentSong(data.songs[0]);
      } else {
        console.log('No songs found for this album');
      }
    } catch (err) {
      console.error('Error fetching album details:', err);
    }
  }

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (album.artist && album.artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="home-container">
      <main className="main-content">
        <h2>Álbumes Destacados</h2>
        
        {loading ? (
          <p>Cargando metal...</p>
        ) : (
          <div className="playlist-grid">
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map(album => (
                <AlbumCard 
                  key={album._id} 
                  album={album} 
                  onClick={() => handlePlayAlbum(album._id)}
                />
              ))
            ) : (
              <p>No se encontraron resultados de metal 🤘</p>
            )}
          </div>
        )}
      </main>
      
      <Player currentSong={currentSong} />
    </div>
  )
}

export default Home
