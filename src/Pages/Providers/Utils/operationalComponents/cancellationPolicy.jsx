import React from "react";
import { Row, Table } from "reactstrap";

const CancellationPolicy = () => {
  return (
    <Row className="col-12 m-1 d-flex flex-col">
      <div className="col-12 m-1 d-flex flex-col align-items-end justify-content-end">
        <p className="cursor-pointer text-paradise">+ Add Policy</p>
      </div>
      <div className="col-12 d-flex flex-col table-responsive"  style={{ height: "127px" }}>
       <Table>
        <thead>
            <tr>
                <th >If Cancelled</th>
                <th >Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Before 24 hours</td>
                <td>Full Refund</td>
                <td>icons</td>
            </tr>
            <tr>
                <td>Before 24 hours</td>
                <td>Full Refund</td>
                <td>icons</td>
            </tr>
            <tr>
                <td>Before 24 hours</td>
                <td>Full Refund</td>
                <td>icons</td>
            </tr>
        </tbody>
       </Table>
      </div>
    </Row>
  );
};

export default CancellationPolicy;
