// @flow
import * as React from 'react';
import axios from 'axios';
import { Box, Button, Grid } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';

import { AddressFooter } from './Footer';
import type { Address } from '../../../models/house';
import { CITY_LABEL, COUNTRY_LABEL, STREET_LABEL, STATE_LABEL, ZIP_LABEL } from '../constants';
import { fetchLocationFromAddress } from '../../../api/map';
import { StaticMap, StaticStreetMap } from '../../../components/Map';
import { FormInput } from '../../../components/form/FormInput';
import { API_ROUTES } from '../../../actions/apiRoutes';

const ADDRESS1_FIELD = 'address.street';
const CITY_FIELD = 'address.city';
const ZIP_FIELD = 'address.zip';
const STATE_FIELD = 'address.state';
const COUNTRY_FIELD = 'address.country';

const FileUploadHidden = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

type AddressFormProps = {|
  initialValues?: { address: Address },
  goToNextStep: () => void,
  addHouseImage?: (string, Address, string) => void,
  setIsAddressFormValid: boolean => void,
  houseId?: string,
|};

export type AddressFormModel = {|
  address: Address,
|};

export const AddressForm = React.forwardRef<AddressFormProps, any>(
  (
    {
      goToNextStep,
      setIsAddressFormValid,
      initialValues,
      addHouseImage,
      houseId,
    }: AddressFormProps,
    ref: any,
  ) => {
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const [location, setLocation] = React.useState<{ lat: string, lng: string } | null>(null);
    const { handleSubmit, errors, register, formState, getValues } = formProps;

    const images = initialValues?.address?.images;

    // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
    React.useImperativeHandle(ref, () => ({
      // used by the parent to get form values
      getValues: (): AddressFormModel => {
        return getValues({ nest: true });
      },
    }));

    // informs the parent if the validity of the form changes. This is to control the disabled state of other tabs.
    React.useEffect(() => {
      setIsAddressFormValid(formState.isValid);
    }, [formState.isValid, setIsAddressFormValid]);

    // if form is valid, and form is submitted, take the user to next step/tab.
    const onSubmit = () => {
      if (formState.isValid) {
        goToNextStep();
      }
    };

    // fetch the location from address, and display the images
    const fetchImages = async () => {
      const address: AddressFormModel = getValues({ nest: true });
      // fetch location from address
      const data = await fetchLocationFromAddress(address);

      if (data) {
        // set the location attributes on state. If the location is fetched successfully, the maps are displayed.
        // See StaticStreetMap and StaticMap components, and the render below.
        setLocation(data);
      }
    };

    const handleChange = async e => {
      const file = e.target.files[0];
      let fileParts = file.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];

      const response = await axios.post(API_ROUTES.S3_UPLOAD, {
        fileName: `${fileName}_${Date.now()}`,
        fileType: fileType,
      });

      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;

      const options = {
        headers: {
          'Content-Type': fileType,
        },
      };
      try {
        const result = await axios.put(signedRequest, file, options);
        console.log('Response from s3', result);
        if (addHouseImage && houseId) {
          const address = getValues({ nest: true }).address;
          addHouseImage(houseId, address, url);
        }
      } catch (err) {
        console.log('ERROR ' + JSON.stringify(err));
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']} gap={[0, null, 4]}>
            <Box>
              <FormInput
                errors={errors}
                fieldName={ADDRESS1_FIELD}
                label={STREET_LABEL}
                registerFn={register({ required: 'Street is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={CITY_FIELD}
                label={CITY_LABEL}
                registerFn={register({ required: 'City/Town is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={ZIP_FIELD}
                label={ZIP_LABEL}
                registerFn={register({ required: 'Zip/Postal is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={STATE_FIELD}
                label={STATE_LABEL}
                registerFn={register({ required: 'State/Prov is required' })}
              />
              <FormInput
                errors={errors}
                fieldName={COUNTRY_FIELD}
                label={COUNTRY_LABEL}
                registerFn={register({ required: 'Country is required' })}
              />
              {!images ? (
                <Button onClick={fetchImages} style={{ marginRight: 20 }}>
                  Get images from Google
                </Button>
              ) : null}

              {houseId ? (
                <Button width={200} marginTop="20px">
                  Upload your images
                  <FileUploadHidden type="file" onChange={handleChange} />
                </Button>
              ) : null}
            </Box>
            {!images ? (
              <React.Fragment>
                <StaticMap location={location} pt="1.75rem" />
                <StaticStreetMap location={location} pt="1.75rem" />
              </React.Fragment>
            ) : (
              <div>User images - {images?.length}</div>
            )}
          </Grid>

          <AddressFooter />
        </Box>
      </form>
    );
  },
);
