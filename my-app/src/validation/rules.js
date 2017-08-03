import * as ErrorMessages from './errorMessages.js';

export const required = (text) => {
  if (text) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const maxLength = (length) => {
  return (text) => {
  	if (typeof text === 'undefined') return null;
    return text.length <= length ? null : ErrorMessages.maxLength(length);
  };
};

export const parsePhoneNumber = (text) => {
	let regexp = /^(\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2})$/;
	return regexp.test(text.trim()) ? null : ErrorMessages.parsePhoneNumber;
};


