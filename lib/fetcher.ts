type FetcherOpts = RequestInit & { useApi?: boolean };

export const fetcher = async (url: string, opts: FetcherOpts = {}) => {
  const { useApi = false, ...fetchOpts } = opts;

  // Si useApi=true, prepende la base de Spring Boot; si no, deja relativa
  const base = useApi
    ? process.env.NEXT_PUBLIC_API_BASE
    : process.env.NEXT_PUBLIC_APP_BASE || '';

  const res = await fetch(`${base}${url}`, fetchOpts);

  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};