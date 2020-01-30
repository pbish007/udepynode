import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex } from '@chakra-ui/core';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core';
import { AddressForm } from './AddressForm';
import { SupportForm } from './SupportForm';
import { FinancialsForm } from './FinancialsForm';
import { UtilitiesForm } from './UtilitiesForm';

export const HouseWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const formProps = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors, register } = formProps;

  const onSubmit = values => {
    console.log('values', values);
  };

  const setStep = step => () => setCurrentStep(step);
  const setStep0 = setStep(0);
  const setStep1 = setStep(1);
  const setStep2 = setStep(2);
  const setStep3 = setStep(3);

  return (
    <Box p="15px">
      <Flex justifyContent="flex-start" mb={2}>
        <Button onClick={() => {}} type="button" leftIcon="arrow-back" variant="ghost">
          Dashboard
        </Button>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs index={currentStep}>
          <TabList>
            <Tab onClick={setStep0}>Address</Tab>
            <Tab onClick={setStep1}>Financials</Tab>
            <Tab onClick={setStep2}>Utilities</Tab>
            <Tab onClick={setStep3}>Support</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AddressForm register={register} errors={errors} goToNextStep={setStep1} />
            </TabPanel>
            <TabPanel>
              <FinancialsForm
                register={register}
                errors={errors}
                goToNextStep={setStep2}
                goToPreviousStep={setStep0}
              />
            </TabPanel>
            <TabPanel>
              <UtilitiesForm
                register={register}
                errors={errors}
                goToNextStep={setStep3}
                goToPreviousStep={setStep1}
              />
            </TabPanel>
            <TabPanel>
              <SupportForm
                errors={errors}
                register={register}
                goToPreviousStep={setStep2}
                submitForm={handleSubmit(onSubmit)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </Box>
  );
};
