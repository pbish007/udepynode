// @flow
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { Footer } from './Footer';
import { useForm } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../components/form/FormField';
import type { Utilities } from '../house/models';

type UtilitiesFormProps = {|
  goToNextStep: () => void,
  goToPreviousStep: boolean => void,
|};

export type UtilitiesFormModel = {|
  utilities: Utilities,
|};

const SpecialUtilitiesFields = ({ errors, type, register, title }) => {
  return (
    <Flex direction="column" mb={2} mt={6}>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(4, 1fr)']}
        gap={[0, null, 3]}
        alignItems="center">
        <Text fontWeight="bold">{title}</Text>
        <FormInput
          errors={errors}
          fieldName={`utilities.${type}.account`}
          placeholder="Account number"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormNumberInput
          leftContent="$"
          errors={errors}
          fieldName={`utilities.${type}.monthlyCost`}
          placeholder="Monthly Cost"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormNumberInput
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
        <FormNumberInput
          leftContent="$"
          errors={errors}
          fieldName={`utilities.${type}.monthlyCost`}
          placeholder="Monthly Cost"
          registerFn={register}
          mb={[2, 0]}
        />
        <FormNumberInput
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

export const UtilitiesForm = React.forwardRef<UtilitiesFormProps, any>(
  ({ goToNextStep, goToPreviousStep }: UtilitiesFormProps, ref: any) => {
    const formProps = useForm({ mode: 'onChange' });
    const { handleSubmit, errors, formState, register, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: (): UtilitiesFormModel => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = values => {
      if (formState.isValid) {
        goToNextStep();
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
            <SpecialUtilitiesFields
              errors={errors}
              register={register}
              type="netflix"
              title="Netflix"
            />
            <SpecialUtilitiesFields errors={errors} register={register} type="hulu" title="Hulu" />
          </Stack>
          <Footer
            rightButton={{ text: 'Support' }}
            leftButton={{ text: 'Financials', onClick: goToPreviousStep }}
          />
        </Box>
      </form>
    );
  },
);
