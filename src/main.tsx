import React from 'react';
import { SettingsProvider } from './Context/Settings';
import { AuthProvider } from './Context/Auth';
import List from './Components/List';
import SettingsForm from './Components/SettingsForm';
import Auth from './Components/Auth';
import { Pagination } from '@mantine/core';

const Main: React.FC = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <div className="app-container">
          <SettingsForm />
          <Auth capability="read">
            <List />
            <Pagination />
          </Auth>
        </div>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default Main;
