// This is taken from https://github.com/hhvrc/ZapMe-Backend/blob/master/backend/Utils/CharsetMatchers.cs#L82
const MultipleWhiteSpaceRegex = /\s{2,}/;
const UnwantedCharacterRegex = /[\u02B0-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u2000-\u209F\u20D0-\u21FF\u2300-\u23FF\u2460-\u24FF\u25A0-\u27BF\u2900-\u297F\u2B00-\u2BFF\uFE00-\uFE0F\u{1F000}-\u{1F02F}\u{1F0A0}-\u{10FFFF}]/u;

function validateUsername(username: string): { valid: boolean; message: string | null } {
  if (username.length == 0) {
    return { valid: false, message: null };
  }
  if (username.length < 3) {
    return { valid: false, message: 'Username is too short' };
  }
  if (username.length > 32) {
    return { valid: false, message: 'Username is too long' };
  }
  const trimmedLength = username.trim().length;
  if (trimmedLength == 0) {
    return { valid: false, message: 'Username cannot consist of only whitespaces' };
  }
  if (trimmedLength != username.length) {
    return { valid: false, message: 'Username cannot start or end with whitespace' };
  }
  if (MultipleWhiteSpaceRegex.test(username)) {
    return { valid: false, message: 'Username cannot contain consecutive whitespaces' };
  }
  if (UnwantedCharacterRegex.test(username)) {
    return { valid: false, message: 'Emoji/Zalgo/Weird Unicode characters are not allowed in username' };
  }

  return { valid: true, message: null };
}

export { validateUsername };