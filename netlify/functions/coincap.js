const axios = require("axios");

exports.handler = async function () {
  try {
    const response = await axios.get("https://api.coincap.io/v2/assets", {
      params: {
        limit: 10,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch CoinCap API",
        message: error.message,
      }),
    };
  }
};
