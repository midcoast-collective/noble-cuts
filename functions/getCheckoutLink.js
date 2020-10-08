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
const APPLICATION_ID = IS_PROD
  ? process.env.PROD_LOCATION_ID
  : process.env.SANDBOX_LOCATION_ID;

exports.handler = async function (event, context, callback) {
  const checkoutApi = new SquareConnect.CheckoutApi();
  const idempotencyKey = crypto.randomBytes(23).toString("hex");
  const cart = JSON.parse(event.body);

  console.log("Access Token", process.env.SANDBOX_ACCESS_TOKEN);
  console.log("Application ID", APPLICATION_ID);
  console.log({ cart });

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

  const checkoutRequest = {
    idempotency_key: idempotencyKey,
    order: {
      idempotency_key: idempotencyKey,
      reference_id: Date.now().toString(),
      line_items: lineItems,
    },
    redirect_url: `https://noble-cuts.netlify.app/confirmation/`,
    ask_for_shipping_address: true,
    merchant_support_email: "nate@midcoast.io",
  };

  try {
    const response = await checkoutApi.createCheckout(
      APPLICATION_ID,
      checkoutRequest
    );

    console.log(result.checkout);
    callback(null, {
      statusCode: 200,
      body:
        response && response.checkout && response.checkout.checkout_page_url,
    });
  } catch (err) {
    console.log(err);

    callback(err);
  }
};
