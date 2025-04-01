import React from "react";
import { Row, Table } from "reactstrap";

const NoShowPolicy = () => {
  return (
    <Row className="col-12 m-1 d-flex flex-col">
      <div className="col-12 m-1 d-flex flex-col align-items-end justify-content-end">
        <p className="cursor-pointer text-paradise">+ Add Policy</p>
      </div>
      <div className="col-12 d-flex flex-col table-responsive"  style={{ height: "127px" }}>
       <Table>
        <thead>
            <tr>
                <th >1. Pay 50% of net price</th>
                <th >Icons</th>
            </tr>
            <tr>
                <th >1. Pay 50% of net price</th>
                <th >Icons</th>
            </tr>
            <tr>
                <th >1. Pay 50% of net price</th>
                <th >Icons</th>
            </tr>
            <tr>
                <th >1. Pay 50% of net price</th>
                <th >Icons</th>
            </tr>
            <tr>
                <th >1. Pay 50% of net price</th>
                <th >Icons</th>
            </tr>
        </thead>
       
       </Table>
      </div>
    </Row>
  );
};

export default NoShowPolicy;
