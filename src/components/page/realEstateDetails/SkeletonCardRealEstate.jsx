// SkeletonCardRealEstate.jsx
import React from 'react';
import './SkeletonCardRealEstate.css';

const SkeletonCardRealEstate = () => {
  return (
    <div className="skeleton-card-real-estate">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-location"></div>
        <div className="skeleton-details">
          <div className="skeleton-detail"></div>
          <div className="skeleton-detail"></div>
          <div className="skeleton-detail"></div>
        </div>
        <div className="skeleton-amenities">
          <div className="skeleton-amenity"></div>
          <div className="skeleton-amenity"></div>
          <div className="skeleton-amenity"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardRealEstate;