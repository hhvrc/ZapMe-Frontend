import type { ValidationResult } from '$types';
import { validate } from 'email-validator';

export function validateEmail(value: string): ValidationResult {
  if (value.length == 0) {
    return {
      valid: false,
      message: '',
    };
  }

  if (!validate(value)) {
    return {
      valid: false,
      message: 'Invalid email',
    };
  }

  if (value.includes('+')) {
    return {
      valid: false,
      message: 'Email cannot contain aliases',
    };
  }

  return {
    valid: true,
    message: '',
  };
}
