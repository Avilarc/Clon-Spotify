import React from 'react';
import './AlbumCard.css';

const AlbumCard = ({ album, onClick }) => {
  return (
    <div className="album-card" onClick={onClick}>
      <div className="album-cover-container">
        <img src={album.coverUrl} alt={album.title} className="album-cover" />
        <div className="play-overlay">▶</div>
      </div>
      <div className="album-info">
        <h3>{album.title}</h3>
        <p>{album.artist.name}</p>
        <span>{album.year}</span>
      </div>
    </div>
  );
};

export default AlbumCard;
