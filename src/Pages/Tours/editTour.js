import React, { useState, useEffect } from "react";
import EditGeneralInformation from "./EditComponents/editGeneralInfo";
import Settings from "./EditComponents/settings";
import HighSeasons from "./EditComponents/highSeasons";
import Pricing from "./EditComponents/pricing";
import AddonsComponent from "./EditComponents/addons";
import URL from "./EditComponents/url";
import Schedules from "./EditComponents/schedules";
import {
  getTourAPI,
  getTourSettingsAPI,
  postPendingPublishAPI,
} from "../../Utils/API/Tours";
import {
  TabContent,
  NavLink,
  NavItem,
  Nav,
  Card,
  Row,
  Col,
  CardBody,
  Container,
  TabPane,
  CardHeader,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AutomatedConfirmationTab from "./EditComponents/automated";
import RelatedComponent from "./EditComponents/related";
import Payments from "./EditComponents/payments";
const EditTour = ({ history }) => {
  const { id } = useParams();
  //tabs
  const [activeTab, setactiveTab] = useState("1");
  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  //get tour data
  const [tourData, setTourData] = useState();
  useEffect(() => {
    let paramString = window.location.search;
    const parameter = new URLSearchParams(paramString);
    let tab = parameter.get("t");
    if (tab) {
      toggle(tab);
    }
    getTourAPI(id).then((resp) => {
      setTourData(resp.data.data);
    });
    if (tourData?.edit_mode === 0) {
      toggle("1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  //get tour settings
  const [tourSettings, setTourSettings] = useState();
  useEffect(() => {
    getTourSettingsAPI(id).then((resp) => {
      setTourSettings(resp.data.data);
    });
  }, [id]);

  // publish pending message
  const [publishPending, setPublishPending] = useState(false);
  useEffect(() => {
    getTourAPI(id).then((resp) => {
      setTourData(resp.data.data);
      setPublishPending(resp.data.data.html_needs_update === 1 ? true : false);
    });
    console.log(activeTab, "activeTab");
  }, [activeTab, id]);

  const publishTour = () => {
    postPendingPublishAPI(id).then(() => {
      Swal.fire(
        "Published!",
        "The tour has been published successfully.",
        "success"
      );
      setPublishPending(false);
    });
  };

  console.log(tourData, "tourData");
  return (
    <div className="page-content pb-0">
      <Container fluid className="d-flex justify-content-between">
        <div className=" mx-1">
          <h1 className="fw-bold" style={{ color: "#3DC7F4" }}>
            {tourData ? tourData.name : ""}
          </h1>
        </div>
        <div className="col-7 d-flex justify-content-end">
          <div className="d-flex flex-column align-items-center">
            <Button
              color={`${publishPending ? "danger" : "paradise"}`}
              className={`waves-effect waves-light col-10 mx-4 blue-outlined-hover`}
              style={{ height: "45px", minWidth: "fit-content" }}
              type="button"
              onClick={publishTour}
            >
              Publish
            </Button>
            {publishPending && (

            <p className="fs-6 fw-lighter py-2 text-danger">Pending changes to publish</p>
            )}
          </div>

          <Link to={"/tours"}>
            <Button
              color="paradiseGray"
              outline
              className="waves-effect waves-light col-2 mx-4 blue-outlined-hover"
              style={{ height: "45px", minWidth: "fit-content" }}
              type="button"
            >
              <i className="uil-angle-double-left" />
              Back to Results
            </Button>
          </Link>
        </div>
      </Container>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="p-0">
              <Nav tabs className="nav-justified border-orange">
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "1" ? "#F6851F" : ""}`,
                      color: `${activeTab === "1" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("1");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="d-none d-sm-block">
                      + General Information
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "2" ? "#F6851F" : ""}`,
                      color: `${activeTab === "2" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("2");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Settings</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "3" ? "#F6851F" : ""}`,
                      color: `${activeTab === "3" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("3");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Payments</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "4" ? "#F6851F" : ""}`,
                      color: `${activeTab === "4" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "4",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("4");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">
                      + High Season Dates
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "5" ? "#F6851F" : ""}`,
                      color: `${activeTab === "5" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "5",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("5");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ URLs</span>
                  </NavLink>
                </NavItem>

                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "6" ? "#F6851F" : ""}`,
                      color: `${activeTab === "6" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "6",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("6");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Products</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "7" ? "#F6861F" : ""}`,
                      color: `${activeTab === "7" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "7",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("7");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Addons</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "8" ? "#F6851F" : ""}`,
                      color: `${activeTab === "8" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "8",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("8");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Schedule</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "9" ? "#F6851F" : ""}`,
                      color: `${activeTab === "9" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "9",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("9");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Templates</span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex">
                  <NavLink
                    style={{
                      cursor: `${
                        tourData?.edit_mode === 0 ? "pointer" : "default"
                      }`,
                      backgroundColor: `${activeTab === "10" ? "#F6851F" : ""}`,
                      color: `${activeTab === "10" ? "white" : ""}`,
                      border: "none",
                      flexWrap: "wrap",
                      display: "grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "10",
                    })}
                    onClick={() => {
                      if (tourData?.edit_mode === 0) {
                        toggle("10");
                      }
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Related</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-0">
              <TabContent activeTab={activeTab} className="p-4 text-muted">
                <TabPane tabId="1">
                  {tourData ? (
                    <EditGeneralInformation
                      tourData={tourData}
                      toggle={toggle}
                    />
                  ) : null}
                </TabPane>
                <TabPane tabId="2">
                  {tourSettings ? (
                    <Settings
                      tourSettings={tourSettings}
                      id={id}
                      toggle={toggle}
                    />
                  ) : null}
                </TabPane>
                <TabPane tabId="3">
                  {tourData ? (
                    <Payments tourSettings={tourData} id={id} toggle={toggle} />
                  ) : null}
                </TabPane>
                <TabPane tabId="4">
                  <HighSeasons tourData={tourData} toggle={toggle} />
                </TabPane>
                <TabPane tabId="5">
                  {tourData ? (
                    <URL tourData={tourData} toggle={toggle} />
                  ) : null}
                </TabPane>
                <TabPane tabId="6">
                  <Pricing id={id} tourData={tourData} toggle={toggle} />
                </TabPane>
                <TabPane tabId="7">
                  <AddonsComponent
                    id={id}
                    tourData={tourData}
                    toggle={toggle}
                  />
                </TabPane>
                <TabPane tabId="8">
                  <Schedules id={id} tourData={tourData} toggle={toggle} />
                </TabPane>
                <TabPane tabId="9">
                  <AutomatedConfirmationTab
                    id={id}
                    tourData={tourData}
                    toggle={toggle}
                  />
                </TabPane>
                <TabPane tabId="10">
                  <RelatedComponent
                    id={id}
                    tourData={tourData}
                    toggle={toggle}
                  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="content-footer pt-2 px-4 mt-4 mx-4">
        <p>2023 © JS Tour & Travel</p>
      </div>
    </div>
  );
};

export default EditTour;
