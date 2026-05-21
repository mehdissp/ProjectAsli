import React, { createContext, useState, useContext, useEffect } from 'react';

const CityContext = createContext();

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within CityProvider');
  }
  return context;
};

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityChanged, setCityChanged] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      try {
        const city = JSON.parse(savedCity);
        setSelectedCity(city);
      } catch (e) {
        setSelectedCity({ id: 1, name: 'تهران', latitude: 35.689198, longitude: 51.388973 });
      }
    } else {
      setSelectedCity({ id: 1, name: 'تهران', latitude: 35.689198, longitude: 51.388973 });
    }
  }, []);

  const changeCity = (city) => {
    const cityData = {
      id: city.id,
      name: city.name || city.persianName,
      latitude: city.latitude || 35.689198,
      longitude: city.longitude || 51.388973,
      hasRegion: city.hasRegion || true
    };
    localStorage.setItem('selectedCity', JSON.stringify(cityData));
    setSelectedCity(cityData);
    setCityChanged(prev => !prev);
  };

  return (
    <CityContext.Provider value={{ selectedCity, changeCity, cityChanged }}>
      {children}
    </CityContext.Provider>
  );
};