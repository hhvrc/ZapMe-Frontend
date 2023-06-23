const AlphaNumeric_CharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const AplhaNumeric_CharSetLength = AlphaNumeric_CharSet.length;

export function GeneratePseudoRandomString(length: number): string {
  if (length < 0) {
    throw new Error('Length must be greater than 0');
  }

  let result = '';
  let counter = 0;

  while (counter++ < length) {
    result += AlphaNumeric_CharSet.charAt(Math.random() * AplhaNumeric_CharSetLength);
  }

  return result;
}
