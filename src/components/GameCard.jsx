// src/components/GameCard.jsx
import React from 'react'

function GameCard({ title, gifUrl, startDate, endDate, tags, onClick }) {
  return (
    <div className="game-card" onClick={onClick}>
      
      {/* 4:3 GIF Container */}
      <div className="card-media">
        {gifUrl ? (
          <img src={gifUrl} alt={title} />
        ) : (
          <div className="placeholder-text">GIF Here</div>
        )}
      </div>

      {/* Card Info */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-duration">{startDate} – {endDate}</p>
        
        {/* Tags Array */}
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default GameCard