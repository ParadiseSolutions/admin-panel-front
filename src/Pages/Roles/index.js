import { useState, useMemo, useEffect } from "react";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Code, Department, Active, Date } from "./RolesCols";
import { rolesData } from "../../Utils/Redux/Actions/RolesActions";
import moment from "moment";
import { Container, Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Roles = () => {

      //roles request
      const dispatch = useDispatch()
  useEffect(() => {
    const rolesRequest = () => dispatch(rolesData());
    rolesRequest();
  }, [dispatch]);


  //get info
  const data = useSelector((state) => state.roles.roles.data);

  console.log(data)
    const onDelete = () =>{

    }
    //columns
    const columns = useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
              return <Name {...cellProps} />;
            },
          },
          {
            Header: "Department",
            accessor: "department",
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
              return <Department {...cellProps} />;
            },
          },
         
          {
            Header: "Date Created",
            accessor: (d) => {
              return moment(d.updated_at).format("MMM-DD-YYYY");
            },
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
              return <Date {...cellProps} />;
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
              const depData = cellProps.row.original;
              return (
                <div className="d-flex gap-3">
                  <Link
                    to={`/departments/${depData.id}`}
                    className="text-success"
                    
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
                      const depData = cellProps.row.original;
                      // setconfirm_alert(true);
                      onDelete(depData);
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
    return ( 
        
        <div className="page-content">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              Roles
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
                      rolesTable={true}
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
        
     );
}
 
export default Roles;