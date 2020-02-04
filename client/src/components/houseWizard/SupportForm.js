// @flow
import React from 'react';
import get from 'lodash.get';
import {Box, Button, Grid, Stack} from '@chakra-ui/core';
import { Footer } from './Footer';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInput } from '../form/FormField';

const PLUMBER_TYPE = 'plumber';

export const SupportFields = ({
  type,
  errors,
  register,
  control,
    append,
    fields,
}: {|
  type: string,
  errors: Object,
  register: Function,
  control: any,
  append: any,
  fields: any,
|}) => {

  const addEmptyItem = () => {
    append({ companyName: 'new' });
  }

  console.log('formData', fields);
  /*

  React.useEffect(() => {
    register({ name: `support.${type}[0].companyName` });
  });

  React.useEffect(() => {
    console.log('set value', data);
    setValue(`support.${type}[0].companyName`, 'test');
    // eslint-disable
  });
*/

  return (
    <Stack>
      {!!fields &&
        fields.map((item, index) => {
          return (
            <Grid
              templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
              gap={[0, null, 3]}
              key={item.id}>
              <FormInput
                errors={errors}
                fieldName={`support.plumber[${index}].companyName`}
                defaultValue={`${item.companyName}`}
                placeholder="Company"
                registerFn={register}
                mb={[2, 0]}
              />
              <Button onClick={addEmptyItem}>Add</Button>
            </Grid>
          );
        })}
    </Stack>
  );
};

type SupportFormProps = {|
  submitForm: Object => void,
  goToPreviousStep: boolean => void,
|};

export const SupportForm = React.forwardRef<SupportFormProps, any>(
  ({ goToPreviousStep, submitForm }: SupportFormProps, ref: any) => {
    const formProps = useForm({
      mode: 'onChange',
      defaultValues: {
        support: { plumber: [{ companyName: 'test123' }] },
      },
    });
    const { handleSubmit, errors, formState, register, getValues, control } = formProps;

    const formData = getValues({ nest: true });

    const { fields, append, prepend, remove } = useFieldArray({ control, name: 'support.plumber' });

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      console.log('formData values', formData);
      if (formState.isValid) {
        submitForm();
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Stack>
            <SupportFields
              type={PLUMBER_TYPE}
              errors={errors}
              register={register}
              control={control}
              append={append}
              fields={fields}
            />
          </Stack>
          <Footer
            rightButton={{ text: 'Submit' }}
            leftButton={{ text: 'Utilities', onClick: goToPreviousStep }}
          />
        </Box>
      </form>
    );
  },
);
