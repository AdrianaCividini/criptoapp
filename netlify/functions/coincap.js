import fetch from "node-fetch";

export async function handler() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets?limit=10");

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch CoinCap API",
        details: error.message,
      }),
    };
  }
}
