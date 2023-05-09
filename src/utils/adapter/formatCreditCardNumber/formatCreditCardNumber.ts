/**
 * Function format string value to credit card number for react input
 * @param creditCardNumber
 * @param maxLength
 */
export const formatCreditCardNumber = (creditCardNumber: string | number, maxLength = 19): string => {
  const value = String(creditCardNumber);
  const valueWithoutDigit = value.replace(/\D/g, "");
  const valueWithSpaceAfterEveryFourthDigit = valueWithoutDigit.replace(/(\d{4})(?=\d)/g, "$1 ");

  if (valueWithSpaceAfterEveryFourthDigit.length > maxLength) {
    return valueWithSpaceAfterEveryFourthDigit.slice(0, maxLength);
  }

  return valueWithSpaceAfterEveryFourthDigit;
};

export default formatCreditCardNumber;
