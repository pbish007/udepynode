// @flow
import * as React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { useTabStep } from '../useTabStep';
import { Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/core';
import { BackToDashboard } from '../../../components/BackLink';
import { AddressForm } from '../addHouse/AddressForm';
import { FinancialsForm } from '../addHouse/FinancialsForm';
import { UtilitiesForm } from '../addHouse/UtilitiesForm';
import { SupportForm } from '../addHouse/SupportForm';
import type { SupportFormModel } from '../addHouse/SupportForm';
import type { AddressFormModel } from '../addHouse/AddressForm';
import { defaultAddress, defaultUtilities } from '../models';
import type { FinancialsFormModel } from '../addHouse/FinancialsForm';
import type { UtilitiesFormModel } from '../addHouse/UtilitiesForm';
import type { House } from '../models';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import { updateHouse } from '../../../actions/house';

type DispatchProps = $ReadOnly<{
  updateHouse: (House, Object) => void,
}>;

type OwnProps = $ReadOnly<{
  history: { push: Function },
}>;

type Props = $ReadOnly<{
  ...DispatchProps,
  ...OwnProps,
}>;

export const EditHouse: React.StatelessFunctionalComponent<Props> = ({ updateHouse, history }) => {
  const { houseId } = useParams();
  console.log('routeParams', houseId);

  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();

  const [isAddressFormValid, setIsAddressFormValid] = React.useState(false);

  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

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
      _id: houseId,
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };

    console.log('formData', formData);
    updateHouse(formData);
  };

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

export default connect<Props, OwnProps, void, *, ReduxState, *>(null, { updateHouse })(
  withRouter(EditHouse),
);
