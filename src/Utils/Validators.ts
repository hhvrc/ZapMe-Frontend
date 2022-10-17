

// Validate username (must be at least 3 characters, can't start or end with whitespace, and can't contain cursed characters)
function validateUsername(value: string): string | null {
    if (value.length < 3) {
        return 'must be at least 3 characters';
    } else if (value.length > 32) {
        return 'must be less than 32 characters long';
    } else if (value.indexOf('\u200b') !== -1) {
      return 'no monkeybusiness here plz ;w;';
    }

    return null;
}

// Validate email (must be a valid email)
function validateEmail(value: string): string | null {
    if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return 'must be a valid email';
    }

    return null;
}

// Validate password (min length is 10, must have at least one: lowercase, uppercase, number, special character)
function validatePassword(value: string): string | null {
    if (value.length < 10) {
        return 'must be at least 10 characters long';
    } else if (!value.match(/[a-z]/)) {
        return 'must contain at least one lowercase letter';
    } else if (!value.match(/[A-Z]/)) {
        return 'must contain at least one uppercase letter';
    } else if (!value.match(/[0-9]/)) {
        return 'must contain at least one number';
    } else if (!value.match(/[*.!@#$%^&(){}[\]:";'<>,.?/~`_+\-=|\\]/)) {
        return 'must contain at least one special character';
    }

    return null;
}

function validateReCaptcha(value: string | null): string | null {
    // Check if the reCaptcha value is null
    if (value === null) {
        return 'Please verify that you\'re not a robot';
    }

    return null;
}

export { validateUsername, validateEmail, validatePassword, validateReCaptcha };