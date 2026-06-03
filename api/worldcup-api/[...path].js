export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*" } });
  }
  const url = new URL(req.url);
  let path = url.pathname.replace("/api/worldcup-api", "") || "/health";
  try {
    const r = await fetch("http://76.13.148.202:3456/api" + path + url.search, {
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    const d = await r.json();
    return new Response(JSON.stringify(d), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=30" }
    });
  } catch(e) {
    return new Response(JSON.stringify({error:"backend offline"}), {
      status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}
