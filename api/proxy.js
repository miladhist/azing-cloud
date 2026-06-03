export const config = { runtime: "edge" };
export default async function handler(request) {
  const url = new URL(request.url);
  // Extract path after /api/proxy
  let path = url.searchParams.get("p") || "/stats";
  try {
    const r = await fetch("http://76.13.148.202:3456/api" + path);
    const d = await r.json();
    return new Response(JSON.stringify(d), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=30" }
    });
  } catch(e) {
    return new Response(JSON.stringify({error:"backend offline"}), { status: 502, headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"} });
  }
}
