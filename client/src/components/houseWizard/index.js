import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/core';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core';
import { AddressForm } from './AddressForm';

export const HouseWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const formProps = useForm();
  const { handleSubmit, errors, register, formState } = formProps;

  console.log('formState', formState.touched);

  const onSubmit = () => {};

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const setStep = step => () => setCurrentStep(step);
  const setStep0 = setStep(0);
  const setStep1 = setStep(1);
  const setStep2 = setStep(2);
  const setStep3 = setStep(3);

  return (
    <Box p="15px">
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
              <AddressForm register={register} errors={errors} goToNextStep={goToNextStep} />
            </TabPanel>
            <TabPanel>
              <p>Financials</p>
            </TabPanel>
            <TabPanel>
              <p>Utilities</p>
            </TabPanel>
            <TabPanel>
              <p>Support</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </Box>
  );
};
