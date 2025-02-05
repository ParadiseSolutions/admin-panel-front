import React from "react";

const CreditCardElements = ({ methodData }) => {
  return (
    <>
      <div style={{width:"315px"}} className="" dangerouslySetInnerHTML={{ __html: methodData?.getSpecifications.email }}>
      </div>
    </>
  );
};

export default CreditCardElements;
