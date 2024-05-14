import { useState, useEffect } from 'react';

const useForm = (callback: (values: any) => void, defaultValues: any = {}) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback({ ...values });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | number) => {
    // Implementation of handleChange function
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
