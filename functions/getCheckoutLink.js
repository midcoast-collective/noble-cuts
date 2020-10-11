const squareConnect = require("square-connect");
const crypto = require("crypto");

exports.handler = async function (event, context, callback) {
  const data = JSON.parse(event.body);
  const { cartTotal, nonce, buyerVerificationToken } = data

  console.log({ cartTotal, nonce, buyerVerificationToken });

  // const requestBody = new squareConnect.CreatePaymentRequest(
  //   APPLICATION_ID,
  //   {
  //     source_id: nonce,
  //     idempotency_key: IDEMPOTENCY_KEY,
  //     amount_money: "100",
  //     location_id: LOCATION_ID,
  //     verification_token: buyerVerificationToken,
  //     buyer_email_address: email,
  //     billing_address: address,
  //     shipping_address: address,
  //     note: JSON.stringify(cart),
  //   }
  // );

  const idempotencyKey = crypto.randomBytes(23).toString('hex');

  const paymentsAPI = new squareConnect.PaymentsApi();
  const requestBody = {
    source_id: nonce,
    verification_token: buyerVerificationToken,
    amount_money: {
      amount: cartTotal,
      currency: 'USD'
    },
    idempotency_key: idempotencyKey
  };

  try {
    const response = await paymentsAPI.createPayment(requestBody);
    const json = JSON.stringify(response);
    console.log('API called successfully. Returned data: ' + data);

    callback(null, {
      statusCode: 200,
      body: json
    });

  } catch (error) {
    console.error(error);
    callback(err);
  }
};
