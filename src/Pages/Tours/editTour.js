import React, { useState, useEffect } from "react";
import EditGeneralInformation from "./EditComponents/editGeneralInfo";
import Settings from "./EditComponents/settings";
import HighSeasons from "./EditComponents/highSeasons";
import Pricing from "./EditComponents/pricing";
import AddonsComponent from "./EditComponents/addons";
import URL from "./EditComponents/url";
import Schedules from "./EditComponents/schedules";
import { getTourAPI, getTourSettingsAPI } from "../../Utils/API/Tours";
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
} from "reactstrap";
import classnames from "classnames";
import { useParams } from "react-router-dom";

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
    getTourAPI(id).then((resp) => {
      setTourData(resp.data.data);
    });
  }, [id]);
  //get tour settings
  const [tourSettings, setTourSettings] = useState();
  useEffect(() => {
    getTourSettingsAPI(id).then((resp) => {
      setTourSettings(resp.data.data);
    });
  }, [id]);

  // console.log("tourData", tourData);

  return (
    <div className="page-content pb-0">
      <Container fluid>
        <div className=" mx-1">
          <h1 className="fw-bold" style={{ color: "#3DC7F4" }}>
            {tourData ? tourData.name : ""}
          </h1>
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "1" ? "#F6851F" : ""}`,
                      color: `${activeTab === "1" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggle("1");
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "2" ? "#F6851F" : ""}`,
                      color: `${activeTab === "2" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggle("2");
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "3" ? "#F6851F" : ""}`,
                      color: `${activeTab === "3" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-user"></i>
                    </span>
                    <span className="d-none d-sm-block">+ High Season Dates</span>
                  </NavLink>
                </NavItem>

                  <NavItem className="d-flex">
                    <NavLink
                      style={{
                        cursor: "pointer",
                        backgroundColor: `${
                          activeTab === "4" ? "#F6851F" : ""
                        }`,
                        color: `${activeTab === "4" ? "white" : ""}`,
                        border:"none",
                        flexWrap: "wrap",
                        display:"grid",
                        alignContent: "center",
                      }}
                      className={classnames({
                        active: activeTab === "4",
                      })}
                      onClick={() => {
                        toggle("4");
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "5" ? "#F6851F" : ""}`,
                      color: `${activeTab === "5" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "5",
                    })}
                    onClick={() => {
                      toggle("5");
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "6" ? "#F6861F" : ""}`,
                      color: `${activeTab === "6" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",
                    }}
                    className={classnames({
                      active: activeTab === "6",
                    })}
                    onClick={() => {
                      toggle("6");
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
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "7" ? "#F6851F" : ""}`,
                      color: `${activeTab === "7" ? "white" : ""}`,
                      border:"none",
                      flexWrap: "wrap",
                      display:"grid",
                      alignContent: "center",                      
                    }}
                    className={classnames({
                      active: activeTab === "7",
                    })}
                    onClick={() => {
                      toggle("7");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ Schedule</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-0">
              <TabContent activeTab={activeTab} className="p-4 text-muted">
                <TabPane tabId="1">
                  {tourData ? (
                    <EditGeneralInformation tourData={tourData} toggle={toggle} />
                  ) : null}
                </TabPane>
                <TabPane tabId="2">
                {tourSettings ? (
                    <Settings tourSettings={tourSettings} id={id} toggle={toggle} />
                  ) : null}
                </TabPane>
                <TabPane tabId="3">
                  <HighSeasons tourData={tourData} toggle={toggle}/>
                </TabPane>
                <TabPane tabId="4">
                  {tourData ? <URL tourData={tourData} toggle={toggle} /> : null}
                </TabPane>
                <TabPane tabId="5">
                  <Pricing id={id} tourData={tourData} toggle={toggle} />
                </TabPane>
                <TabPane tabId="6">
                  <AddonsComponent id={id} tourData={tourData} toggle={toggle} />
                </TabPane>
                <TabPane tabId="7">
                  <Schedules id={id} tourData={tourData} toggle={toggle}/>
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
