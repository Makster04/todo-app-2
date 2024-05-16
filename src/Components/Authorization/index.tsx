import React, { useState } from 'react';
import { useAuth } from '../../Context/Auth';
import { Button, TextInput } from '@mantine/core';

const Auth: React.FC<{ capability: string }> = ({ capability, children }) => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <div>
      {user ? (
        <>
          {children}
        </>
      ) : (
        <div>
          <h2>Login</h2>
          <TextInput
            label="Username"
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
}

export default Auth;
