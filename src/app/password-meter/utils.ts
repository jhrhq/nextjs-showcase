export type PasswordStrength = "" | "Weak" | "Average" | "Good" | "Strong";

type PasswordStrengthResult = {
  score: number;
  strength: PasswordStrength;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
};

export function checkPasswordStrength(
  password?: string,
): PasswordStrengthResult {
  if (!password) {
    return {
      score: 0,
      strength: "",
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSymbol: false,
    };
  }

  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;
  let hasSymbol = false;

  for (let i = 0; i < password.length; i++) {
    const code = password.charCodeAt(i);

    if (code >= 65 && code <= 90) hasUppercase = true;
    else if (code >= 97 && code <= 122) hasLowercase = true;
    else if (code >= 48 && code <= 57) hasNumber = true;
    else hasSymbol = true;
  }

  const length = password.length;
  const hasCore = hasUppercase && hasLowercase && hasSymbol;
  const hasAll = hasCore && hasNumber;

  let strength: PasswordStrength = "Weak";
  let score = 1;

  if (length >= 16) {
    strength = "Strong";
    score = 4;
  } else if (length >= 11) {
    if (hasCore) {
      strength = "Strong";
      score = 4;
    } else {
      strength = "Average";
      score = 2;
    }
  } else if (length >= 9 && hasCore) {
    strength = "Good";
    score = 3;
  } else if (length >= 7 && hasAll) {
    strength = "Average";
    score = 2;
  }

  return {
    score,
    strength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbol,
  };
}

/* 
  Progress condition
  - conditons - chars variation check -  atleast one symbol, one upper, one lower, one number
  - conditions - chars length check
  min password>=9 chars length  with no chars variation  -> 'Weak Password'
  min password>=11 chars length  with chars variation  -> 'Good Password'
  min password>=16 chars lenght with chars variation -> 'Strong Password'

  min password >=6|7|8 chars and if includes symbol, upper, lower -> 'Weak Password'
  min password >=7 chars and if includes symbol,upper, lower, number -> 'Average Password'
  min password >=9 chars and if includes symbol, upper, lower -> 'Good Password'
  min password >=11 chars and if includes symbol, upper, lower -> 'Strong Password'
*/

// | Strength | Length | Required                        |
// | -------- | ------ | ------------------------------- |
// | ""       | < 6    | —                               |
// | Weak     | ≥ 7    | missing upper/lower/symbol      |
// | Weak     | ≥ 9    | missing upper/lower/symbol      |
// | Average  | ≥ 7    | upper + lower + symbol + number |
// | Good     | ≥ 9    | upper + lower + symbol          |
// | Average  | ≥ 11   | missing                         |
// | Strong   | ≥ 11   | upper + lower + symbol          |

/* 
  Progress condition
  min 9 char one progress with no condition fullfilled
  min 6/7/8 chars one progress with light yellow  if symbol, upper, lower
  min 7 chars two progress with yellow if symbol,upper, lower, number
  min 9 chars two progress with yellow if symbol, upper, lower
  min 11 chars three progress with green if symbol, upper, lower also if no symbol, upper,lower or symbol, upper, lower, number
  min 16 chars four progress with green if symbol, upper, lower also if no symbol, upper,lower or symbol, upper, lower, number
*/

/* 
0. 16 chars -> long password (4 progress) -> symbol, upper, lower even no other condition fullfilled
1. 11 chars -> strong password(4 progress green)-> symbol,upper, lower
11 chars -> good pasword (3 progress) -> only 11 chars condition no other condition
2. 9 chars -> good password(3 progress green) -> symbol,upper, lower
3. 7 chars -> average password(2 progress yellow) -> symbol,upper, lower, number
4. 6/7/8 chars -> weak password (1 progress yellow) -> symbol, upper, lower
5. 9 chars -> weak password (1 progress yellow) -> only lower
6. chars -> Must have at least 6 chars (no progress) -> symbol, upper, lower
*/
