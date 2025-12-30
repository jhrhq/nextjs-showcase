type PasswordStrengthResult = {
  score: number;
  isValid: boolean;
  isMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
};

export function checkPasswordStrength(
  password?: string,
): PasswordStrengthResult {
  if (!password)
    return {
      score: 0,
      isValid: false,
      isMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSymbol: false,
    };

  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;
  let hasSymbol = false;

  for (let i = 0; i < password.length; i++) {
    const code = password.charCodeAt(i);

    if (!hasUppercase && code >= 65 && code <= 90) {
      hasUppercase = true;
    } else if (!hasLowercase && code >= 97 && code <= 122) {
      hasLowercase = true;
    } else if (!hasNumber && code >= 48 && code <= 57) {
      hasNumber = true;
    } else if (
      !hasSymbol &&
      !(code >= 48 && code <= 57) &&
      !(code >= 65 && code <= 90) &&
      !(code >= 97 && code <= 122)
    ) {
      hasSymbol = true;
    }

    // Early exit when all character conditions are met
    if (hasUppercase && hasLowercase && hasNumber && hasSymbol) {
      break;
    }
  }

  const isMinLength = password.length >= 8;

  const isValid =
    isMinLength && hasUppercase && hasLowercase && hasNumber && hasSymbol;

  const score = isValid ? 5 : 0;

  return {
    score,
    isValid,
    isMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbol,
  };
}
