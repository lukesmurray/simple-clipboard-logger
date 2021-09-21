if (!window.crypto) {
  //@ts-expect-error: this is a polyfill for IE11
  window.crypto = window.msCrypto;
}
