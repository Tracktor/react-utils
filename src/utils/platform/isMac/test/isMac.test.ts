import { afterEach, describe, expect, it, vi } from "vitest";
import isMac from "../isMac";

describe("isMac", () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    vi.unstubAllGlobals();
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: originalNavigator,
    });
  });

  it("should return false when navigator is undefined (SSR)", () => {
    vi.stubGlobal("navigator", undefined);
    expect(isMac()).toBe(false);
  });

  it("should return true when userAgentData.platform is macOS", () => {
    vi.stubGlobal("navigator", { userAgentData: { platform: "macOS" } });
    expect(isMac()).toBe(true);
  });

  it("should return false when userAgentData.platform is Windows", () => {
    vi.stubGlobal("navigator", { userAgentData: { platform: "Windows" } });
    expect(isMac()).toBe(false);
  });

  it("should fallback to userAgent when userAgentData is missing", () => {
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    });
    expect(isMac()).toBe(true);
  });

  it("should return false for non-Mac userAgent", () => {
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    expect(isMac()).toBe(false);
  });
});
