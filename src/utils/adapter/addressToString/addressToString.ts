interface AddressAdapterParams {
  streetNumber?: string | number;
  route?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

function getAddressLine1(address: AddressAdapterParams) {
  const streetNumber = address.route ? `${address.streetNumber || ""} ` : `${address.streetNumber || ""}`;
  const route = address.route || "";
  const line2 = getAddressLine2(address);
  const line3 = getAddressLine3(address);
  const end = (address.route || address.streetNumber) && (line2 || line3) ? ", " : "";

  return `${streetNumber}${route}${end}`;
}

function getAddressLine2(address: AddressAdapterParams) {
  const postalCode = address.city ? `${address.postalCode || ""} ` : `${address.postalCode || ""}`;
  const city = address.city || "";
  const line3 = getAddressLine3(address);
  const end = (address.postalCode || address.city) && line3 ? ", " : "";

  return `${postalCode}${city}${end}`;
}

function getAddressLine3(address: AddressAdapterParams) {
  const country = address.country || "";

  return `${country}`;
}

/**
 * Function format string value to address
 * @param address
 */
export const addressToString = (address: AddressAdapterParams): string => {
  const line1 = getAddressLine1(address);
  const line2 = getAddressLine2(address);
  const line3 = getAddressLine3(address);

  return `${line1}${line2}${line3}`.trim();
};

export default addressToString;