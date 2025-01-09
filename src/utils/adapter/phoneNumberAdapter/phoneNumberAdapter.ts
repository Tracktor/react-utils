interface PhoneNumberAdapterProps {
  phoneNumber: string;
  addPrefix?: boolean;
}

/**
 * Adapt phone number to local display format with or without prefix.
 * Supports automatic detection of country code based on the first two digits.
 *
 * Usage examples:
 * - phoneNumberAdapter({ phoneNumber: '0123456789' }) -> 01 23 45 67 89
 * - phoneNumberAdapter({ phoneNumber: '33123456789' }) -> 01 23 45 67 89
 * - phoneNumberAdapter({ phoneNumber: '33123456789', addPrefix: true }) -> +33 1 23 45 67 89
 * - phoneNumberAdapter({ phoneNumber: '441234567890', addPrefix: true }) -> +44 1234 567 890
 * - phoneNumberAdapter({ phoneNumber: '4915123456789' }) -> 0151 234 56789
 *
 * Supported country formats:
 * | Country Code | Country       | Sample Input          | Expected Format      |
 * |--------------|---------------|-----------------------|----------------------|
 * | 33           | France        | 33123456789           | 01 23 45 67 89      |
 * | 44           | United Kingdom | 441234567890          | 1234 567 890        |
 * | 49           | Germany       | 4915123456789         | 0151 234 56789      |
 * | 34           | Spain         | 349876543210          | 987 654 321         |
 *
 * @param phoneNumber The phone number to be adapted.
 * @param addPrefix Adds the international prefix (+33, +44, etc.) if enabled. @default false
 */
const phoneNumberAdapter = ({ phoneNumber, addPrefix = false }: PhoneNumberAdapterProps): string => {
  const validPhoneNumber = phoneNumber.replace(/\D/g, "");

  const detectedCountryCode = (() => {
    const prefix = validPhoneNumber.slice(0, 2);
    if (validPhoneNumber.startsWith("0")) {
      return "fr";
    }
    switch (prefix) {
      case "33":
        return "fr";
      case "44":
        return "uk";
      case "49":
        return "de";
      case "34":
        return "es";
      default:
        return "unknown";
    }
  })();

  const formattedPhoneNumber = (() => {
    switch (detectedCountryCode) {
      case "fr": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("33") ? validPhoneNumber.slice(2) : validPhoneNumber;

        const localNumber = numberWithoutCountryCode.startsWith("0") ? numberWithoutCountryCode : `0${numberWithoutCountryCode}`;

        const trimmedNumber = localNumber.slice(0, 10); // Limiter à 10 chiffres
        return trimmedNumber.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
      }
      case "uk": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("44") ? validPhoneNumber.slice(2) : validPhoneNumber;
        return numberWithoutCountryCode.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
      }
      case "de": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("49") ? validPhoneNumber.slice(2) : validPhoneNumber;
        const localNumber = numberWithoutCountryCode.startsWith("0") ? numberWithoutCountryCode : `0${numberWithoutCountryCode}`;
        return localNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
      }
      case "es": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("34") ? validPhoneNumber.slice(2) : validPhoneNumber;
        return numberWithoutCountryCode.slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
      }
      default: {
        return validPhoneNumber.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
      }
    }
  })();

  if (addPrefix) {
    const countryCodePrefix = validPhoneNumber.slice(0, 2);
    return `+${countryCodePrefix} ${formattedPhoneNumber}`;
  }

  return formattedPhoneNumber;
};

export default phoneNumberAdapter;
