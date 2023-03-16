import { validate } from 'email-validator';

function validateEmail(email: string): { valid: boolean; message: string | null } {
  if (email.length == 0) {
    return { valid: false, message: null };
  }
  if (!validate(email)) {
    return { valid: false, message: 'Invalid email' };
  }
  if (email.includes('+')) {
    return { valid: false, message: 'Email cannot contain aliases' };
  }

  return { valid: true, message: null };
}

export { validateEmail };