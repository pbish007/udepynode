// @flow
import * as React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { useTabStep } from '../useTabStep';
import { Tab, TabList, Tabs, TabPanels, TabPanel, Box, Flex } from '@chakra-ui/core';
import { BackToDashboard } from '../../../components/BackLink';
import { AddressForm } from '../addHouse/AddressForm';
import { FinancialsForm } from '../addHouse/FinancialsForm';
import { UtilitiesForm } from '../addHouse/UtilitiesForm';
import { SupportForm } from '../addHouse/SupportForm';
import type { SupportFormModel } from '../addHouse/SupportForm';
import type { AddressFormModel } from '../addHouse/AddressForm';
import { defaultAddress } from '../../../models/house';
import type { FinancialsFormModel } from '../addHouse/FinancialsForm';
import type { UtilitiesFormModel } from '../addHouse/UtilitiesForm';
import type { Address, House } from '../../../models/house';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import {
  addHouseImage,
  updateHouse,
  setDefaultHouseImage,
  deleteHouseImage,
} from '../../../actions/house';
import { RoundedButton } from '../../../components/CustomButtons/RoundedLinkButton';
import { defaultUtilities } from '../../../models/Utility';
import { defaultSupportData } from '../../../models/Support';

type StateProps = $ReadOnly<{
  isLoading: boolean,
  houses: ?Array<House>,
}>;

type DispatchProps = $ReadOnly<{
  updateHouse: (string, House, Object) => void,
  addHouseImage: (string, Address, string) => void,
  setDefaultHouseImage: (string, string | null) => void,
  deleteHouseImage: (string, string) => void,
}>;

type OwnProps = $ReadOnly<{
  history: { push: Function },
}>;

type Props = $ReadOnly<{
  ...StateProps,
  ...DispatchProps,
  ...OwnProps,
}>;

export const EditHouse: React.StatelessFunctionalComponent<Props> = ({
  isLoading,
  houses,
  updateHouse,
  history,
  addHouseImage,
  setDefaultHouseImage,
  deleteHouseImage,
}) => {
  // get houseID from route params
  const { houseId } = useParams();
  // get the house corresponding to that houseId. useMemo caches the result so that it doesn't have to do the calculation
  // again for the same params. https://reactjs.org/docs/hooks-reference.html#usememo
  const houseById: ?House = React.useMemo((): ?House => houses?.find(h => h._id === houseId), [
    houseId,
    houses,
  ]);

  const addressFormRef = React.createRef();
  const financialsFormRef = React.createRef();
  const utilitiesFormRef = React.createRef();
  const supportFormRef = React.createRef();

  const [isAddressFormValid, setIsAddressFormValid] = React.useState(false);

  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

  const getFormData = (): House => {
    const address: AddressFormModel = addressFormRef.current
      ? addressFormRef.current.getValues()
      : { address: defaultAddress };
    const financials: FinancialsFormModel = financialsFormRef.current
      ? financialsFormRef.current.getValues()
      : { financials: {}, insurance: {} };
    const utilities: UtilitiesFormModel = utilitiesFormRef.current
      ? utilitiesFormRef.current.getValues()
      : { utilities: defaultUtilities };
    const supportData: SupportFormModel = supportFormRef.current
      ? supportFormRef.current.getValues()
      : { support: defaultSupportData };

    return {
      _id: houseId,
      ...address,
      ...financials,
      ...utilities,
      ...supportData,
    };
  };

  const onSubmit = () => {
    const formData: House = getFormData();

    updateHouse(houseId, formData, history);
  };

  if (isLoading) {
    return null;
  }

  // Display message if there is no house for that ID. This is a defensive check,
  // for scenarios like when the user has a bookmarked url and the house has been deleted, or the user doesn't have access to it.
  if (!houseById) {
    return (
      <PageContent heading="Edit House">
        <BackToDashboard />
        <Box p={4} fontSize="xl" textAlign="center">
          Sorry! No house found for the selected id!!
        </Box>
      </PageContent>
    );
  }

  const handleSave = () => {
    const formData: House = getFormData();
    updateHouse(houseId, formData, history);
  };

  const { address, insurance, financials, utilities, support } = houseById;

  return (
    <PageContent heading="Edit House">
      <Flex justify="space-between">
        <BackToDashboard />
        <RoundedButton icon="check" onClick={handleSave} />
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
              initialValues={{ address }}
              addHouseImage={addHouseImage}
              houseId={houseId}
              setDefaultHouseImage={setDefaultHouseImage}
              deleteHouseImage={deleteHouseImage}
            />
          </TabPanel>
          <TabPanel>
            <FinancialsForm
              goToNextStep={setStep2}
              goToPreviousStep={setStep0}
              ref={financialsFormRef}
              initialValues={{ financials, insurance }}
            />
          </TabPanel>
          <TabPanel>
            <UtilitiesForm
              goToNextStep={setStep3}
              goToPreviousStep={setStep1}
              ref={utilitiesFormRef}
              initialValues={{ utilities }}
            />
          </TabPanel>
          <TabPanel>
            <SupportForm
              ref={supportFormRef}
              goToPreviousStep={setStep2}
              initialValues={{ support }}
              submitForm={onSubmit}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  );
};

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    isLoading: state.houses.isLoading,
    houses: state.houses.data,
  };
};

export default connect<Props, OwnProps, StateProps, *, ReduxState, *>(mapStateToProps, {
  updateHouse,
  addHouseImage,
  setDefaultHouseImage,
  deleteHouseImage,
})(withRouter(EditHouse));
