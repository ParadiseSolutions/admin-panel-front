import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { tourTypesData } from "../../Utils/Redux/Actions/TourTypesActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active } from "./TourTypesCols";
import Swal from "sweetalert2";
import { tourTypeDelete } from "../../Utils/API/TourTypes";
import AddTourTypeModal from "../../Components/Common/Modals/TourTypesModals/addTourTypeModal";
import UpdateTourTypeModal from "../../Components/Common/Modals/TourTypesModals/updateTourTypeModal";

const TourTypes = () => {
  const [tourTypesId, setTourTypesId] = useState(false);
  const dispatch = useDispatch();

  //tour types request

  useEffect(() => {
    const tourTypesRequest = () => dispatch(tourTypesData());
    tourTypesRequest();
  }, [dispatch]);

  //saving tour types data into variable
  const data = useSelector((state) => state.tourTypes.tourTypes.data);
  console.log(data);

  //delete Tour Type
  const onDelete = (tourTypeData) => {
    Swal.fire({
      title: "Delete Tour Type?",
      icon: "question",
      text: `Do you want delete ${tourTypeData.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        tourTypeDelete(tourTypeData.id)
          .then((resp) => {
            const tourTypesRequest = () => dispatch(tourTypesData());
            tourTypesRequest();
            Swal.fire("Deleted!", "Tour Type has been deleted.", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

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
  ]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              TOUR TYPES
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
                      tourTypesTable={true}
                      isAddOrder={true}
                      // onClickAddNewWebsite={onClickAddNewWebsite}
                      // onClickEditWebsite={onClickEditWebsite}
                      // // handleOrderClicks={handleOrderClicks}
                    />
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TourTypes;
