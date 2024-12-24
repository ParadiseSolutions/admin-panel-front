import React from 'react';



const WesternUnionElements = ({methodData}) =>{
    return(
        <>
        <div className="d-flex flex-wrap">
              <span className="fw-bold">Bank Name:</span>
              <span className="mx-2">{methodData?.bank_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Country:</span>
              <span className="mx-2">{methodData?.country}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">CLABE:</span>
              <span className="mx-2">{methodData?.clabe}</span>
            </div>
            <br />
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Account Name:</span>
              <span className="mx-2">{methodData?.account_name}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">State:</span>
              <span className="mx-2">{methodData?.state}</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="fw-bold">Phone:</span>
              <span className="mx-2">{methodData?.phone}</span>
            </div>
           </>
    )
}

export default WesternUnionElements;