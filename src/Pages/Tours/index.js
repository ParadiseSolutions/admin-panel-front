import { useEffect, useMemo, useState } from "react";
import { toursData } from "../../Utils/Redux/Actions/ToursActions";
import {
  deleteTourAPI,
  getToursFiltered,
  getTourNameFiltered,
} from "../../Utils/API/Tours";
import { createStorageSync, getStorageSync } from "../../Utils/API";
import BulkEditTour from "../../Components/Common/Modals/BulkEditTours/BulkEditTours";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "./Table/Table";
import { CartName, CartID, Server, Active } from "./Table/ToursCols";
import ToursFilters from "../../Components/Common/Modals/ToursFilters/toursFilters";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tours = () => {
  const dispatch = useDispatch();
  //loading
  const [loadingData, setLoadingData] = useState(true);

  //cart request
  useEffect(() => {
    const toursRequest = () => dispatch(toursData());
    toursRequest();
  }, [dispatch]);

  //get info
  const data = useSelector((state) => state.tours.tours.data);
  const [toursDataInfo, setToursDataInfo] = useState([]);
  useEffect(() => {
    if (data) {
      let tourInfo = JSON.parse(getStorageSync("Tour-data"));
     
      if (tourInfo) {
        setToursDataInfo(tourInfo);
        setLoadingData(false);
        setIsFiltered(true)
      } else {
        setToursDataInfo(data);
        setLoadingData(false);
      }
      
    }
  }, [data]);

  // filters
  const [filters, setFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const onClickFilter = () => {
    setFilters(!filters);
  };
  const onClickRemoveFilter = () => {
    setLoadingData(true);
    if (data) {
      localStorage.removeItem("Tour-data")
      setLoadingData(false);
      setToursDataInfo(data);
      setIsFiltered(false);
    }
  };
  const onSubmitFilters = (filters) => {
    setIsFiltered(true);
    if (filters.search) {
      setLoadingData(true);
      getTourNameFiltered(filters)
        .then((resp) => {
          createStorageSync("Tour-data", JSON.stringify(resp.data.data))
          setLoadingData(false);
          setToursDataInfo(resp.data.data);
        })
        .catch((error) => {
          setLoadingData(false);
          setToursDataInfo([]);
        });
    } else {
      setLoadingData(true);
      getToursFiltered(filters)
        .then((resp) => {
          createStorageSync("Tour-data", JSON.stringify(resp.data.data))
          setLoadingData(false);
          setToursDataInfo(resp.data.data);
        })
        .catch((error) => {
          setLoadingData(false);
          setToursDataInfo([]);
        });
    }
  };

  // bulk edit
  const [bulkModal, setBulkModal] = useState(false);

  //delete

  const onDelete = (tour) => {
    Swal.fire({
      title: "Delete Tour?",
      icon: "question",
      text: `Do you want delete ${tour.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F38430",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        deleteTourAPI(tour.id)
          .then((resp) => {
            const toursRequest = () => dispatch(toursData());
            toursRequest();
            Swal.fire("Deleted!", "The Tour has been deleted.", "success");
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

  const copyTour = (tour) =>{
    console.log('tour =>', tour )
    Swal.fire({
      title: "Copy Tour?",
      icon: "question",
      text: `Do you want copy ${tour.name}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#F6851F",
      cancelButtonText: "Cancel",
    }).then((resp) => {
      if (resp.isConfirmed) {
        console.log('nos vamos a la b')
      }
    })
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartName {...cellProps} />;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartName {...cellProps} />;
        },
      },
      {
        Header: "Website",
        accessor: "website_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <CartID {...cellProps} />;
        },
      },
      {
        Header: "Provider",
        accessor: "provider_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
        },
      },
      {
        Header: "Category",
        accessor: "category_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
        },
      },
      {
        Header: "Operator",
        accessor: "operator_name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return <Server {...cellProps} />;
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
          const tourData = cellProps.row.original;
          return (
            <div className="d-flex gap-3">
              <div className="text-paradise">
                <Link to={`/tours/${tourData.id}`} className="text-success">
                  <i
                    className="mdi mdi-pencil-outline font-size-18 text-paradise"
                    id="edittooltip"
                    style={{ cursor: "pointer" }}
                  />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div
                className="text-danger"
                onClick={() => {
                  const tourData = cellProps.row.original;
                  // setconfirm_alert(true);
                  onDelete(tourData);
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
              </div>
              <div
                className="text-warning"
                onClick={() => {
                  const tourData = cellProps.row.original;
                  // setconfirm_alert(true);
                  copyTour(tourData);
                }}
              >
              <i
                className="mdi mdi-content-copy font-size-18"
                id="copytooltip"
                style={{ cursor: "pointer" }}
              />
              <UncontrolledTooltip placement="top" target="copytooltip">
                Copy
              </UncontrolledTooltip>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content pb-0 px-3">
      <Container fluid>
        <div className=" mx-1">
          <h1
            className="fw-bold cursor-pointer"
            style={{ color: "#3DC7F4", fontSize: "3.5rem" }}
          >
            TOURS
          </h1>
        </div>
        <Row>
          <Col xs="12">
            {loadingData ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-orange" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <h2 className="mx-5 text-orange">Loading...</h2>
              </div>
            ) : (
              <>
                {data ? (
                  <TableContainer
                    columns={columns}
                    data={toursDataInfo}
                    isGlobalFilter={true}
                    toursTable={true}
                    onClickFilter={onClickFilter}
                    onClickRemoveFilter={onClickRemoveFilter}
                    setBulkModal={setBulkModal}
                    isFiltered={isFiltered}
                    // handleOrderClicks={handleOrderClicks}
                  />
                ) : null}
              </>
            )}
          </Col>
        </Row>
        <ToursFilters
          filters={filters}
          setFilters={setFilters}
          onSubmitFilters={onSubmitFilters}
        />
        <BulkEditTour
          setBulkModal={setBulkModal}
          bulkModal={bulkModal}
          isFiltered={isFiltered}
          toursDataInfo={toursDataInfo}
        />
      </Container>
      <div className="content-footer pt-2 px-4 mt-4 mx-4">
        <p>2023 © JS Tour & Travel</p>
      </div>
    </div>
  );
};

export default Tours;
