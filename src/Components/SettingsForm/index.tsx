import React, { useState } from 'react';
import { useSettings } from '../../Context/Settings';
import { Button, Grid, Card, TextInput } from '@mantine/core';

const SettingsForm: React.FC = () => {
  const { showCompleted, displayCount, defaultSort, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    showCompleted,
    displayCount,
    defaultSort,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    updateSettings(formData);
  };

  return (
    <Grid>
      <Card shadow="sm">
        <h2>Settings</h2>
        <div>
          <TextInput
            label="Display Count"
            name="displayCount"
            type="number"
            value={formData.displayCount}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            label="Default Sort"
            name="defaultSort"
            value={formData.defaultSort}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="showCompleted"
              checked={formData.showCompleted}
              onChange={() =>
                setFormData(prevState => ({ ...prevState, showCompleted: !prevState.showCompleted }))
              }
            />
            Show Completed
          </label>
        </div>
        <Button onClick={handleSubmit}>Save</Button>
      </Card>
    </Grid>
  );
}

export default SettingsForm;
