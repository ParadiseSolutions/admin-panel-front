import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { tourTypesData } from "../../Utils/Redux/Actions/TourTypesActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active } from "./TourTypesCols";
import AddTourTypeModal from "../../Components/Common/Modals/TourTypesModals/addTourTypeModal";
import UpdateTourTypeModal from "../../Components/Common/Modals/TourTypesModals/updateTourTypeModal";

const TourTypes = () => {
  const [tourTypesId, setTourTypesId] = useState(false);
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);
  //tour types request

  useEffect(() => {
    const tourTypesRequest = () => dispatch(tourTypesData());
    tourTypesRequest();
  }, [dispatch]);

  //saving tour types data into variable
  const data = useSelector((state) => state.tourTypes.tourTypes.data);
  useEffect(() => {
    if (data) {
      setLoadingData(false);
    }
  }, [data]);
  //delete Tour Type

  // Tour types columns
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
        return (
          <div className="d-flex gap-3">
            <div
              className="text-success"
              onClick={() => {
                setEditModal(true);
                const tourTypeData = cellProps.row.original;
                setTourTypesId(tourTypeData.id);
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
            {/* <Link
              to="#"
              className="text-danger"
              onClick={() => {
                const tourTypeData = cellProps.row.original;
                // setconfirm_alert(true);
                onDelete(tourTypeData);
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
            </Link> */}
          </div>
        );
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ],[]);
  //modal new
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const onClickAddTourType = () => {
    setAddModal(!addModal);
  };

  const onClickEditTourType = () => {
    setEditModal(!editModal);
  };
  return (
    <>
      <div className="page-content pb-0 px-3">
        <Container fluid>
          <div className=" mx-1">
            <h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4", fontSize:"3.5rem" }}>
              TOUR TYPES
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
            ):<>
              {data ? (
                <TableContainer
                  columns={columns}
                  data={data}
                  isGlobalFilter={true}
                  tourTypesTable={true}
                  isAddOrder={true}
                  onClickAddTourType={onClickAddTourType}
                  onClickEditTourType={onClickEditTourType}
                  // // handleOrderClicks={handleOrderClicks}
                />
              ) : null}
            </>}
            </Col>
          </Row>
          <AddTourTypeModal
            addModal={addModal}
            setAddModal={setAddModal}
            onClickAddTourType={onClickAddTourType}
          />
          <UpdateTourTypeModal
            tourTypeId={tourTypesId}
            editModal={editModal}
            setEditModal={setEditModal}
            onClickEditTourType={onClickEditTourType}
          />
        </Container>
        <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
      </div>
    </>
  );
};

export default TourTypes;
