import {useEffect, useMemo} from "react"
import moment from "moment";
import { Container } from "reactstrap"
import {websitesData} from "../../Utils/Redux/Actions/WebsitesActions"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Code, Date, Domain, URL, Root, Folder, Active } from "./WebsitesCols";
import Swal from "sweetalert2";
import { websiteDelete } from "../../Utils/API/Websites";


const Websites = () => {
  const dispatch = useDispatch();
  //departments request
  useEffect(() => {
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
  }, [dispatch]);


  //get info
  const data = useSelector((state) => state.websites.websites.data);
  console.log(data)
  
  const onEdit = () => {
    console.log("on edit");
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
            Swal.fire(
              "Deleted!",
              "The website has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
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
              
              <Link
                to={`/websites/${siteData.id}`}
                className="text-success"
                onClick={() => {
                  const siteData = cellProps.row.original;
                  onEdit(siteData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const siteData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(siteData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
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
  
  /////////////////////////////////////////////
  return (
    <>
      <div className="page-content">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              WEBSITES
            </h1>
          </div>

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {data ? (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      websitesTable={true}
                      isAddOrder={true}
                      // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Websites