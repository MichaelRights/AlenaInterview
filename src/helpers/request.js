export async function request(uri, method = "GET", body = null, headers = {}) {
  if (body) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(uri, {
    method,
    body,
    headers,
  });
  if (!response.ok) {
    throw response;
  }
  const data = await response.json();
  return data;
}
