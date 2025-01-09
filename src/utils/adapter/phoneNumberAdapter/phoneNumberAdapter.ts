/**
 * Formats a phone number based on its country code or a default French format.
 *
 * @param phoneNumber The phone number to format (can include country code).
 * @param options Optional configuration:
 *  - `addPrefix` (boolean): Add the international prefix (+33, +44, etc.). Default is `false`.
 *  - `separator` (string): Character to separate number groups. Default is a space (" ").
 * @returns The formatted phone number.
 *
 * Usage examples:
 * - phoneNumberAdapter('0123456789') -> "01 23 45 67 89"
 * - phoneNumberAdapter('33123456789') -> "01 23 45 67 89"
 * - phoneNumberAdapter('441234567890', { addPrefix: true }) -> "+44 1234 567 890"
 * - phoneNumberAdapter('1234567890', { separator: '-' }) -> "(123)-456-7890".
 *
 * @SupportedCountries:
 * | Country Code | Country        | Expected Format       |
 * |--------------|----------------|-----------------------|
 * | 33           | France         | 01 23 45 67 89        |
 * | 44           | United Kingdom | 1234 567 890          |
 * | 49           | Germany        | 0151 234 56789        |
 * | 34           | Spain          | 987 654 321           |
 * | 1            | United States  | (123) 456-7890        |
 */
const phoneNumberAdapter = (phoneNumber: string, options: { addPrefix?: boolean; separator?: string } = {}): string => {
  const { addPrefix = false, separator = " " } = options;

  const validPhoneNumber = phoneNumber.replace(/\D/g, "");
  const detectedCountryCode = (() => {
    if (validPhoneNumber.startsWith("1")) {
      return "us";
    }
    const prefix = validPhoneNumber.slice(0, 2);

    // French phone numbers can start with 0* or 33
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

  const formatWithSeparator = (str: string) => str.replace(/ /g, separator);

  const formattedPhoneNumber = (() => {
    switch (detectedCountryCode) {
      case "fr": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("33") ? validPhoneNumber.slice(2) : validPhoneNumber;
        const localNumber = numberWithoutCountryCode.startsWith("0") ? numberWithoutCountryCode : `0${numberWithoutCountryCode}`;
        return formatWithSeparator(
          localNumber
            .slice(0, 10)
            .replace(/(\d{2})(?=\d)/g, "$1 ")
            .trim(),
        );
      }
      case "uk": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("44") ? validPhoneNumber.slice(2) : validPhoneNumber;
        return formatWithSeparator(numberWithoutCountryCode.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3"));
      }
      case "de": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("49") ? validPhoneNumber.slice(2) : validPhoneNumber;
        const localNumber = numberWithoutCountryCode.startsWith("0") ? numberWithoutCountryCode : `0${numberWithoutCountryCode}`;
        return formatWithSeparator(localNumber.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3"));
      }
      case "es": {
        const numberWithoutCountryCode = validPhoneNumber.startsWith("34") ? validPhoneNumber.slice(2) : validPhoneNumber;
        return formatWithSeparator(numberWithoutCountryCode.slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"));
      }
      case "us": {
        const numberWithoutCountryCode = validPhoneNumber.length === 11 ? validPhoneNumber.slice(1) : validPhoneNumber;
        const trimmedNumber = numberWithoutCountryCode.slice(0, 10);
        return formatWithSeparator(trimmedNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
      }
      default: {
        return formatWithSeparator(validPhoneNumber.replace(/(\d{2})(?=\d)/g, "$1 ").trim());
      }
    }
  })();

  if (addPrefix) {
    const countryCodePrefix = detectedCountryCode === "us" ? "1" : validPhoneNumber.slice(0, 2);
    return `+${countryCodePrefix} ${formattedPhoneNumber}`;
  }

  return formattedPhoneNumber;
};

export default phoneNumberAdapter;
