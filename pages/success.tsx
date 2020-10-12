import React from "react";

import { Layout } from "@components/index";

const Success = (): JSX.Element => {
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
        </div>
      </section>
    </Layout>
  );
};

export default Success;
