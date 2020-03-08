import * as React from 'react';
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import { SupportFooter } from './Footer';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../../components/form/FormField';

const PLUMBER_TYPE = 'plumber';
const ELECTRICIAN_TYPE = 'electrician';
const HVAC_TYPE = 'hvac';

const SUPPORT_FIELDS = [
  { name: 'companyName', title: 'Company', renderField: FormInput },
  { name: 'personName', title: 'Name', renderField: FormInput },
  { name: 'phoneNumber', title: 'Phone Number', renderField: FormNumberInput },
  { name: 'mobile', title: 'Mobile Number', renderField: FormNumberInput },
];

const createEmptyItem = () => {
  const fieldData = {};
  SUPPORT_FIELDS.forEach(f => {
    fieldData[f.name] = '';
  });

  return fieldData;
};

export const SupportFields = ({ errors, register, type, title, control }) => {
  const { fields, append } = useFieldArray({ control, name: `support.${type}` });

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
              {SUPPORT_FIELDS.map(field => {
                const Field = field.renderField || FormInput;
                return (
                  <Field
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
        <Button onClick={addEmptyItem} variant="outline">
          Add
        </Button>
      </Flex>
    </Stack>
  );
};

export const SupportForm = React.forwardRef(
  ({ goToPreviousStep, submitForm, initialValues }, ref) => {
    const formProps = useForm({
      mode: 'onChange',
      defaultValues: initialValues || {
        support: {
          [PLUMBER_TYPE]: [createEmptyItem()],
          [HVAC_TYPE]: [createEmptyItem()],
          [ELECTRICIAN_TYPE]: [createEmptyItem()],
        },
      },
    });
    const { handleSubmit, errors, formState, register, getValues, control } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
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
          <SupportFooter goToPreviousStep={goToPreviousStep} />
        </Box>
      </form>
    );
  },
);
