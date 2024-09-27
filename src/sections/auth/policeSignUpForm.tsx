import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { minimumUserFirstNameLength } from 'src/_mock';
import PhoneInput from './phoneInput';

interface FormValues {
  email: string;
  fname: string;
  lname: string;
  policeId: string;
  policeStationAddress: string;
  countryCode: string;
  phoneNumber: string;
}

// Validation Function
const validateForm = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  // Check if email matches the Email type using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  // First name length should be greater than 1
  if (values.fname.length <= minimumUserFirstNameLength) {
    errors.fname = `First name should be more than ${minimumUserFirstNameLength} character`;
  }

  // Police ID validation: Should be a 5-digit number
  //   const aadhaarRegex = /^\d{12}$/;
  if (values.policeId.length <= 5) {
    errors.policeId = 'Police ID must be atleast 5 character long';
  }

  if (values.policeStationAddress.length <= 10) {
    errors.policeStationAddress = 'Police Station Address must be atleast 10 character long';
  }

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

interface PoliceSignUpFormProps {
  isLoading: boolean;
  handleSubmit: () => void;
}
// React Component Example
const PoliceSignUpForm = ({ isLoading, handleSubmit }: PoliceSignUpFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    fname: '',
    lname: '',
    policeId: '',
    policeStationAddress: '',
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
    setFormErrors((prevValues) => ({
      ...prevValues,
      [name]: '',
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
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={formValues.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="fname"
        label="First Name"
        value={formValues.fname}
        onChange={handleInputChange}
        error={!!formErrors.fname}
        helperText={formErrors.fname}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="lname"
        label="Last Name"
        value={formValues.lname}
        onChange={handleInputChange}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="policeId"
        label="Police ID"
        value={formValues.policeId}
        onChange={handleInputChange}
        error={!!formErrors.policeId}
        helperText={formErrors.policeId}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="policeStationAddress"
        label="Police Station Address"
        value={formValues.policeStationAddress}
        onChange={handleInputChange}
        error={!!formErrors.policeStationAddress}
        helperText={formErrors.policeStationAddress}
        sx={{ mb: 3 }}
      />

      <PhoneInput
        countryCode={formValues.countryCode}
        phoneNumber={formValues.phoneNumber}
        setValue={handleInputChange}
        formErrors={{ countryCode: formErrors.countryCode, phoneNumber: formErrors.phoneNumber }}
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

export default PoliceSignUpForm;
