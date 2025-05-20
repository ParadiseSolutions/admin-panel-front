import { useEffect, useState } from "react";

import {
  Collapse,
  Row,
  Col,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import classnames from "classnames";
import CancellationPolicyGeneral from "./operationalComponents/GeneralTab/cancellationPolicyGeneral";
import ChangePolicyGeneral from "./operationalComponents/GeneralTab/changePolicyGeneral";
import NoShowPolicyGeneral from "./operationalComponents/GeneralTab/noShowPolicyGeneral";
import LastMinuteBookingGeneral from "./operationalComponents/GeneralTab/lastMinuteBookingGeneral";
import HolidaysGeneral from "./operationalComponents/GeneralTab/HolidaysGeneral";
import CancellationPolicyGroups from "./operationalComponents/GroupsTab/cancellationPolicyGroups";
import ChangePolicyGroups from "./operationalComponents/GroupsTab/changePolicyGroups";
import NoShowPolicyGroups from "./operationalComponents/GroupsTab/noShowPolicyGroups";
import PaymentPolicyGroups from "./operationalComponents/GroupsTab/PaymentPolicyGroups";
import DocumentsGroup from "./operationalComponents/GroupsTab/DocumentsGroup";
import AvailabilityContacts from "./operationalComponents/OperationalContactsTab/AvailabilityContacts";
import { getOperationalContactsAPI } from "../../../Utils/API/Providers";
import { useParams } from "react-router-dom";
import OperationalContactModal from "./modals/OperationalContactModal";

const OperationalInfo = () => {
  const { id } = useParams();
  const [col1, setcol1] = useState(false);
  const [operationalInfoData, setOperationalInfoData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [placeReservationData, setPlaceReservationData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [invoicingData, setInvoicingData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [upperManagementData, setUpperManagementData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [operationalContactAction, setOperationalContactAction] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  function togglecol1() {
    setcol1(!col1);
  }
useEffect(() => {
  getOperationalContactsAPI(id)
    .then((res) => {
      setOperationalInfoData(res.data.data);
      setAvailabilityData(res.data.data.filter((item) => item.contact_type_id === 1));
      setPlaceReservationData(res.data.data.filter((item) => item.contact_type_id === 2));
      setGroupsData(res.data.data.filter((item) => item.contact_type_id === 3));
      setInvoicingData(res.data.data.filter((item) => item.contact_type_id === 4));
      setSalesData(res.data.data.filter((item) => item.contact_type_id === 5));
      setUpperManagementData(res.data.data.filter((item) => item.contact_type_id === 6));
      setMarketingData(res.data.data.filter((item) => item.contact_type_id === 7));
    })
    .catch((err) => {
      console.log(err);
    });
}, [id])

const refreshData = () => {
  console.log('se reseteo');
 getOperationalContactsAPI(id)
    .then((res) => {
      setOperationalInfoData(res.data.data);
      setAvailabilityData(res.data.data.filter((item) => item.contact_type_id === 1));
      setPlaceReservationData(res.data.data.filter((item) => item.contact_type_id === 2));
      setGroupsData(res.data.data.filter((item) => item.contact_type_id === 3));
      setInvoicingData(res.data.data.filter((item) => item.contact_type_id === 4));
      setSalesData(res.data.data.filter((item) => item.contact_type_id === 5));
      setUpperManagementData(res.data.data.filter((item) => item.contact_type_id === 6));
      setMarketingData(res.data.data.filter((item) => item.contact_type_id === 7));
    })
    .catch((err) => {
      console.log(err);
    });
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
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "10px",
                    }}
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
            <Row className="col-12 m-1 d-flex flex-col">
              <h1
                className="fw-bold cursor-pointer"
                style={{ color: "#3DC7F4", fontSize: "3.5rem" }}
              >
                + GROUPS
              </h1>
              <div className="col-12 d-flex flex-col">
                <p className="mb-0 lh-2" style={{ fontSize: "16px" }}>
                  <i
                    className="far fa-lightbulb bg-paradise text-white p-2 rounded-circle text-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "10px",
                    }}
                  ></i>{" "}
                  These policies apply only to Groups and/or Private Tours. They
                  do not apply to basic public tours.
                </p>
              </div>
            </Row>
            <Row>
              <Col xs="12" className="mt-4">
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
                        <CancellationPolicyGroups />
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
                        <ChangePolicyGroups />
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
                        <NoShowPolicyGroups />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Payment Policy
                          </p>
                        </div>
                        <PaymentPolicyGroups />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12 mt-5">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Documents
                          </p>
                        </div>
                        <DocumentsGroup />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="col-12 m-1 mt-5 d-flex flex-col">
              <h1
                className="fw-bold cursor-pointer"
                style={{ color: "#3DC7F4", fontSize: "3.5rem" }}
              >
                + Operational Contacts
              </h1>
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Row className="col-12 m-1 d-flex flex-col justify-content-endW">
                      <Col className=" d-flex justify-content-end">
                        <Button
                          type="submit"
                          className="waves-effect waves-light mb-3 btn btn-orange"
                          onClick={() => {
                            setOperationalContactAction(true);
                            setIdEdit(null);
                          }}
                        >
                          <i className="mdi mdi-plus me-1" />
                           Add Contact
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Availability
                          </p>
                        </div>
                        <AvailabilityContacts availabilityData={availabilityData} refreshData={refreshData} />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Place Reservations
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Groups
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Invoicing
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Sales & Contracting
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Upper Management
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-12">
                        <div
                          className=""
                          style={{ backgroundColor: "#E9F4FF" }}
                        >
                          <p className="fs-5 p-2 fw-bold text-dark mb-0">
                            Marketing
                          </p>
                        </div>
                        
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
      <OperationalContactModal
        operationalContactAction={operationalContactAction}
        setOperationalContactAction={setOperationalContactAction}
        refreshData={refreshData}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
      />
    </div>
  );
};

export default OperationalInfo;
