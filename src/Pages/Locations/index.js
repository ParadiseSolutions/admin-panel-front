import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { locationsData } from "../../Utils/Redux/Actions/LocationsActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active } from "./LocationsCols";
import Swal from "sweetalert2";
import { locationDelete } from "../../Utils/API/Locations";
import AddLocationModal from "../../Components/Common/Modals/LocationsModals/addLocationModal";
import UpdateLocationModal from "../../Components/Common/Modals/LocationsModals/updateLocationModal";

const Locations = () => {
  const [locationsId, setLocationsId] = useState(false);
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  //locations request

  useEffect(() => {
    const locationsRequest = () => dispatch(locationsData());
    locationsRequest();
  }, [dispatch]);

  //saving locations data into variable

  const data = useSelector((state) => state.locations.locations.data);
  // console.log(data)
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  //delete Location
  const locationsRequest = () => dispatch(locationsData());
  const onDelete = (locationData) => {
    Swal.fire({
      title: "Delete Location?",
      icon: "question",
      text: `Do you want delete ${locationData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        locationDelete(locationData.id)
          .then((resp) => {
            // const locationsRequest = () => dispatch(locationsData());
            locationsRequest();
            Swal.fire("Deleted!", "Location has been deleted.", "success");
          })
          .catch((error) => {
            let errorMessages = [];
            if (error.response.data.data === null) {
              Swal.fire(
                "Error!",
                // {error.response.},
                String(error.response.data.message)
              );
            } else {
              Object.entries(error.response.data.data).map((item) => {
                errorMessages.push(item[1]);
                return true
              });

              Swal.fire(
                "Error!",
                // {error.response.},
                String(errorMessages[0])
              );
            }
          });
      }
    });
  };

  // Locations columns

  const columns = useMemo(() => [
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
        //const locationData = cellProps.row.original;
        return (
          <div className="d-flex gap-3">
            <div
              className="text-success"
              onClick={() => {
                setEditModal(true);
                const locationData = cellProps.row.original;
                setLocationsId(locationData.id);
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
                const locationData = cellProps.row.original;
                // setconfirm_alert(true);
                onDelete(locationData);
              }}
            >
              <i
                className="mdi mdi-delete-outline font-size-18"
                id="deletetooltip"
                style={{ cursor: "pointer" }}
              />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        );
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[]);

  //modal new
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const onClickAddLocation = () => {
    setAddModal(!addModal);
  };

  const onClickEditLocation = () => {
    setEditModal(!editModal);
  };
  return (
    <>
      <div className="page-content pb-0 px-3">
        <Container fluid>
          <div className=" mx-1">
            <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4", fontSize:"3.5rem" }}>
              LOCATIONS
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
                      locationsTable={true}
                      isAddOrder={true}
                      onClickAddLocation={onClickAddLocation}
                      onClickEditLocation={onClickEditLocation}
                      // // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </>
              )}
            </Col>
          </Row>
          <AddLocationModal
            addModal={addModal}
            setAddModal={setAddModal}
            onClickAddLocation={onClickAddLocation}
          />
          <UpdateLocationModal
            locationId={locationsId}
            editModal={editModal}
            setEditModal={setEditModal}
            onClickEditLocation={onClickEditLocation}
          />
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>2023 © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
};

export default Locations;
