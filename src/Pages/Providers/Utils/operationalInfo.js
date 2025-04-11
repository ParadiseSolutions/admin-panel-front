import { useEffect, useState } from "react";

import {
  Collapse,
  Form,
  Row,
  Input,
  Label,
  Col,
  FormFeedback,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import classnames from "classnames";
import CancellationPolicyGeneral from "./operationalComponents/cancellationPolicyGeneral";
import ChangePolicyGeneral from "./operationalComponents/changePolicyGeneral";
import NoShowPolicyGeneral from "./operationalComponents/noShowPolicyGeneral";
import LastMinuteBookingGeneral from "./operationalComponents/lastMinuteBookingGeneral";
import HolidaysGeneral from "./operationalComponents/HolidaysGeneral";

const OperationalInfo = () => {
  // console.log('social media',initialData)
  const [col1, setcol1] = useState(false);

  function togglecol1() {
    setcol1(!col1);
  }

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col1,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              color: "white",
            }}
          >
            Operational Info
          </button>
        </h2>
        <Collapse id="collapseOne" className="accordion-collapse" isOpen={col1}>
          <div className="accordion-body">
            <Row className="col-12 m-1 d-flex flex-col">
              <h1
                className="fw-bold cursor-pointer"
                style={{ color: "#3DC7F4", fontSize: "3.5rem" }}
              >
                + General
              </h1>
              <div className="col-12 d-flex flex-col">
                <p className="mb-0 lh-2" style={{ fontSize: "16px" }}>
                  <i
                    className="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                    style={{ width: "32px", height: "32px" }}
                  ></i>{" "}
                  These sections specify how we work with this provider on a
                  business level, not related to specific tours or
                  customer-facing policies. For example, if it specifies "Pay"
                  that means we need to pay the provider, not that the customer
                  needs to pay us.
                </p>
              </div>
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col className="col-4">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Cancellation Policy
                          </p>
                        </div>
                        <CancellationPolicyGeneral />
                      </Col>
                      <Col className="col-4">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Change Policy
                          </p>
                        </div>
                        <ChangePolicyGeneral />
                      </Col>
                      <Col className="col-4">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            No Show Policy
                          </p>
                        </div>
                        <NoShowPolicyGeneral />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Last Minute Bookings
                          </p>
                        </div>
                        <LastMinuteBookingGeneral />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Holidays
                          </p>
                        </div>
                        <HolidaysGeneral />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default OperationalInfo;
