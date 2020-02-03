// @flow
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { Footer } from './Footer';
import { useForm } from 'react-hook-form';
import { FormInput } from '../form/FormField';

type UtilitiesFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

const UtilitiesFields = ({ errors, type, register, title }) => {
  return (
    <Flex direction="column" mb={2}>
      <Text fontWeight="bold" mb={1}>
        {title}
      </Text>
      <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(4, 1fr)']} gap={[0, null, 3]}>
        <FormInput
          errors={errors}
          fieldName={`utilities.${type}.companyName`}
          placeholder="Company"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormInput
          errors={errors}
          fieldName={`utilities.${type}.account`}
          placeholder="Account number"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormInput
          errors={errors}
          fieldName={`utilities.${type}.monthlyCost`}
          placeholder="Monthly Cost"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormInput
          errors={errors}
          fieldName={`utilities.${type}.supportNumber`}
          placeholder="Support number"
          registerFn={register}
          mb={[2, 0]}
        />
      </Grid>
    </Flex>
  );
};

export const UtilitiesForm = ({ goToNextStep, goToPreviousStep }: UtilitiesFormProps) => {
  const formProps = useForm({ mode: 'onChange' });
  const { handleSubmit, errors, formState, register } = formProps;

  const onSubmit = values => {
    console.log('form values', values);
    if (formState.isValid) {
      // goToNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p={4}>
        <Stack>
          <UtilitiesFields
            errors={errors}
            register={register}
            type="electricity"
            title="Electricity"
          />
          <UtilitiesFields errors={errors} register={register} type="internet" title="Internet" />
          <UtilitiesFields
            errors={errors}
            register={register}
            type="tv_provider"
            title="TV Provider"
          />
          <UtilitiesFields errors={errors} register={register} type="gas" title="Gas" />
          <UtilitiesFields errors={errors} register={register} type="oil" title="Oil" />
        </Stack>
        <Footer
          rightButton={{ text: 'Support' }}
          leftButton={{ text: 'Financials', onClick: goToPreviousStep }}
        />
      </Box>
    </form>
  );
};
