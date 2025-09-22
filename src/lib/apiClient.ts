export class HttpError extends Error {
  public readonly status: number;
  public readonly statusText: string;

  constructor(response: Response, message?: string) {
    super(message ?? `Request failed with status ${response.status}`);
    this.name = 'HttpError';
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new HttpError(response);
  }

  return (await response.json()) as T;
}
