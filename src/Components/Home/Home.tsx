import { useContext } from 'react';
import { SettingsContext } from '../../Context/Settings/Settings';

export default function Home() {

  const { primaryColor, secondaryColor } = useContext(SettingsContext);
  return (
    <main style={{ backgroundColor: primaryColor, color: secondaryColor }}>
      <h1>Welcome to my home page!</h1>
      <p>Here is some content!</p>
    </main>
  )
}