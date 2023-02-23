/**
 * Function format string value to credit card number for react input
 * @param creditCardNumber
 */
export const formatCreditCardNumber = (creditCardNumber: string | number): string => {
  const value = String(creditCardNumber)
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "");
  const matches = value.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  }

  return value;
};

export default formatCreditCardNumber;
