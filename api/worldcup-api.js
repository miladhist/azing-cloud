const BACKEND = "http://76.13.148.202:3456";

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*" } });
  }
  const url = new URL(req.url);
  let path = url.searchParams.get("path") || "/stats";
  try {
    const r = await fetch(BACKEND + "/api" + path);
    const d = await r.json();
    return new Response(JSON.stringify(d), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch(e) {
    return new Response(JSON.stringify({error:"backend offline"}), {
      status: 502, headers: { "Content-Type": "application/json" }
    });
  }
}
