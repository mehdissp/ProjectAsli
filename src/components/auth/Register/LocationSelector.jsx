// مسیر: src/components/auth/Register/LocationSelector.jsx

import React, { useState, useEffect, useRef } from 'react';
import './LocationSelector.css';

const LocationSelector = ({ onLocationSelect, initialLocation, disabled }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  
  const [selectedProvince, setSelectedProvince] = useState(initialLocation?.provinceId || null);
  const [selectedCity, setSelectedCity] = useState(initialLocation?.cityId || null);
  const [selectedRegion, setSelectedRegion] = useState(initialLocation?.regionId || null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialLocation?.neighborhoodId || null);
  
  const [loading, setLoading] = useState({
    provinces: false,
    cities: false,
    regions: false,
    neighborhoods: false
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // دریافت استان‌ها
  useEffect(() => {
    fetchProvinces();
  }, []);

  // دریافت شهرها هنگام انتخاب استان
  useEffect(() => {
    if (selectedProvince) {
      fetchCities(selectedProvince);
    } else {
      setCities([]);
      setSelectedCity(null);
      setRegions([]);
      setSelectedRegion(null);
      setNeighborhoods([]);
      setSelectedNeighborhood(null);
    }
  }, [selectedProvince]);

  // دریافت مناطق هنگام انتخاب شهر
  useEffect(() => {
    if (selectedCity) {
      fetchRegions(selectedCity);
    } else {
      setRegions([]);
      setSelectedRegion(null);
      setNeighborhoods([]);
      setSelectedNeighborhood(null);
    }
  }, [selectedCity]);

  // دریافت محله‌ها هنگام انتخاب منطقه
  useEffect(() => {
    if (selectedRegion) {
      fetchNeighborhoods(selectedRegion);
    } else {
      setNeighborhoods([]);
      setSelectedNeighborhood(null);
    }
  }, [selectedRegion]);

  // بستن dropdown با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProvinces = async () => {
    setLoading(prev => ({ ...prev, provinces: true }));
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('https://localhost:7178/api/Location/GetProvinces', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setProvinces(result.data);
      }
    } catch (error) {
      console.error('خطا در دریافت استان‌ها:', error);
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const fetchCities = async (provinceId) => {
    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`https://localhost:7178/api/Location/GetCities?provinceId=${provinceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setCities(result.data);
      }
    } catch (error) {
      console.error('خطا در دریافت شهرها:', error);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const fetchRegions = async (cityId) => {
    setLoading(prev => ({ ...prev, regions: true }));
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`https://localhost:7178/api/Location/GetRegions?cityId=${cityId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setRegions(result.data);
      }
    } catch (error) {
      console.error('خطا در دریافت مناطق:', error);
    } finally {
      setLoading(prev => ({ ...prev, regions: false }));
    }
  };

  const fetchNeighborhoods = async (regionId) => {
    setLoading(prev => ({ ...prev, neighborhoods: true }));
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`https://localhost:7178/api/Location/GetNeighborhoods?regionId=${regionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.status === 200 && result.data) {
        setNeighborhoods(result.data);
      }
    } catch (error) {
      console.error('خطا در دریافت محله‌ها:', error);
    } finally {
      setLoading(prev => ({ ...prev, neighborhoods: false }));
    }
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province.id);
    setSelectedCity(null);
    setSelectedRegion(null);
    setSelectedNeighborhood(null);
    
    const locationData = {
      province: province.name,
      provinceId: province.id,
      provinceLat: province.lat,
      provinceLng: province.lng,
      city: '',
      cityId: null,
      cityLat: null,
      cityLng: null,
      region: '',
      regionId: null,
      neighborhood: '',
      neighborhoodId: null,
      fullAddress: province.name
    };
    
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city.id);
    setSelectedRegion(null);
    setSelectedNeighborhood(null);
    
    const province = provinces.find(p => p.id === selectedProvince);
    
    const locationData = {
      province: province?.name || '',
      provinceId: selectedProvince,
      provinceLat: province?.lat,
      provinceLng: province?.lng,
      city: city.name,
      cityId: city.id,
      cityLat: city.lat,
      cityLng: city.lng,
      region: '',
      regionId: null,
      neighborhood: '',
      neighborhoodId: null,
      fullAddress: `${province?.name || ''} - ${city.name}`
    };
    
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region.id);
    setSelectedNeighborhood(null);
    
    const province = provinces.find(p => p.id === selectedProvince);
    const city = cities.find(c => c.id === selectedCity);
    
    const locationData = {
      province: province?.name || '',
      provinceId: selectedProvince,
      provinceLat: province?.lat,
      provinceLng: province?.lng,
      city: city?.name || '',
      cityId: selectedCity,
      cityLat: city?.lat,
      cityLng: city?.lng,
      region: region.name,
      regionId: region.id,
      regionLat: region.lat,
      regionLng: region.lng,
      neighborhood: '',
      neighborhoodId: null,
      fullAddress: `${province?.name || ''} - ${city?.name || ''} - ${region.name}`
    };
    
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  };

  const handleNeighborhoodChange = (neighborhood) => {
    setSelectedNeighborhood(neighborhood.id);
    
    const province = provinces.find(p => p.id === selectedProvince);
    const city = cities.find(c => c.id === selectedCity);
    const region = regions.find(r => r.id === selectedRegion);
    
    const locationData = {
      province: province?.name || '',
      provinceId: selectedProvince,
      provinceLat: province?.lat,
      provinceLng: province?.lng,
      city: city?.name || '',
      cityId: selectedCity,
      cityLat: city?.lat,
      cityLng: city?.lng,
      region: region?.name || '',
      regionId: selectedRegion,
      regionLat: region?.lat,
      regionLng: region?.lng,
      neighborhood: neighborhood.name,
      neighborhoodId: neighborhood.id,
      neighborhoodLat: neighborhood.lat,
      neighborhoodLng: neighborhood.lng,
      fullAddress: `${province?.name || ''} - ${city?.name || ''} - ${region?.name || ''} - ${neighborhood.name}`
    };
    
    if (onLocationSelect) {
      onLocationSelect(locationData);
    }
  };

  const getProvinceName = () => {
    const province = provinces.find(p => p.id === selectedProvince);
    return province?.name || 'انتخاب استان';
  };

  const getCityName = () => {
    const city = cities.find(c => c.id === selectedCity);
    return city?.name || 'انتخاب شهر';
  };

  const getRegionName = () => {
    const region = regions.find(r => r.id === selectedRegion);
    return region?.name || 'انتخاب منطقه';
  };

  const getNeighborhoodName = () => {
    const neighborhood = neighborhoods.find(n => n.id === selectedNeighborhood);
    return neighborhood?.name || 'انتخاب محله';
  };

  return (
    <div className="location-selector" ref={dropdownRef}>
      {/* استان */}
      <div className="location-selector-group">
        <div className="location-selector-label">استان</div>
        <div 
          className={`location-selector-input ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        >
          <input
            type="text"
            value={searchTerm || getProvinceName()}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            placeholder="انتخاب استان..."
            disabled={disabled}
            readOnly={!searchTerm}
          />
          <span className="dropdown-arrow">▼</span>
        </div>
        
        {isDropdownOpen && !disabled && (
          <div className="location-selector-dropdown">
            {loading.provinces ? (
              <div className="dropdown-loading">در حال بارگذاری...</div>
            ) : (
              <>
                <div 
                  className={`dropdown-item ${!selectedProvince ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedProvince(null);
                    setSearchTerm('');
                    setIsDropdownOpen(false);
                  }}
                >
                  بدون انتخاب
                </div>
                {provinces
                  .filter(p => !searchTerm || p.name.includes(searchTerm))
                  .map(province => (
                    <div
                      key={province.id}
                      className={`dropdown-item ${selectedProvince === province.id ? 'selected' : ''}`}
                      onClick={() => {
                        handleProvinceChange(province);
                        setSearchTerm('');
                        setIsDropdownOpen(false);
                      }}
                    >
                      {province.name}
                    </div>
                  ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* شهر */}
      {selectedProvince && (
        <div className="location-selector-group">
          <div className="location-selector-label">شهر</div>
          <div className="location-selector-input">
            <select 
              value={selectedCity || ''} 
              onChange={(e) => {
                const city = cities.find(c => c.id === parseInt(e.target.value));
                if (city) handleCityChange(city);
              }}
              disabled={disabled || loading.cities}
            >
              <option value="">انتخاب شهر...</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            {loading.cities && <span className="loading-indicator">⏳</span>}
          </div>
        </div>
      )}

      {/* منطقه */}
      {selectedCity && (
        <div className="location-selector-group">
          <div className="location-selector-label">منطقه</div>
          <div className="location-selector-input">
            <select 
              value={selectedRegion || ''} 
              onChange={(e) => {
                const region = regions.find(r => r.id === parseInt(e.target.value));
                if (region) handleRegionChange(region);
              }}
              disabled={disabled || loading.regions}
            >
              <option value="">انتخاب منطقه...</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
            {loading.regions && <span className="loading-indicator">⏳</span>}
          </div>
        </div>
      )}

      {/* محله */}
      {selectedRegion && (
        <div className="location-selector-group">
          <div className="location-selector-label">محله</div>
          <div className="location-selector-input">
            <select 
              value={selectedNeighborhood || ''} 
              onChange={(e) => {
                const neighborhood = neighborhoods.find(n => n.id === parseInt(e.target.value));
                if (neighborhood) handleNeighborhoodChange(neighborhood);
              }}
              disabled={disabled || loading.neighborhoods}
            >
              <option value="">انتخاب محله...</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
              ))}
            </select>
            {loading.neighborhoods && <span className="loading-indicator">⏳</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;