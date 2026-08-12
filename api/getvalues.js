const VALUE_DATABASE = {
  "HeartWand": 475,
  "Heart Wand": 475,
  "Gingerscope": 17500,
  "Chroma Evergun": 80000
};

export default function handler(req, context) {
  return new Response(JSON.stringify(VALUE_DATABASE), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}
