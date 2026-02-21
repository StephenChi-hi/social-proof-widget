// Site identity + per-site key generation
// Function codes: f03 (generate key pair), f04 (detect domain)

export function f03(): string {
  let existing = localStorage.getItem("site_key");
  if (!existing) {
    const newKey = crypto.randomUUID();
    localStorage.setItem("site_key", newKey);
    return newKey;
  }
  return existing;
}

export function f04(): string {
  return window.location.hostname;
}
