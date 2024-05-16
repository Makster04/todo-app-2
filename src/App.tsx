import List from './Components/List';
import SettingsProvider from './Context/Settings/Settings';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home/Home';
import { Tabs } from '@mantine/core';
import SettingsForm from './Components/SettingsForm/SettingsForm';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Header />
      <List />
      <Home />
      <Footer />
      <Tabs defaultValue="home">
        <Tabs.List>
          <Tabs.Tab value="home">
            Home
          </Tabs.Tab>
          <Tabs.Tab value="settings">
            Theme Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="home">
          <Home />
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <SettingsForm />
        </Tabs.Panel>
      </Tabs>
    </SettingsProvider>
  );
};

export default App;