// @flow
import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/core';
import { AddressForm } from './AddressForm';
import { SupportForm } from './SupportForm';
import { FinancialsForm } from './FinancialsForm';
import { UtilitiesForm } from './UtilitiesForm';
import { addHouse } from '../../actions/house';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageContent } from '../../components/PageContent';

export const HouseWizard = ({
  addHouse,
  history,
}: {
  addHouse: Function,
  history: { push: Function },
}) => {
  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAddressFormValid, setIsAddressFormValid] = useState(false);

  const onSubmit = supportData => {
    const address = addressFormRef.current ? addressFormRef.current.getValues() : {};
    const financials = financialsFormRef.current ? financialsFormRef.current.getValues() : {};
    const utilities = utilitiesFormRef.current ? utilitiesFormRef.current.getValues() : {};

    const formData = {
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };

    addHouse(formData, history);
  };

  const setStep = (step: number) => (): void => {
    setCurrentStep(step);
  };

  const setStep0 = setStep(0);
  const setStep1 = setStep(1);
  const setStep2 = setStep(2);
  const setStep3 = setStep(3);

  return (
    <PageContent>
      <Flex justifyContent="flex-start" mb={2}>
        <Button onClick={() => {}} type="button" leftIcon="arrow-back" variant="ghost">
          Dashboard
        </Button>
      </Flex>

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
          <TabPanel>
            <AddressForm
              ref={addressFormRef}
              goToNextStep={setStep1}
              setIsAddressFormValid={setIsAddressFormValid}
            />
          </TabPanel>
          <TabPanel>
            <FinancialsForm
              goToNextStep={setStep2}
              goToPreviousStep={setStep0}
              ref={financialsFormRef}
            />
          </TabPanel>
          <TabPanel>
            <UtilitiesForm
              goToNextStep={setStep3}
              goToPreviousStep={setStep1}
              ref={utilitiesFormRef}
            />
          </TabPanel>
          <TabPanel>
            <SupportForm goToPreviousStep={setStep2} submitForm={onSubmit} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  );
};

export default connect(null, { addHouse })(withRouter(HouseWizard));
