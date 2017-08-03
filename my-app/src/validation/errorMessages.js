export const isRequired = fieldName => `${fieldName} is required`;

export const maxLength = length => {
  return (fieldName) => `${fieldName} must be less than ${length} characters`;
};

export const parsePhoneNumber = fieldName => `${fieldName} not correct format`;


