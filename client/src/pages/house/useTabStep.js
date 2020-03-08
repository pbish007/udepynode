import * as React from 'react';

export const useTabStep = (initialStep = 0) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);

  const setStep = step => () => {
    setCurrentStep(step);
  };

  const setStep0 = setStep(0);
  const setStep1 = setStep(1);
  const setStep2 = setStep(2);
  const setStep3 = setStep(3);

  return { setStep, setStep0, setStep1, setStep2, setStep3, currentStep };
};
