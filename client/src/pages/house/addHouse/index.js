// @flow
import * as React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import type { AddressFormModel } from './AddressForm';
import { AddressForm } from './AddressForm';
import type { SupportFormModel } from './SupportForm';
import { SupportForm } from './SupportForm';
import type { FinancialsFormModel } from './FinancialsForm';
import { FinancialsForm } from './FinancialsForm';
import type { UtilitiesFormModel } from './UtilitiesForm';
import { UtilitiesForm } from './UtilitiesForm';
import { addHouse } from '../../../actions/house';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import type { AddHouse } from '../models';
import { defaultAddress, defaultUtilities } from '../models';
import type { ReduxState } from '../../../models/ReduxState';
import { BackToDashboard } from '../../../components/BackLink';
import { useTabStep } from '../useTabStep';

type DispatchProps = $ReadOnly<{
  addHouse: (AddHouse<string>, Object) => void,
}>;

type OwnProps = $ReadOnly<{
  history: { push: Function },
}>;

type Props = $ReadOnly<{
  ...DispatchProps,
  ...OwnProps,
}>;

export const HouseWizard: React.StatelessFunctionalComponent<Props> = ({ addHouse, history }) => {
  // these refs are passed to the respective forms.
  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();

  // value of isAddressFormValid determines whether the address form has valid data or not. If address data is not valid,
  // the other tabs are hidden
  const [isAddressFormValid, setIsAddressFormValid] = React.useState(false);

  const onSubmit = (supportData: SupportFormModel) => {
    // The form data is fetched using the refs. See https://reactjs.org/docs/hooks-reference.html#useimperativehandle for more details.
    const address: AddressFormModel = addressFormRef.current
      ? addressFormRef.current.getValues()
      : { address: defaultAddress };
    const financials: FinancialsFormModel = financialsFormRef.current
      ? financialsFormRef.current.getValues()
      : { financials: {}, insurance: {} };
    const utilities: UtilitiesFormModel = utilitiesFormRef.current
      ? utilitiesFormRef.current.getValues()
      : { utilities: defaultUtilities };

    // merge the 4 house attributes to make house object to add
    const formData: AddHouse<string> = {
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };

    // dispatch action to add the house to the database and redirect to dashboard
    addHouse(formData, history);
  };

  // custom hook to manage the steps in the wizard journey. Also used in View/Edit pages
  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

  return (
    <PageContent heading="Add a new House">
      <BackToDashboard />

      {/* https://chakra-ui.com/tabs */}
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
