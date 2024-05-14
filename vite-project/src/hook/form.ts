import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormValues {
  [key: string]: any;
}

type Callback = (values: FormValues) => void;

const useForm = (callback: Callback, defaultValues: FormValues = {}) => {
  const [values, setValues] = useState<FormValues>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback({ ...values });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | number) => {
    let name: string;
    let value: string | number;

    if (typeof event === 'object' && 'target' in event) {
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event);
      // hard coded for Mantine slider functionality 
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
    }

    if (!isNaN(Number(value))) {
      value = parseInt(value.toString(), 10);
    }

    setValues(values => ({ ...values, [name]: value }));
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
