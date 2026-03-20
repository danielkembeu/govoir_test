class HttpClient {
  baseUrl: string;

  constructor(baseUrl: string = "/api/v1") {
    this.baseUrl = baseUrl;

    console.log({ baseUrl });
  }

  async request<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
    const baseUrl = this.baseUrl.endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    const url = `${baseUrl}/${normalizedEndpoint}`;

    console.log({ BASE_URL, url });

    const response = await fetch(url, {
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      // Re-throwing error, can be improved with custom error classes, etc.
      const text = await response.text();
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }

    // Attempt to parse as JSON, fallback empty
    try {
      return await response.json();
    } catch {
      return {} as R;
    }
  }

  get<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
    return this.request<R>(endpoint, { ...options, method: "GET" });
  }

  post<R>(
    endpoint: string,
    body: unknown,
    options: RequestInit = {},
  ): Promise<R> {
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

const BASE_URL = process.env.API_URL;

export const api = new HttpClient(BASE_URL);
