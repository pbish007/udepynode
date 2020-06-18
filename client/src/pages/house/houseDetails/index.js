// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import { makeSelectHouseById, selectHouses } from '../../../selectors';
import type { House } from '../models';
import { useTabStep } from '../useTabStep';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import { AddressDetails } from './AddressDetails';
import { FinancialsDetails } from './FinancialsDetails';
import { UtilitiesDetails } from './UtilitiesDetails';
import { SupportDetails } from './SupportDetails';
import { BackToDashboard } from '../../../components/BackLink';
import { IconButton, RoundedLinkButton } from '../../../components/CustomButtons/RoundedLinkButton';
import { getHouseEditRoute } from '../../../constants';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { deleteHouse } from '../../../actions/house';

type OwnProps = {
  match: { params: { houseId?: string } },
  history: { push: Function },
};

type MapStateProps = $ReadOnly<{|
  house: ?House,
  houses: ?Array<House>,
|}>;

type DispatchProps = $ReadOnly<{
  deleteHouse: (string, Object) => void,
}>;

type Props = {|
  ...OwnProps,
  ...MapStateProps,
  ...DispatchProps,
|};

const HouseDetails: React.StatelessFunctionalComponent<Props> = ({
  house,
  deleteHouse,
  history,
}) => {
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] = React.useState(false);
  const { setStep0, setStep1, setStep2, setStep3, currentStep } = useTabStep();

  if (!house) {
    return null;
  }

  const { address, financials, insurance, support, utilities } = house;

  const editRoute = getHouseEditRoute(house._id);

  return (
    <PageContent heading="House Details">
      <Flex justify="space-between">
        <BackToDashboard />

        <Flex direction="row" alignItems="center">
          <RoundedLinkButton to={editRoute} icon="edit" />
          <IconButton mt={-1} icon="delete" onClick={() => setShouldDisplayDeleteModal(true)} />
        </Flex>
      </Flex>
      <Tabs index={currentStep}>
        <TabList style={{ flexWrap: 'wrap' }}>
          <Tab onClick={setStep0}>Address</Tab>
          <Tab onClick={setStep1}>Financials</Tab>
          <Tab onClick={setStep2}>Utilities</Tab>
          <Tab onClick={setStep3}>Support</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AddressDetails data={address} />
          </TabPanel>
          <TabPanel>
            <FinancialsDetails data={{ financials, insurance }} />
          </TabPanel>
          <TabPanel>
            <UtilitiesDetails data={utilities} />
          </TabPanel>
          <TabPanel>
            <SupportDetails data={support} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DeleteConfirmationModal
        onCancel={() => setShouldDisplayDeleteModal(false)}
        isOpen={shouldDisplayDeleteModal}
        onClick={() => deleteHouse(house._id, history)}
      />
    </PageContent>
  );
};

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): MapStateProps => {
  const selectHouseById = makeSelectHouseById();

  return {
    houses: selectHouses(state),
    house: selectHouseById(state, ownProps.match.params.houseId),
  };
};

export default connect<Props, *, MapStateProps, *, ReduxState, *>(mapStateToProps, { deleteHouse })(
  withRouter(HouseDetails),
);
