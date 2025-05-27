interface Options {
  local?: string;
  currency?: string;
  style?: string;
}

const defaultOptions = {
  currency: "EUR",
  local: "fr-FR",
  style: "currency",
};

/**
 * Adapt price to local display format
 * exemple: priceAdapter(1000) -> 1 000 €
 * exemple: priceAdapter(1000.5) -> 1 000,50 €
 * @param value
 * @param options @default { local: "fr-FR", currency: "EUR", style: "currency" }
 */
export const priceAdapter = (value?: number | "-" | null, options?: Options) => {
  const { currency, local, style } = {
    ...defaultOptions,
    ...options,
  };

  if (value === "-") {
    const parts = new Intl.NumberFormat(local, { currency, style: "currency" }).formatToParts(0);
    const currencySymbol = parts.find((part) => part.type === "currency")?.value || currency;
    return `-${currencySymbol}`;
  }

  if (!value) {
    return new Intl.NumberFormat(local, {
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      style,
    }).format(0);
  }

  const isInteger = Number.isInteger(value);
  const formatOptions = {
    currency,
    maximumFractionDigits: isInteger ? 0 : 2,
    minimumFractionDigits: isInteger ? 0 : 2,
    style,
  };

  return new Intl.NumberFormat(local, formatOptions).format(Number(value));
};

export default priceAdapter;
