import React from 'react';
import './Player.css';

const Player = ({ currentSong }) => {
  if (!currentSong) return null;

  return (
    <div className="player-footer">
      <div className="song-info">
        <div className="song-details">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist?.name}</p>
        </div>
      </div>
      
      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-btn">⏮</button>
          <button className="control-btn play-btn">▶</button>
          <button className="control-btn">⏭</button>
        </div>
        <div className="progress-bar">
          <span className="time">0:00</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '30%' }}></div>
          </div>
          <span className="time">{currentSong.duration}</span>
        </div>
      </div>
      
      <div className="volume-controls">
        <span>🔊</span>
        <div className="volume-track">
          <div className="volume-fill" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
