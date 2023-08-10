import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { websitesData } from "../../Utils/Redux/Actions/WebsitesActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import {
  Name,
  Code,
  Date,
  Domain,
  URL,
  Root,
  Folder,
  Active,
} from "./WebsitesCols";
import Swal from "sweetalert2";
import { websiteDelete } from "../../Utils/API/Websites";
import AddWebsiteModal from "../../Components/Common/Modals/WebsitesModals/addWebsiteModal";
import UpdateWebsiteModal from "../../Components/Common/Modals/WebsitesModals/updateWebsiteModal";

const Websites = () => {
  const [siteId, setSiteId] = useState(false);
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  //departments request
  useEffect(() => {
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.websites.websites.data);
  // console.log(data)
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  const onEdit = () => {
    // console.log("on edit");
  };
  const onDelete = (siteData) => {
    Swal.fire({
      title: "Delete Website?",
      icon: "question",
      text: `Do you want delete ${siteData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        websiteDelete(siteData.id)
          .then((resp) => {
            const websitesRequest = () => dispatch(websitesData());
            websitesRequest();
            Swal.fire("Deleted!", "The website has been deleted.", "success");
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "company_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Code",
        accessor: "code",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Code {...cellProps} />;
        },
      },

      {
        Header: "URL",
        accessor: "url",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <URL {...cellProps} />;
        },
      },

      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Active {...cellProps} />;
        },
      },
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          const siteData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div
                className="text-success"
                onClick={() => {
                  setEditModal(true);
                  const siteData = cellProps.row.original;
                  setSiteId(siteData.id);
                }}
              >
                <i
                  className="mdi mdi-pencil-outline font-size-18 text-paradise"
                  id="edittooltip"
                  style={{ cursor: "pointer" }}
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </div>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const siteData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(siteData);
                }}
              >
                <i
                  className="mdi mdi-delete-outline font-size-18"
                  id="deletetooltip"
                />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );
  //modal new
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const onClickAddNewWebsite = () => {
    setAddModal(!addModal);
  };

  const onClickEditWebsite = () => {
    setEditModal(!editModal);
  };
  /////////////////////////////////////////////
  return (
    <>
      <div className="page-content pb-0 px-3">
        <Container fluid>
          <div className=" mx-1">
            <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4", fontSize:"3.5rem" }}>
              WEBSITES
            </h1>
          </div>

          <Row>
            <Col xs="12">
              {loadingData ? (
                <div className="d-flex justify-content-center mt-5">
                  <div
                    className="spinner-border text-orange"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <h2 className="mx-5 text-orange">
                    Loading...
                  </h2>
                </div>
              ) : (
                <>
                  {data ? (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      websitesTable={true}
                      isAddOrder={true}
                      onClickAddNewWebsite={onClickAddNewWebsite}
                      onClickEditWebsite={onClickEditWebsite}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </>
              )}
            </Col>
          </Row>
          <AddWebsiteModal
            addModal={addModal}
            setAddModal={setAddModal}
            onClickAddNewWebsite={onClickAddNewWebsite}
          />

          <UpdateWebsiteModal
            siteId={siteId}
            editModal={editModal}
            setEditModal={setEditModal}
            onClickEditWebsite={onClickEditWebsite}
          />
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-3">
          <p>2023 © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
  //for the new website pop up
};

export default Websites;
