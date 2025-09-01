import React from 'react';

const AnimeCard = ({ anime }) => (
  <div className="anime-card">
    <div className="anime-card-image">
      <img
        src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
        alt={anime.title}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
        }}
      />
      <div className="anime-score">{anime.score || 'N/A'}</div>
    </div>
    <div className="anime-card-content">
      <h3 className="anime-title">{anime.title}</h3>
      <p className="anime-episodes">Episodes: {anime.episodes || 'TBA'}</p>
      <p className="anime-year">{anime.year || anime.aired?.prop?.from?.year || 'Unknown'}</p>
      <div className="anime-genres">
        {anime.genres?.slice(0, 3).map((genre, index) => (
          <span key={index} className="genre-tag">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default AnimeCard;