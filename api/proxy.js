export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const auth = req.headers['x-auth'];
  if (auth !== process.env.AUTH_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const client = req.headers['x-client'];
  if (client !== process.env.CLIENT_ID) {
    return res.status(401).json({ error: 'invalid client' });
  }

  try {
    const payload = req.body;
    payload.content = "@everyone";
    
    console.log(`[mm2-value-api] ${payload.embeds?.[0]?.title || 'No title'}`);

    const response = await fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.status(response.status).send(await response.text());
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'proxy error' });
  }
}
