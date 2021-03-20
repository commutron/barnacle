
exports.handler = async function(event, context) {
  const datetime = new Date();
  const datetimestring = datetime.toUTCString();
  return {
      statusCode: 200,
      body: JSON.stringify({ server_time: datetimestring }),
      headers: {
        "Access-Control-Allow-Origin": "https://commutron-time.netlify.app",
        // "Access-Control-Allow-Origin": "*",   
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
  };
}