// API calls / event submission
// Function codes: f01 (send event), f02 (fetch feed)

import { f03, f04 } from "./c02";

const BASE_URL = "https://your-backend.example.com";

export async function f01(eventType: string, payload: any) {
  const siteKey = f03();
  const domain = f04();
  await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteKey, domain, type: eventType, payload }),
  });
}

export async function f02() {
  const siteKey = f03();
  const domain = f04();
  const res = await fetch(
    `${BASE_URL}/feed?siteKey=${siteKey}&domain=${domain}`,
  );
  return res.json();
}
