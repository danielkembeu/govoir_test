import { API_BASE_URL } from "@/lib/api";

class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
    const baseUrl = this.baseUrl.endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    const url = `${baseUrl}/${normalizedEndpoint}`;

    // Debug: trace l'URL finale appelée et les options.
    console.log("[HttpClient] request", {
      baseUrl: this.baseUrl,
      normalizedBaseUrl: baseUrl,
      endpoint,
      normalizedEndpoint,
      url,
      method: options.method ?? "GET",
      headers: options.headers,
    });

    const response = await fetch(url, {
      ...options,
    });

    if (!response.ok) {
      // Debug: log le corps brut pour comprendre pourquoi ça renvoie Not found.
      const text = await response.text();
      console.log("[HttpClient] response not ok", {
        url,
        status: response.status,
        statusText: response.statusText,
        bodyText: text,
      });
      if (!text) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        const data = JSON.parse(text) as {
          error?: string;
          detail?: string;
          [key: string]: unknown;
        };
        console.log("[HttpClient] parsed error json", { url, data });
        throw new Error(
          `HTTP ${response.status} @ ${url} -> ${data.error ?? data.detail ?? text}`,
        );
      } catch {
        throw new Error(`HTTP ${response.status} @ ${url} -> ${text}`);
      }
    }

    try {
      return await response.json();
    } catch {
      return {} as R;
    }
  }

  get<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
    return this.request<R>(endpoint, { ...options, method: "GET" });
  }

  post<R>(endpoint: string, body: unknown, options: RequestInit = {}): Promise<R> {
    return this.request<R>(endpoint, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  patch<R>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<R> {
    return this.request<R>(endpoint, {
      ...options,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  put<R>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<R> {
    return this.request<R>(endpoint, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });
  }

  delete<Q>(endpoint: string, options: RequestInit = {}): Promise<Q> {
    return this.request<Q>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new HttpClient(API_BASE_URL);
