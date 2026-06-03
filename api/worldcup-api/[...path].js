export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST", "Access-Control-Allow-Headers": "Content-Type" }
    });
  }
  const url = new URL(req.url);
  const path = url.pathname.replace("/api/worldcup-api", "") || "/stats";
  try {
    const r = await fetch("http://76.13.148.202:3456/api" + path + url.search, {
      method: req.method,
      headers: { "Content-Type": req.headers.get("Content-Type") || "application/json", "Accept": "application/json" },
      body: req.method !== "GET" ? await req.text() : undefined,
    });
    const d = await r.json();
    return new Response(JSON.stringify(d), {
      status: r.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch(e) {
    return new Response(JSON.stringify({error:"backend offline"}), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
