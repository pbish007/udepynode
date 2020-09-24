// @flow
import * as React from 'react';
import axios from 'axios';
import { Box, Button, Grid, useToast } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';

import { AddressFooter } from './Footer';
import type { Address } from '../../../models/house';
import { CITY_LABEL, COUNTRY_LABEL, STATE_LABEL, STREET_LABEL, ZIP_LABEL } from '../constants';
import { fetchLocationFromAddress } from '../../../api/map';
import { StaticStreetMap } from '../../../components/Map';
import { FormInput } from '../../../components/form/FormInput';
import { API_ROUTES } from '../../../actions/apiRoutes';
import { ImageList } from '../../../components/ImageList';

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
  addHouseImage?: (string, Address, string, Function) => void,
  setDefaultHouseImage?: (string, string | null) => void,
  deleteHouseImage?: (string, string) => void,
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
      setDefaultHouseImage,
      deleteHouseImage,
    }: AddressFormProps,
    ref: any,
  ) => {
    const formProps = useForm({ mode: 'onChange', defaultValues: initialValues });
    const [location, setLocation] = React.useState<{ lat: string, lng: string } | null>(null);
    const { handleSubmit, errors, register, formState, getValues, watch } = formProps;

    const watchAddress1 = watch('address.street');
    const watchCity = watch('address.city');
    const watchZip = watch('address.zip');
    const watchState = watch('address.state');
    const watchCountry = watch('address.country');

    const toast = useToast();

    const images = initialValues?.address?.images || [];
    const hasDefaultImage = images.some(i => i.isDefault);

    const isEditMode = !!houseId;

    // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
    React.useImperativeHandle(ref, () => ({
      // used by the parent to get form values
      getValues: (): AddressFormModel => {
        const formData: AddressFormModel = getValues({ nest: true });
        return {
          address: {
            ...formData.address,
            images,
          },
        };
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

    React.useEffect(() => {
      if (isEditMode) {
        fetchImages().then(() => {});
      }
    }, [isEditMode, watchAddress1, watchCity, watchZip, watchState, watchCountry]);

    const handleChange = async e => {
      const file = e.target.files[0];
      let fileParts = file.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];

      toast({
        title: 'Uploading Image',
        description:
          'The image is being uploaded. You will get a notification when the image is successfully uploaded.',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });

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
        await axios.put(signedRequest, file, options);
        if (addHouseImage && houseId) {
          const address = getValues({ nest: true }).address;
          addHouseImage(houseId, address, url, toast);
        }
      } catch (err) {
        console.log('ERROR ' + JSON.stringify(err));
      }
    };

    const setDefaultImage = (imageId: string | null) => {
      if (houseId && setDefaultHouseImage) {
        setDefaultHouseImage(houseId, imageId);
      }
    };

    const deleteImage = (imageId: string) => {
      if (houseId && deleteHouseImage) {
        deleteHouseImage(houseId, imageId);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p={4}>
          <Grid templateColumns={['repeat(1, 1fr)', null, '1fr 2fr']} gap={[0, null, 4]}>
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
              {/*
              <Button onClick={fetchImages} style={{ marginRight: 20 }}>
                Get images from Google
              </Button>

*/}
              {isEditMode && images?.length < 5 ? (
                <Button width={200} marginTop="20px">
                  Upload your images
                  <FileUploadHidden type="file" onChange={handleChange} />
                </Button>
              ) : null}
            </Box>
            <React.Fragment>
              <Grid templateColumns={'repeat(1, 1fr)'} gap={[0, null, 4]}>
                <StaticStreetMap
                  location={location}
                  canSetDefault={isEditMode}
                  isDefault={!hasDefaultImage}
                  setDefault={() => setDefaultImage(null)}
                />
              </Grid>
            </React.Fragment>
          </Grid>
          <ImageList
            images={images}
            isEditMode
            setDefault={setDefaultImage}
            deleteImage={deleteImage}
          />
          <AddressFooter />
        </Box>
      </form>
    );
  },
);
