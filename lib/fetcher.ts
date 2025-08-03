type FetcherOpts = RequestInit & { useApi?: boolean };

export const fetcher = async <T = unknown>(
  url: string,
  opts: FetcherOpts = {}
): Promise<T | null> => {

  const { useApi = false, headers: userHeaders, ...fetchOpts } = opts;

  const token = typeof window !== 'undefined'
    ? localStorage.getItem('jwt')
    : null;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const headers = {
    ...defaultHeaders,
    ...userHeaders
  };

  // Si useApi=true, prepende la base de Spring Boot; si no, deja relativa
  const base = useApi
    ? process.env.NEXT_PUBLIC_API_BASE
    : process.env.NEXT_PUBLIC_APP_BASE || '';

  const res = await fetch(`${base}${url}`, { ...fetchOpts, headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch error ${res.status}: ${text}`);
  }

  // Read raw text
  const text = await res.text();
  // If no content (empty string), return null
  if (!text) return null;

  // Parse JSON if text is non-empty
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to parse JSON: ${message}`);
  }
};