const HOST = process.env.PUBLIC_URL;

export async function api<T>(url: string): Promise<T> {
  const response = await fetch(`${HOST}${url}`);
  const data = await response.json();
  return data as T;
}
