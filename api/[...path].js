export const config = { runtime: "edge" };

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "") + url.search;
  const backend = "http://76.13.148.202:3456/api" + path;

  try {
    const res = await fetch(backend, {
      headers: { "Accept": "application/json" },
      method: request.method,
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
