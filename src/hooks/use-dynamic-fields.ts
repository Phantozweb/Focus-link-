
'use client';

import { useFieldArray } from 'react-hook-form';

export function useDynamicFields(form: any, fieldName: string) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const add = () => {
    let newItem: any = {};
    if (fieldName === 'skills' || fieldName === 'interests' || fieldName === 'languages') {
        newItem = { value: '' };
    } else if (fieldName === 'workExperience') {
        newItem = { title: '', company: '', startDate: '', endDate: '', description: '' };
    } else if (fieldName === 'education') {
        newItem = { school: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' };
    }
    append(newItem);
  };

  return {
    fields,
    add,
    remove,
  };
}
