// @flow
import * as React from 'react';

type Props = {
  setStep: (step: number) => () => void,
  setStep0: () => void,
  setStep1: () => void,
  setStep2: () => void,
  setStep3: () => void,
  currentStep: number,
};
export const useTabStep = (): Props => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const setStep = (step: number) => (): void => {
    setCurrentStep(step);
  };

  const setStep0 = setStep(0);
  const setStep1 = setStep(1);
  const setStep2 = setStep(2);
  const setStep3 = setStep(3);

  return { setStep, setStep0, setStep1, setStep2, setStep3, currentStep };
};
