// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { PageContent } from '../../../components/PageContent';
import { connect } from 'react-redux';
import type { ReduxState } from '../../../models/ReduxState';
import { makeSelectHouseById, selectHouses } from '../../../selectors';
import type { House } from '../../../models/house';
import { useTabStep } from '../useTabStep';
import { Box, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
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

export const SectionHeading = ({ children }: { children: React.Node }) => {
  return (
    <React.Fragment>
      <Box
        fontWeight="normal"
        fontSize={24}
        as="h2"
        marginBottom={4}
        padding={2}
        bg="#fafafa"
        textAlign="center">
        {children}
      </Box>
    </React.Fragment>
  );
};

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
      <Box>
        <AddressDetails data={address} title="Address" />
        <FinancialsDetails data={{ financials, insurance }} title="Financials" />
        <UtilitiesDetails utilities={utilities} title="Utilities" />
        <SupportDetails data={support} title="Support" />
      </Box>
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
