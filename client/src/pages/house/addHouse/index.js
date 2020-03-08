import * as React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import { AddressForm } from './AddressForm';
import { SupportForm } from './SupportForm';
import { FinancialsForm } from './FinancialsForm';
import { UtilitiesForm } from './UtilitiesForm';
import { addHouse } from '../../../actions/house';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { defaultAddress, defaultUtilities } from '../models';
import { BackToDashboard } from '../../../components/BackLink';
import { useTabStep } from '../useTabStep';

export const HouseWizard = ({ addHouse, history }) => {
  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();
  const [isAddressFormValid, setIsAddressFormValid] = React.useState(false);

  const onSubmit = supportData => {
    const address = addressFormRef.current
      ? addressFormRef.current.getValues()
      : { address: defaultAddress };
    const financials = financialsFormRef.current
      ? financialsFormRef.current.getValues()
      : { financials: {}, insurance: {} };
    const utilities = utilitiesFormRef.current
      ? utilitiesFormRef.current.getValues()
      : { utilities: defaultUtilities };

    const formData = {
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };

    addHouse(formData, history);
  };

  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

  return (
    <PageContent heading="Add a new House">
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
