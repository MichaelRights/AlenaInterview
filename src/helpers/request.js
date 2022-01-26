const HOST = "http://localhost:8080";
export async function request(uri, method = "GET", body = null, headers = {}) {
  if (body) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(HOST + uri, {
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
