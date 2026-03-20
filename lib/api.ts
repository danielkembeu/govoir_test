const rawBaseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!rawBaseUrl) {
  throw new Error(
    "EXPO_PUBLIC_API_URL manquant. Définis-le dans mobile/.env.local.",
  );
}

export const API_BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;
