import { MantineProvider } from '@mantine/core';
import Todo from './Components/Todo';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <Todo />
    </MantineProvider>
  );
};

export default App;
