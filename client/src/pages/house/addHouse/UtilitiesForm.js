// @flow
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import * as React from 'react';
import { UtilitiesFooter } from './Footer';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../../components/form/FormInput';
import { FormSelect } from '../../../components/form/FormSelect';
import { IconButton } from '../../../components/CustomButtons/RoundedLinkButton';
import type { Utility } from '../../../models/Utility';
import { UTILITY_OPTIONS } from '../../../models/Utility';

type UtilitiesFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: () => void,
  initialValues?: { utilities: Array<Utility> },
|};

export type UtilitiesFormModel = {|
  utilities: Array<Utility>,
|};

const UTILITY_FIELDS: Array<{
  name: string,
  title: string,
  renderField: React.ComponentType<any>,
}> = [
  { name: 'account', title: 'Account', renderField: FormInput },
  { name: 'companyName', title: 'Company Name', renderField: FormInput },
  { name: 'monthlyCost', title: 'Monthly Cost', renderField: FormNumberInput },
  { name: 'supportNumber', title: 'Support Number', renderField: FormNumberInput },
];

let id = 1;

const createEmptyItem = () => {
  const fieldData = {};
  UTILITY_FIELDS.forEach(f => {
    fieldData[f.name] = '';
  });

  fieldData._id = id;
  id++;
  console.log('field data', fieldData);
  return fieldData;
};

export const UtilitiesForm = React.forwardRef<UtilitiesFormProps, any>(
  ({ goToNextStep, goToPreviousStep, initialValues }: UtilitiesFormProps, ref: any) => {
    const formProps = useForm<Array<Utility>>({
      mode: 'onChange',
      defaultValues: initialValues || { utilities: [] },
    });
    const { handleSubmit, errors, formState, register, getValues, control } = formProps;

    const { fields, append, remove } = useFieldArray<Utility>({
      control,
      name: 'utilities',
    });

    React.useImperativeHandle(ref, () => ({
      getValues: (): UtilitiesFormModel => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = () => {
      if (formState.isValid) {
        goToNextStep();
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
              <Text>Account</Text>
              <Text>Company</Text>
              <Text>Mortgage Cost</Text>
              <Text>Support Number</Text>
              <Text>Utility Type</Text>
            </Grid>
            {!!fields &&
              fields.map((item, index) => {
                return (
                  <Grid
                    templateColumns={['repeat(1, 1fr)', null, 'repeat(5, 1fr) 40px']}
                    gap={[0, null, 3]}
                    mb={4}
                    key={item._id || item.id}>
                    <FormInput
                      errors={errors}
                      fieldName={`utilities[${index}].account`}
                      placeholder="Account"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={`${item.account}` || ''}
                    />
                    <FormInput
                      errors={errors}
                      fieldName={`utilities[${index}].companyName`}
                      placeholder="Company Name"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={`${item.companyName}` || ''}
                    />
                    <FormNumberInput
                      errors={errors}
                      fieldName={`utilities[${index}].monthlyCost`}
                      placeholder="Monthly Cost"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.monthlyCost || ''}
                    />
                    <FormNumberInput
                      errors={errors}
                      fieldName={`utilities[${index}].supportNumber`}
                      placeholder="Support Number"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.supportNumber || ''}
                    />
                    <FormSelect
                      errors={errors}
                      fieldName={`utilities[${index}].utilityType`}
                      options={UTILITY_OPTIONS}
                      placeholder="Select Type"
                      registerFn={register()}
                      mb={[2, 0]}
                      defaultValue={item.utilityType || ''}
                    />
                    <IconButton icon="delete" onClick={() => remove(index)} />
                  </Grid>
                );
              })}
          </Stack>
          <Flex justifyContent="flex-end">
            <Button onClick={addEmptyItem} variant="outline">
              Add
            </Button>
          </Flex>
          <UtilitiesFooter goToPreviousStep={goToPreviousStep} />
        </Box>
      </form>
    );
  },
);
