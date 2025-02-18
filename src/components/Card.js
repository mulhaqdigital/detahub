import React from 'react';
import './Card.css';

const Card = ({ title, description, imageUrl, projectUrl, author }) => {
  const handleCardClick = () => {
    if (projectUrl) {
      window.open(projectUrl, '_blank');
    }
  };

  return (
    <a 
      href={projectUrl}
      className="card" 
      onClick={(e) => {
        e.preventDefault();
        handleCardClick();
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-image">
        <img 
          src={imageUrl} 
          alt={title} 
          onError={(e) => {
            // Fallback to default image if the image fails to load
            e.target.src = '/logo192.png';
          }}
        />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="card-author">By <span>{author || 'Unknown Author'}</span></p>
      </div>
    </a>
  );
};

export default Card; 