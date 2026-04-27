import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaMapMarkerAlt, FaCity, FaLocationArrow } from 'react-icons/fa';
import './LocationSelector.css';
import { panelService } from '../../../../services/panelService';

const LocationSelector = ({ onLocationSelect, initialLocation = null }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [neighborhoodDropdownOpen, setNeighborhoodDropdownOpen] = useState(false);
  
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [regionSearchTerm, setRegionSearchTerm] = useState('');
  const [neighborhoodSearchTerm, setNeighborhoodSearchTerm] = useState('');

  // دریافت شهرها (بدون id)
  const fetchCities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = panelService.GetRegionComboParent();
      
      const result = await response;
           console.log('***********************************************************',result.data.status)
      console.log(result.data.data)
      if (result.status === 200 && result.data) {
        setCities(result.data.data);
      } else {
        console.error('خطا در دریافت شهرها');
      }
    } catch (error) {
      console.error('خطا در دریافت شهرها:', error);
    } finally {
      setLoading(false);
    }
  };

  // دریافت مناطق/محله‌ها بر اساس id
  const fetchChildLocations = async (parentId, type) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = panelService.GetRegionCombo(parentId);
      // const response = await fetch(`https://localhost:7178/api/RealEstatePage/GetRegionsWithChildFlagAsync?id=${parentId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      const result = await response;
 
      if (result.data.status === 200 && result.data) {
        if (type === 'region') {
          setRegions(result.data.data);
        } else if (type === 'neighborhood') {
          setNeighborhoods(result.data.data);
        }
      } else {
        if (type === 'region') setRegions([]);
        if (type === 'neighborhood') setNeighborhoods([]);
      }
    } catch (error) {
      console.error(`خطا در دریافت ${type === 'region' ? 'مناطق' : 'محله‌ها'}:`, error);
      if (type === 'region') setRegions([]);
      if (type === 'neighborhood') setNeighborhoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // انتخاب شهر
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedRegion(null);
    setSelectedNeighborhood(null);
    setRegions([]);
    setNeighborhoods([]);
    setCityDropdownOpen(false);
    
    // اگر شهر دارای بچه است (countChild > 0)، دریافت مناطق
    if (city.countChild > 0 || city.hasRegion) {
      fetchChildLocations(city.id, 'region');
    }
    
    // گزارش به والد
    if (onLocationSelect) {
      onLocationSelect({
        city: city.name,
        cityId: city.id,
        cityLat: city.latitude,
        cityLng: city.longitude,
        region: null,
        regionId: null,
        neighborhood: null,
        neighborhoodId: null,
        fullAddress: city.name,

          // اضافه کردن مختصات نهایی برای نقشه
      finalLat: city.latitude,
      finalLng: city.longitude
      });
    }
  };

  // انتخاب منطقه
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedNeighborhood(null);
    setNeighborhoods([]);
    setRegionDropdownOpen(false);
    
    // اگر منطقه دارای بچه است (countChild > 0)، دریافت محله‌ها
    if (region.countChild > 0) {
      fetchChildLocations(region.id, 'neighborhood');
    }
    
    // گزارش به والد
    if (onLocationSelect && selectedCity) {
      onLocationSelect({
        city: selectedCity.name,
        cityId: selectedCity.id,
        cityLat: selectedCity.latitude,
        cityLng: selectedCity.longitude,
        region: region.name,
        regionId: region.id,
        regionLat: region.latitude,
        regionLng: region.longitude,
        neighborhood: null,
        neighborhoodId: null,
        fullAddress: `${selectedCity.name} - ${region.name}`,
            // مختصات نهایی = مختصات منطقه (اگر region وجود دارد)
      finalLat: region.latitude,
      finalLng: region.longitude
      });
    }
  };

  // انتخاب محله
  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setNeighborhoodDropdownOpen(false);
    
    // گزارش به والد
    if (onLocationSelect && selectedCity) {
      onLocationSelect({
        city: selectedCity.name,
        cityId: selectedCity.id,
        cityLat: selectedCity.latitude,
        cityLng: selectedCity.longitude,
        region: selectedRegion?.name || null,
        regionId: selectedRegion?.id || null,
        regionLat: selectedRegion?.latitude || null,
        regionLng: selectedRegion?.longitude || null,
        neighborhood: neighborhood.name,
        neighborhoodId: neighborhood.id,
        neighborhoodLat: neighborhood.latitude,
        neighborhoodLng: neighborhood.longitude,
        fullAddress: selectedRegion 
          ? `${selectedCity.name} - ${selectedRegion.name} - ${neighborhood.name}`
          : `${selectedCity.name} - ${neighborhood.name}`
      });
    }
  };

  // فیلتر کردن شهرها بر اساس جستجو
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // فیلتر کردن مناطق بر اساس جستجو
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(regionSearchTerm.toLowerCase())
  );

  // فیلتر کردن محله‌ها بر اساس جستجو
  const filteredNeighborhoods = neighborhoods.filter(neighborhood =>
    neighborhood.name.toLowerCase().includes(neighborhoodSearchTerm.toLowerCase())
  );

  // ریست کردن انتخاب‌ها
  const resetSelection = () => {
    setSelectedCity(null);
    setSelectedRegion(null);
    setSelectedNeighborhood(null);
    setRegions([]);
    setNeighborhoods([]);
    if (onLocationSelect) {
      onLocationSelect(null);
    }
  };

  return (
    <div className="location-selector">
      {/* انتخاب شهر */}
      <div className="location-group">
        <label className="location-label">
          <FaCity className="location-icon" />
          شهر *
        </label>
        <div className="custom-dropdown">
          <div 
            className="dropdown-header"
            onClick={() => {
              setCityDropdownOpen(!cityDropdownOpen);
              setRegionDropdownOpen(false);
              setNeighborhoodDropdownOpen(false);
            }}
          >
            <span className="dropdown-selected">
              {selectedCity ? selectedCity.name : 'انتخاب شهر'}
            </span>
            <FaChevronDown className={`dropdown-arrow ${cityDropdownOpen ? 'open' : ''}`} />
          </div>
          
          {cityDropdownOpen && (
            <div className="dropdown-list">
              <div className="dropdown-search">
                <input
                  type="text"
                  placeholder="جستجوی شهر..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="dropdown-items">
                {loading && cities.length === 0 ? (
                  <div className="dropdown-loading">در حال بارگذاری...</div>
                ) : filteredCities.length > 0 ? (
                  filteredCities.map(city => (
                    <div
                      key={city.id}
                      className={`dropdown-item ${selectedCity?.id === city.id ? 'selected' : ''}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      <FaMapMarkerAlt className="item-icon" />
                      <span>{city.name}</span>
                      {city.countChild > 0 && <span className="has-child-badge">دارای منطقه</span>}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-empty">شهری یافت نشد</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* انتخاب منطقه (شرطی) */}
      {selectedCity && (selectedCity.countChild > 0 || selectedCity.hasRegion) && (
        <div className="location-group">
          <label className="location-label">
            <FaLocationArrow className="location-icon" />
            منطقه
          </label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => {
                setRegionDropdownOpen(!regionDropdownOpen);
                setCityDropdownOpen(false);
                setNeighborhoodDropdownOpen(false);
              }}
            >
              <span className="dropdown-selected">
                {selectedRegion ? selectedRegion.name : 'انتخاب منطقه'}
              </span>
              <FaChevronDown className={`dropdown-arrow ${regionDropdownOpen ? 'open' : ''}`} />
            </div>
            
            {regionDropdownOpen && (
              <div className="dropdown-list">
                <div className="dropdown-search">
                  <input
                    type="text"
                    placeholder="جستجوی منطقه..."
                    value={regionSearchTerm}
                    onChange={(e) => setRegionSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="dropdown-items">
                  {loading && regions.length === 0 ? (
                    <div className="dropdown-loading">در حال بارگذاری...</div>
                  ) : filteredRegions.length > 0 ? (
                    filteredRegions.map(region => (
                      <div
                        key={region.id}
                        className={`dropdown-item ${selectedRegion?.id === region.id ? 'selected' : ''}`}
                        onClick={() => handleRegionSelect(region)}
                      >
                        <FaLocationArrow className="item-icon" />
                        <span>{region.name}</span>
                        {region.countChild > 0 && <span className="has-child-badge">دارای محله</span>}
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-empty">منطقه‌ای یافت نشد</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* انتخاب محله (شرطی) */}
      {selectedRegion && selectedRegion.countChild > 0 && (
        <div className="location-group">
          <label className="location-label">
            <FaLocationArrow className="location-icon" />
            محله
          </label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => {
                setNeighborhoodDropdownOpen(!neighborhoodDropdownOpen);
                setCityDropdownOpen(false);
                setRegionDropdownOpen(false);
              }}
            >
              <span className="dropdown-selected">
                {selectedNeighborhood ? selectedNeighborhood.name : 'انتخاب محله'}
              </span>
              <FaChevronDown className={`dropdown-arrow ${neighborhoodDropdownOpen ? 'open' : ''}`} />
            </div>
            
            {neighborhoodDropdownOpen && (
              <div className="dropdown-list">
                <div className="dropdown-search">
                  <input
                    type="text"
                    placeholder="جستجوی محله..."
                    value={neighborhoodSearchTerm}
                    onChange={(e) => setNeighborhoodSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="dropdown-items">
                  {loading && neighborhoods.length === 0 ? (
                    <div className="dropdown-loading">در حال بارگذاری...</div>
                  ) : filteredNeighborhoods.length > 0 ? (
                    filteredNeighborhoods.map(neighborhood => (
                      <div
                        key={neighborhood.id}
                        className={`dropdown-item ${selectedNeighborhood?.id === neighborhood.id ? 'selected' : ''}`}
                        onClick={() => handleNeighborhoodSelect(neighborhood)}
                      >
                        <FaLocationArrow className="item-icon" />
                        <span>{neighborhood.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-empty">محله‌ای یافت نشد</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* دکمه ریست */}
      {selectedCity && (
        <button type="button" className="location-reset-btn" onClick={resetSelection}>
          تغییر مکان
        </button>
      )}
    </div>
  );
};

export default LocationSelector;