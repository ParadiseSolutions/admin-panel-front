import React, { useState, useEffect } from "react";
import EditGeneralInformation from "./EditComponents/editGeneralInfo";
import Settings from "./EditComponents/settings";
import Pricing from "./EditComponents/pricing";
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
  const [tourData, setTourData] = useState()
  useEffect(() => {
    getTourAPI(id).then((resp) =>{
      setTourData(resp.data.data)
    })
  }, [id]);
  //get tour settings
  const [tourSettings, setTourSettings] = useState()
  useEffect(() => {
    getTourSettingsAPI(id).then((resp) =>{
      setTourSettings(resp.data.data)
    })
  }, [id]);

  

  return (
    <div className="page-content">
      <Container fluid>
        <div className=" mx-4">
          <h1 className="display-5 fw-bold" style={{ color: "#3DC7F4" }}>
            {tourData ? tourData.name : ''}
          </h1>
        </div>
      </Container>
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "1" ? "#F6851F" : ""}`,
                      color: `${activeTab === "1" ? "white" : ""}`,
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
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "2" ? "#F6851F" : ""}`,
                      color: `${activeTab === "2" ? "white" : ""}`,
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
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "3" ? "#F6851F" : ""}`,
                      color: `${activeTab === "3" ? "white" : ""}`,
                    }}
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i className="far fa-envelope"></i>
                    </span>
                    <span className="d-none d-sm-block">+ URLs</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "4" ? "#F6851F" : ""}`,
                      color: `${activeTab === "4" ? "white" : ""}`,
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
                    <span className="d-none d-sm-block">+ Pricing</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${activeTab === "5" ? "#F6851F" : ""}`,
                      color: `${activeTab === "5" ? "white" : ""}`,
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
                    <span className="d-none d-sm-block">+ Extras</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="p-3 text-muted">
                <TabPane tabId="1">
                  {tourData ? 
                  
                  <EditGeneralInformation tourData={tourData} />
                  : null}
                </TabPane>
                <TabPane tabId="2">
                {tourSettings ? 
                  
                  <Settings tourSettings={tourSettings} id={id} />
                  : null}
                </TabPane>
                <TabPane tabId="3">
                  <h1>url</h1>
                </TabPane>
                <TabPane tabId="4">
                  <Pricing />
                </TabPane>
                <TabPane tabId="5">
                  <h1>extras</h1>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditTour;
