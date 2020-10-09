const SquareConnect = require("square-connect");
const crypto = require("crypto");

const SquareClient = SquareConnect.ApiClient.instance;
const IS_PROD = false;

SquareClient.basePath = IS_PROD
  ? "https://connect.squareup.com"
  : "https://connect.squareupsandbox.com";

const oauth2 = SquareClient.authentications["oauth2"];
oauth2.accessToken = IS_PROD
  ? process.env.PROD_ACCESS_TOKEN
  : process.env.SANDBOX_ACCESS_TOKEN;

const LOCATION_ID = IS_PROD
  ? process.env.PROD_LOCATION_ID
  : process.env.SANDBOX_LOCATION_ID;

const APPLICATION_ID = IS_PROD
  ? "sq0idp-2VSnO9Xmxpkajj6zTS1MoA"
  : "sandbox-sq0idb-7iiDnOGPVYM8gj0SQXnHMg";

exports.handler = async function (event, context, callback) {
  const paymentsApi = new SquareConnect.PaymentsApi();
  const idempotencyKey = crypto.randomBytes(23).toString("hex");

  const data = JSON.parse(event.body);
  const { cart, nonce, buyerVerificationToken, email, address } = data

  console.log("Access Token", process.env.SANDBOX_ACCESS_TOKEN);
  console.log("Application ID", LOCATION_ID);
  console.log({ cart, nonce, buyerVerificationToken, email, address });

  const lineItems =
    cart.map((productInCart) => {
      return {
        name: productInCart.title,
        quantity: `${productInCart.quantity}`,
        base_price_money: {
          amount: parseInt(productInCart.price),
          currency: "USD",
        },
        note: productInCart.description,
      };
    }) || [];

  const requestBody = paymentsApi.CreatePaymentRequest(
    APPLICATION_ID,
    {
      source_id: nonce,
      idempotency_key: idempotencyKey,
      amount_money: "100",
      // order: {
      //   idempotency_key: idempotencyKey,
      //   reference_id: Date.now().toString(),
      //   line_items: lineItems,
      // },
      location_id: LOCATION_ID,
      verification_token: buyerVerificationToken,
      buyer_email_address: email,
      billing_address: address,
      shipping_address: address,
      note: JSON.stringify(cart),
    }
  );

  paymentsApi.createPayment(requestBody).then((data) => {
    console.log('API called successfully. Returned data: ' + data);

    callback(null, {
      statusCode: 200,
      body:
        response && response.checkout && response.checkout.checkout_page_url,
    });
  }, (error) => {
    console.error(error);

    callback(err);
  });
};
