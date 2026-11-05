// src/components/GameCard.jsx

const isVideo = (url) => typeof url === 'string' && /\.(mp4|webm)$/i.test(url.split('?')[0])
const isImage = (url) => typeof url === 'string' && /\.(png|jpe?g)$/i.test(url.split('?')[0])

function GameCard({ title, role, gifUrl, mediaUrl, startDate, endDate, tags, onClick }) {
  const media = mediaUrl || gifUrl

  return (
    <div className="game-card" onClick={onClick}>
      
      {/* 1:1 Media Container */}
      <div className="card-media">
        {media ? (
          isVideo(media) ? (
            <video src={media} autoPlay loop muted playsInline />
          ) : isImage(media) ? (
            <img src={media} alt={title} />
          ) : (
            <div className="placeholder-text">Media Here</div>
          )
        ) : (
          <div className="placeholder-text">Media Here</div>
        )}
      </div>

      {/* Card Info */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {/* Render the new role here */}
        <p className="card-role">{role}</p> 
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
