interface Options {
  local?: string;
  currency?: string;
  maximumSignificantDigits?: number;
  style?: string;
}

const defaultOptions = {
  currency: "EUR",
  local: "fr-FR",
  maximumSignificantDigits: 1,
  style: "currency",
};

/**
 * Adapt price to local display format
 * exemple: priceAdapter(1000) -> 1 000,00 €
 * @param value
 * @param options @default { local: "fr-FR", currency: "EUR", maximumSignificantDigits: 1, style: "currency" }
 */
export const priceAdapter = (value?: number | null, options?: Options) => {
  const { currency, local, maximumSignificantDigits, style } = { ...defaultOptions, ...options };

  if (!value) {
    return new Intl.NumberFormat(local, {
      currency,
      maximumSignificantDigits,
      style,
    }).format(0);
  }

  return new Intl.NumberFormat(local, {
    currency,
    style,
  }).format(value);
};

export default priceAdapter;
