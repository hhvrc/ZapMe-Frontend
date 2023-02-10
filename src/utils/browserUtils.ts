import Bowser from "bowser";

export function getBrowserName(): string {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return browser.getBrowserName();
}
