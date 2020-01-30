import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Text } from '@chakra-ui/core';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core';
import { AddressForm } from './AddressForm';

export const HouseWizard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formProps = useForm();
  const { handleSubmit, errors, register, formState } = formProps;

  console.log('formState', formState.touched);

  const onSubmit = values => {
    setIsSubmitting(true);

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Box p="15px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs>
          <TabList>
            <Tab>Address</Tab>
            <Tab>Financials</Tab>
            <Tab>Utilities</Tab>
            <Tab>Support</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AddressForm register={register} errors={errors} />
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
