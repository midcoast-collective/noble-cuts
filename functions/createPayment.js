const squareConnect = require("square-connect");
const { v4: uuidv4 } = require("uuid");

const squareClient = squareConnect.ApiClient.instance;
const oauth2 = squareClient.authentications["oauth2"];

// oauth2.accessToken = process.env.SANDBOX_ACCESS_TOKEN;
oauth2.accessToken = process.env.PROD_ACCESS_TOKEN;
// squareClient.basePath = "https://connect.squareupsandbox.com";
squareClient.basePath = "https://connect.squareup.com";

exports.handler = async function (event, context, callback) {
  const data = JSON.parse(event.body);
  const { cartTotal, customerId, nonce, buyerVerificationToken, note } = data;

  const idempotencyKey = uuidv4();

  console.log({
    cartTotal,
    customerId,
    nonce,
    buyerVerificationToken,
    idempotencyKey,
    note,
  });

  const paymentsAPI = new squareConnect.PaymentsApi();
  const requestBody = {
    source_id: nonce,
    customer_id: customerId,
    verification_token: buyerVerificationToken,
    amount_money: {
      amount: parseInt(cartTotal, 10),
      currency: "USD",
    },
    idempotency_key: idempotencyKey,
    note,
  };

  try {
    const response = await paymentsAPI.createPayment(requestBody);
    const json = JSON.stringify(response);
    console.log("API called successfully. Returned data: " + json);

    callback(null, {
      statusCode: 200,
      body: json,
    });
  } catch (error) {
    console.error(error);
    callback(err);
  }
};
