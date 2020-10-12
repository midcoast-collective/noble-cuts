const squareConnect = require("square-connect");
const { v4: uuidv4 } = require("uuid");

const squareClient = squareConnect.ApiClient.instance;
const oauth2 = squareClient.authentications["oauth2"];

oauth2.accessToken = process.env.SANDBOX_ACCESS_TOKEN;
// oauth2.accessToken = process.env.ACCESS_TOKEN;
squareClient.basePath = "https://connect.squareupsandbox.com";
// squareClient.basePath = "https://connect.squareup.com"

exports.handler = async function (event, context, callback) {
  const data = JSON.parse(event.body);
  const { customer } = data;

  const idempotencyKey = uuidv4();

  console.log({ customer });

  const customersApi = new squareConnect.CustomersApi();
  const requestBody = {
    given_name: customer.firstName,
    family_name: customer.lastName,
    email_address: customer.email,
    phone_number: customer.phone,
    address: {
      address_line_1: customer.address,
    },
    idempotency_key: idempotencyKey,
  };

  try {
    const response = await customersApi.createCustomer(requestBody);
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
