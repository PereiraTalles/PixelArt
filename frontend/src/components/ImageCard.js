import React from 'react';

const ImageCard = ({ src, title, description }) => {
  return (
    <div className="image-card">
      <div className="image-container">
        <img src={src} alt={title} className="img-fluid imagem-home" />
        <div className="image-description">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;