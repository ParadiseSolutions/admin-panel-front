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
import CancellationPolicy from "./operationalComponents/cancellationPolicy";
import ChangePolicy from "./operationalComponents/changePolicy";
import NoShowPolicy from "./operationalComponents/noShowPolicy";

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
                  To create a new tour please fill out the following
                  information. Once you've completed this first screen, you can
                  through the tabs and complete the information. Once you're
                  done with a section, press "Continue" to save your changes.
                  navigate
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
                        <CancellationPolicy />
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
                        <ChangePolicy />
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
                        <NoShowPolicy />
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
