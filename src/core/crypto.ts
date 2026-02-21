// Handles encryption/decryption logic
// Function codes: f05 (encrypt), f06 (decrypt)


export async function f05(payload: string, key: CryptoKey): Promise<string> {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(payload),
  );
  const buffer = new Uint8Array(encrypted);
  return btoa(
    String.fromCharCode(...iv) + "|" + String.fromCharCode(...buffer),
  );
}

export async function f06(
  encryptedData: string,
  key: CryptoKey,
): Promise<string> {
  const [ivStr, dataStr] = encryptedData.split("|");
  const iv = new Uint8Array([...ivStr].map((c) => c.charCodeAt(0)));
  const data = new Uint8Array([...dataStr].map((c) => c.charCodeAt(0)));
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data,
  );
  return new TextDecoder().decode(decrypted);
}

export async function f09GenerateAesKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);
}
