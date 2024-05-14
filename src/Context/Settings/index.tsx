// Context/Settings/index.tsx
import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  displayCount: number;
  hideCompleted: boolean;
  sortBy: string;
}

const defaultSettings: SettingsContextType = {
  displayCount: 3,
  hideCompleted: true,
  sortBy: 'difficulty',
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<SettingsContextType>(defaultSettings);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
