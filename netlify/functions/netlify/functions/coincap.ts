export async function handler() {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=10");

  const data = await res.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };
}
