// @flow
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { useTabStep } from '../useTabStep';
import { Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/core';
import { BackToDashboard } from '../../../components/BackLink';

export const EditHouse = () => {
  const { houseId } = useParams();
  console.log('routeParams', houseId);

  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();
  const isAddressFormValid = true;
  return (
    <PageContent heading="Edit House">
      <BackToDashboard />

      <Tabs index={currentStep}>
        <TabList style={{ flexWrap: 'wrap' }}>
          <Tab onClick={setStep0}>Address</Tab>
          <Tab onClick={setStep1} isDisabled={!isAddressFormValid}>
            Financials
          </Tab>
          <Tab onClick={setStep2} isDisabled={!isAddressFormValid}>
            Utilities
          </Tab>
          <Tab onClick={setStep3} isDisabled={!isAddressFormValid}>
            Support
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Address</TabPanel>
          <TabPanel>Financials</TabPanel>
          <TabPanel>Utilities</TabPanel>
          <TabPanel>Support</TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  );
};
