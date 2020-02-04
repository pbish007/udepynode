// @flow
import * as React from 'react';
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import { Footer } from './Footer';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInput } from '../form/FormField';

const PLUMBER_TYPE = 'plumber';
const ELECTRICIAN_TYPE = 'electrician';
const HVAC_TYPE = 'hvac';

const FIELDS = [
  { name: 'companyName', title: 'Company' },
  { name: 'personName', title: 'Name' },
  { name: 'phoneNumber', title: 'Phone Number' },
  { name: 'mobile', title: 'Mobile Number' },
];

const createEmptyItem = () => {
  const fieldData = {};
  FIELDS.forEach(f => {
    fieldData[f.name] = '';
  });

  return fieldData;
};

export const SupportFields = ({
  errors,
  register,
  type,
  title,
  control,
}: {|
  type: string,
  title: string,
  errors: Object,
  register: Function,
  control: any,
|}) => {
  const { fields, append } = useFieldArray({ control, name: `support.${PLUMBER_TYPE}` });

  const addEmptyItem = () => {
    append(createEmptyItem());
  };

  return (
    <Stack>
      <Flex>
        <Text fontWeight="bold">{title}</Text>
      </Flex>
      {!!fields &&
        fields.map((item, index) => {
          return (
            <Grid
              templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr)']}
              gap={[0, null, 3]}
              key={item.id}>
              {FIELDS.map(field => {
                return (
                  <FormInput
                    key={field.name}
                    errors={errors}
                    fieldName={`support.${type}[${index}].${field.name}`}
                    defaultValue={`${item[field.name]}`}
                    placeholder={field.title}
                    registerFn={register}
                    mb={[2, 0]}
                  />
                );
              })}
            </Grid>
          );
        })}
      <Flex justifyContent="flex-end">
        <Button onClick={addEmptyItem}>Add</Button>
      </Flex>
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
        support: { [PLUMBER_TYPE]: [createEmptyItem()] },
      },
    });
    const { handleSubmit, errors, formState, register, getValues, control } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      console.log('form data', values);
      if (formState.isValid) {
        submitForm(values);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Stack>
            <SupportFields
              errors={errors}
              register={register}
              control={control}
              type={PLUMBER_TYPE}
              title="Plumber"
            />
            <SupportFields
              errors={errors}
              register={register}
              control={control}
              type={ELECTRICIAN_TYPE}
              title="Electrician"
            />
            <SupportFields
              errors={errors}
              register={register}
              control={control}
              type={HVAC_TYPE}
              title="HVAC"
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
