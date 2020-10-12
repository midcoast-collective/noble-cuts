import React from "react";

import { Layout } from "@components/index";

const Success = (): JSX.Element => {
  const [receiptUrl, setReceiptUrl] = React.useState<null | string>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let params = new URLSearchParams(window.location.search);
      let receipt = params.get("receipt");

      setReceiptUrl(receipt);
    }
  }, []);

  return (
    <Layout
      title={`Payment Success | Noble Cuts`}
      description={""}
      url={"https://noblecutsmeat.com/success/"}
      showCart={false}
    >
      <section>
        <div className="wrap narrow" style={{ paddingBottom: "40vh" }}>
          <h2>Thank you for your order!</h2>
          <p>
            For information on your order, please contact us at PHONE_NUMBER.
          </p>
          {receiptUrl ? (
            <p>
              Here is the receipt for your payment:{" "}
              <a href={receiptUrl} target="_blank">
                {receiptUrl}
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Success;
