// @flow
import * as React from 'react';
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import { SupportFooter } from './Footer';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../../components/form/FormInput';
import type { Support } from '../../../models/Support';
import { FormSelect } from '../../../components/form/FormSelect';
import { IconButton } from '../../../components/CustomButtons/RoundedLinkButton';
import { SUPPORT_OPTIONS } from '../../../models/Support';

type SupportFormProps = {|
  submitForm: Object => void,
  goToPreviousStep: () => void,
  initialValues?: { support: Array<Support> },
|};

export type SupportFormModel = {|
  support: Array<Support>,
|};

const SUPPORT_FIELDS: Array<{
  name: string,
  title: string,
  renderField: React.ComponentType<any>,
}> = [
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

export const SupportForm = React.forwardRef<SupportFormProps, any>(
  ({ submitForm, goToPreviousStep, initialValues }: SupportFormProps, ref: any) => {
    const formProps = useForm<Array<Support>>({
      mode: 'onChange',
      defaultValues: initialValues || { support: [] },
    });
    const { handleSubmit, errors, formState, register, getValues, control } = formProps;

    const { fields, append, remove } = useFieldArray<Support>({
      control,
      name: 'support',
    });

    React.useImperativeHandle(ref, () => ({
      getValues: (): SupportFormModel => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      if (formState.isValid) {
        submitForm(values);
      }
    };

    const addEmptyItem = () => {
      append(createEmptyItem());
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Stack mb={[4]}>
            <Grid
              templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr) 40px']}
              gap={[0, null, 3]}
              mb={4}>
              <Text>Support Type</Text>
              <Text>Company</Text>
              <Text>Name</Text>
              <Text>Phone Number</Text>
              <Text>Mobile Number</Text>
            </Grid>
            {!!fields &&
              fields.map((item: Support, index) => {
                return (
                  <Grid
                    templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr) 40px']}
                    gap={[0, null, 3]}
                    mb={4}
                    key={item._id || item.id}>
                    <FormSelect
                      errors={errors}
                      fieldName={`support[${index}].supportType`}
                      options={SUPPORT_OPTIONS}
                      placeholder="Select Type"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.supportType || ''}
                    />
                    <FormInput
                      errors={errors}
                      fieldName={`support[${index}].companyName`}
                      placeholder="Company Name"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={`${item.companyName || ''}`}
                    />
                    <FormInput
                      errors={errors}
                      fieldName={`support[${index}].personName`}
                      placeholder="Name"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={`${item.personName || ''}`}
                    />
                    <FormNumberInput
                      errors={errors}
                      fieldName={`support[${index}].phoneNumber`}
                      placeholder="Phone Number"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.phoneNumber || ''}
                    />
                    <FormNumberInput
                      errors={errors}
                      fieldName={`support[${index}].mobile`}
                      placeholder="Mobile Number"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.mobile || ''}
                    />

                    <IconButton icon="delete" onClick={() => remove(index)} />
                  </Grid>
                );
              })}
          </Stack>
          <Flex justifyContent="flex-end">
            <Button onClick={addEmptyItem} variant="outline">
              Add New Row
            </Button>
          </Flex>
          <SupportFooter goToPreviousStep={goToPreviousStep} />
        </Box>
      </form>
    );
  },
);
