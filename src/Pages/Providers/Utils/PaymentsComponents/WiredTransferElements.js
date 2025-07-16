import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';



const WireTransferElement = ({methodData}) =>{
    return(
        <>
            <div className="d-flex flex-wrap" style={{height: "22px"}}>
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
                  id="copytooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="copytooltip">
                  Copy
                </UncontrolledTooltip>
              </span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Address:</span>
              <span className="mx-2">{methodData?.address}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">City:</span>
              <span className="mx-2">{methodData?.city}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">State:</span>
              <span className="mx-2">{methodData?.state}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Postal:</span>
              <span className="mx-2">{methodData?.postal}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Country:</span>
              <span className="mx-2">{methodData?.bank_country_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Phone:</span>
              <span className="mx-2">{methodData?.phone_country} {methodData?.phone}</span>
            </div>
            
            <br />
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Bank Name:</span>
              <span className="mx-2">{methodData?.bank_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">SWIFT:</span>
              <span className="mx-2">{methodData?.swift}</span>
            </div>
            {
              methodData?.aba_routing ? (
                <div className="d-flex flex-wrap">
                  <span className="fw-bold">ABA Routing:</span>
                  <span className="mx-2">{methodData?.aba_routing}</span>
                </div>
              ):null
            }
            {methodData?.account_number ? (
                <div className="d-flex flex-wrap">
                  <span className="fw-bold">Account Number:</span>
                  <span className="mx-2">{methodData?.account_number}</span>
                </div>
              ):null
            }
            {methodData?.clabe ? (
                <div className="d-flex flex-wrap">
                  <span className="fw-bold">CLABE:</span>
                  <span className="mx-2">{methodData?.clabe}</span>
                </div>
              ):null
            }
            </>
    )
}

export default WireTransferElement;