import type { ValidationResult } from '$types';
import { validateEmail } from './emailValidator';
import { validateUsername } from './usernameValidator';

export function validateUsernameOrEmail(value: string): ValidationResult {
  if (value.length == 0) {
    return {
      valid: false,
      message: '',
    };
  }

  if (validateEmail(value).valid) {
    return {
      valid: true,
      message: '',
    };
  }

  if (validateUsername(value).valid) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: 'Invalid username or email format',
  };
}
