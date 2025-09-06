
'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

export function useDynamicFields(form: any, fieldName: string) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  return {
    fields,
    add: (value: any) => append(value),
    remove,
  };
}


    