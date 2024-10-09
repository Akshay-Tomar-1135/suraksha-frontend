import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import PhoneInput from './phoneInput';

interface FormValues {
  countryCode: string;
  phoneNumber: string;
}

// Validation Function
const validateForm = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  const countryCodeRegex = /^\d{1,3}$/;
  if (!countryCodeRegex.test(values.countryCode)) {
    errors.countryCode = 'Country Code must be of 1-3 digits';
  }

  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be of 10 digits';
  }

  return errors;
};

interface SignInFormProps {
  isLoading: boolean;
  handleSubmit: () => void;
}
// React Component Example
const SignInForm = ({ isLoading, handleSubmit }: SignInFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    countryCode: '',
    phoneNumber: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});

  // Single handler function to update state dynamically
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  };

  // Function to validate on submit
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm(formValues);
    setFormErrors(errors);

    // Check if there are no errors, then submit form
    if (Object.values(errors).length === 0) {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <PhoneInput
        countryCode={formValues.countryCode}
        phoneNumber={formValues.phoneNumber}
        setValue={handleInputChange}
        formErrors={formErrors}
      />

      <LoadingButton
        fullWidth
        loading={isLoading}
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Send OTP
      </LoadingButton>
    </form>
  );
};

export default SignInForm;
