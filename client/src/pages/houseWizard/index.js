// @flow
import * as React from 'react';
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
import type { House } from '../house/models';
import { defaultAddress, defaultUtilities } from '../house/models';
import type { AddressFormModel } from './AddressForm';
import type { FinancialsFormModel } from './FinancialsForm';
import type { SupportFormModel } from './SupportForm';
import type { UtilitiesFormModel } from './UtilitiesForm';
import type { ReduxState } from '../../models/ReduxState';

type DispatchProps = $ReadOnly<{
  addHouse: (House, Object) => void,
}>;

type OwnProps = $ReadOnly<{
  history: { push: Function },
}>;

type Props = $ReadOnly<{
  ...DispatchProps,
  ...OwnProps,
}>;

export const HouseWizard: React.StatelessFunctionalComponent<Props> = ({ addHouse, history }) => {
  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAddressFormValid, setIsAddressFormValid] = React.useState(false);

  const onSubmit = (supportData: SupportFormModel) => {
    const address: AddressFormModel = addressFormRef.current
      ? addressFormRef.current.getValues()
      : { address: defaultAddress };
    const financials: FinancialsFormModel = financialsFormRef.current
      ? financialsFormRef.current.getValues()
      : { financials: {}, insurance: {} };
    const utilities: UtilitiesFormModel = utilitiesFormRef.current
      ? utilitiesFormRef.current.getValues()
      : { utilities: defaultUtilities };

    const formData: House = {
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };

    console.log('formData', formData);

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

export default connect<Props, OwnProps, void, *, ReduxState, *>(null, { addHouse })(
  withRouter(HouseWizard),
);
