import React from 'react';



const ACHElements = ({methodData}) =>{
    return(
        <>
        
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Account Name:</span>
              <span className="mx-2">{methodData?.account_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Address:</span>
              <span className="mx-2">{methodData?.address}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Country:</span>
              <span className="mx-2">{methodData?.country}</span>
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
              <span className="fw-bold">Phone:</span>
              <span className="mx-2">{methodData?.phone}</span>
            </div>
            <br />
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Bank Name:</span>
              <span className="mx-2">{methodData?.bank_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">ABA Routing:</span>
              <span className="mx-2">{methodData?.aba_routing}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Account Number:</span>
              <span className="mx-2">{methodData?.account_number}</span>
            </div>
            </>
    )
}

export default ACHElements;