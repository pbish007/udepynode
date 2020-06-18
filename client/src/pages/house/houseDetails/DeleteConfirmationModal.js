// @flow
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/core';

export const DeleteConfirmationModal = ({
  onCancel,
  isOpen,
  onClick,
}: {
  onCancel: () => void,
  isOpen: boolean,
  onClick: () => void,
}) => {
  return (
    <Modal onClose={onCancel} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button onClick={onClick} type="button" variant="solid" mr={5}>
            Confirm
          </Button>
          <Button onClick={onCancel} type="button" variant="outline">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
