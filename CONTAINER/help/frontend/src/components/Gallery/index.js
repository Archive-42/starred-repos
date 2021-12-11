import React from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../HomePage/HomePage.css"

function Gallery({ images }) {
  return <ImageGallery className='homepage-gallery-gallery' items={images} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}/>;
}

export default Gallery;