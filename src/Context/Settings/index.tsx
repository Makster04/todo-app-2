import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  showCompleted: boolean;
  displayCount: number;
  defaultSort: string;
}

const defaultSettings: SettingsContextType = {
  showCompleted: false,
  displayCount: 3,
  defaultSort: 'difficulty',
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    setSettings({ ...defaultSettings, ...storedSettings });
  }, []);

  const updateSettings = (newSettings: SettingsContextType) => {
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
