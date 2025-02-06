import React from "react";

const PaypalElement = ({ methodData }) => {
  return (
    <>
      <div className="" dangerouslySetInnerHTML={{ __html: methodData?.getSpecifications.admin_panel }}>
      </div>
    </>
  );
};

export default PaypalElement;
