// Vercel Edge Function — proxies World Cup Bot API calls to VPS backend
export const config = { runtime: "edge" };

const BACKEND = "http://76.13.148.202:3456";

export default async function handler(request) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const url = new URL(request.url);
  // Extract the path after /worldcup-api
  const rawPath = url.pathname;
  const idx = rawPath.indexOf("/worldcup-api");
  const apiPath = idx >= 0 ? rawPath.substring(idx + "/worldcup-api".length) : rawPath;
  const targetUrl = `${BACKEND}/api${apiPath}${url.search}`;

  try {
    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/json",
        "Accept": "application/json",
      },
      body: request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined,
    });

    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Backend unavailable", message: error.message }),
      {
        status: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}