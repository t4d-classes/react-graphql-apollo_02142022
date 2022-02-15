import { useState, useCallback } from 'react';


export const useForm = initialForm => {

  const [ form, setForm ] = useState({ ...initialForm });

  const change = useCallback(e => {
    setForm({
      ...form,
      [ e.target.name ]: e.target.type === 'number'
        ? e.target.valueAsNumber
        : e.target.value,
    });
  }, [form]);

  const resetForm = useCallback(
    () => setForm({ ...initialForm }),
    [initialForm]);

  return [ form, change, resetForm ];

};