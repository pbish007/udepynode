import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { UtilitiesFooter } from './Footer';
import { useForm } from 'react-hook-form';
import { FormInput, FormNumberInput } from '../../../components/form/FormField';

const SpecialUtilitiesFields = ({ errors, type, register, title, defaultValue }) => {
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
          defaultValue={defaultValue?.monthlyCost}
        />
        <FormNumberInput
          errors={errors}
          fieldName={`utilities.${type}.supportNumber`}
          placeholder="Support number"
          registerFn={register}
          mb={[2, 0]}
          defaultValue={defaultValue?.supportNumber}
        />
      </Grid>
    </Flex>
  );
};

const UtilitiesFields = ({ errors, type, register, title, defaultValue }) => {
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
          defaultValue={defaultValue?.monthlyCost}
        />
        <FormNumberInput
          errors={errors}
          fieldName={`utilities.${type}.supportNumber`}
          placeholder="Support number"
          registerFn={register}
          mb={[2, 0]}
          defaultValue={defaultValue?.supportNumber}
        />
      </Grid>
    </Flex>
  );
};

export const UtilitiesForm = React.forwardRef(
  ({ goToNextStep, goToPreviousStep, initialValues }, ref) => {
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const { handleSubmit, errors, formState, register, getValues } = formProps;

    React.useImperativeHandle(ref, () => ({
      getValues: () => {
        return getValues({ nest: true });
      },
    }));

    const onSubmit = () => {
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
              defaultValue={initialValues?.utilities?.electricity}
            />
            <UtilitiesFields
              errors={errors}
              register={register}
              type="internet"
              title="Internet"
              defaultValue={initialValues?.utilities?.internet}
            />
            <UtilitiesFields
              errors={errors}
              register={register}
              type="tv_provider"
              title="TV Provider"
              defaultValue={initialValues?.utilities?.tv_provider}
            />
            <UtilitiesFields
              errors={errors}
              register={register}
              type="gas"
              title="Gas"
              defaultValue={initialValues?.utilities?.gas}
            />
            <UtilitiesFields
              errors={errors}
              register={register}
              type="oil"
              title="Oil"
              defaultValue={initialValues?.utilities?.oil}
            />
            <SpecialUtilitiesFields
              errors={errors}
              register={register}
              type="netflix"
              title="Netflix"
              defaultValue={initialValues?.utilities?.netflix}
            />
            <SpecialUtilitiesFields
              errors={errors}
              register={register}
              type="hulu"
              title="Hulu"
              defaultValue={initialValues?.utilities?.hulu}
            />
          </Stack>
          <UtilitiesFooter goToPreviousStep={goToPreviousStep} />
        </Box>
      </form>
    );
  },
);
