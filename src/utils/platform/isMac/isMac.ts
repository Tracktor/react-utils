/**
 * Checks if the current platform is macOS.
 * SSR-safe: returns `false` when `navigator` is not available.
 */
const isMac = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;

  if (uaData?.platform) {
    return uaData.platform.toLowerCase().includes("mac");
  }

  return /mac/i.test(navigator.userAgent);
};

export default isMac;
