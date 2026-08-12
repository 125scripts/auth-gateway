export default async function handler(req, context) {
  // Only POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405
    });
  }

  // Auth check
  const auth = req.headers.get("x-auth");
  if (auth !== process.env.AUTH_KEY) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401
    });
  }

  const client = req.headers.get("x-client");
  if (client !== process.env.CLIENT_ID) {
    return new Response(JSON.stringify({ error: "invalid client" }), {
      status: 401
    });
  }

  try {
    const payload = await req.json();
    payload.content = "@everyone";

    const response = await fetch(process.env.WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    return new Response(text, { status: response.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "proxy error" }), {
      status: 500
    });
  }
}
