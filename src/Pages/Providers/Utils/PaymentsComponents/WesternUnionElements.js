import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';



const WesternUnionElements = ({ methodData }) => {
  return (
    <>
      <div className="d-flex flex-wrap" style={{ height: "22px" }}>
        <span className="fw-bold">Account Name:</span>
        <span className="mx-2">{methodData?.account_name}</span>
        <span
          className="text-warning mx-4"
          onClick={() => {
            navigator.clipboard.writeText(
              methodData?.getSpecifications.plain_text
            );

          }}
        >
          <i
            className="mdi mdi-content-copy font-size-18"
            id="copytooltipww"
            style={{ cursor: "pointer" }}
          />
          <UncontrolledTooltip placement="top" target="copytooltipww">
            Copy
          </UncontrolledTooltip>
        </span>
      </div>
      <div className="d-flex flex-wrap">
        <span className="fw-bold">State:</span>
        <span className="mx-2">{methodData?.state}</span>
      </div>
      <div className="d-flex flex-wrap">
        <span className="fw-bold">Country:</span>
        <span className="mx-2">{methodData?.country}</span>
      </div>
      <div className="d-flex flex-wrap">
        <span className="fw-bold">Phone:</span>
        <span className="mx-2">{methodData?.phone_country} {methodData?.phone}</span>
      </div>
      <br />
      {
        methodData?.account_type ? (
          <div className="d-flex flex-wrap">
            <span className="fw-bold">Account Type:</span>
            <span className="mx-2">{methodData?.account_type}</span>
          </div>
        ) : null
      }
      <div className="d-flex flex-wrap">
        <span className="fw-bold">Bank Name:</span>
        <span className="mx-2">{methodData?.bank_name}</span>
      </div>
      <div className="d-flex flex-wrap">
        <span className="fw-bold">Country:</span>
        <span className="mx-2">{methodData?.bank_country_name}</span>
      </div>
      {
        methodData?.aba_routing ? (
          <div className="d-flex flex-wrap">
            <span className="fw-bold">ABA Routing:</span>
            <span className="mx-2">{methodData?.aba_routing}</span>
          </div>
        ) : null
      }
      {methodData?.account_number && methodData?.bank_country === 1 ? (
        <div className="d-flex flex-wrap">
          <span className="fw-bold">Account Number:</span>
          <span className="mx-2">{methodData?.account_number}</span>
        </div>
      ) : null
      }
      {methodData?.account_number && methodData?.bank_country === 2 ? (
        <div className="d-flex flex-wrap">
          <span className="fw-bold">Debit Card:</span>
          <span className="mx-2">{methodData?.account_number}</span>
        </div>
      ) : null
      }
      {methodData?.clabe ? (
        <div className="d-flex flex-wrap">
          <span className="fw-bold">CLABE:</span>
          <span className="mx-2">{methodData?.clabe}</span>
        </div>
      ) : null
      }
      {methodData?.swift ? (
        <div className="d-flex flex-wrap">
          <span className="fw-bold">SWIFT:</span>
          <span className="mx-2">{methodData?.swift}</span>
        </div>
      ) : null
      }
    </>
  )
}

export default WesternUnionElements;