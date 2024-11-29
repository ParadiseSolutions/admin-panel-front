import { useEffect, useMemo, useState } from "react";
import { toursData } from "../../Utils/Redux/Actions/ToursActions";
import {
  deleteTourAPI,
  getToursFiltered,
  getTourNameFiltered,
  copyTourAPI,
  triggerUpdate,
} from "../../Utils/API/Tours";
import { getCookie, removeCookie, setCookie } from "../../Utils/API";
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
  const [switch1, setswitch1] = useState(false);
  //loading
  const [loadingData, setLoadingData] = useState(true);
  const [restart, setRestart] = useState(false);
  const cookieLife = 24 * 60 * 60

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
      let tourInfo = getCookie("tour_data", true);
      let swicth2 = getCookie("switch1");

      if (swicth2) {
        if (swicth2 === "true") {
          setswitch1(true)
        } else {
          setswitch1(false)
        }
      }

      if (tourInfo) {
        if (switch1 || swicth2 === "true") {
          tourInfo = tourInfo.filter(x => x.active === 1)
        }
        setToursDataInfo(tourInfo);
        setLoadingData(false);
        setIsFiltered(true)
      } else {
        if (switch1 || swicth2 === "true") {
          tourInfo = data.filter(x => x.active === 1)
        } else {
          tourInfo = data
        }
        setToursDataInfo(tourInfo);
        setLoadingData(false);
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      removeCookie("tour_data")
      const toursRequest = () => dispatch(toursData());
      toursRequest();
      //setToursDataInfo(data);
      setIsFiltered(false);
    }
  };
  const onSubmitFilters = (filters) => {
    setIsFiltered(true);
    if (filters.search) {
      setLoadingData(true);
      setRestart(true)
      getTourNameFiltered(filters)
        .then((resp) => {
          setCookie("tour_data", JSON.stringify(resp.data.data), cookieLife)
          let tourInfo = resp.data.data
          if (switch1) {
            tourInfo = tourInfo.filter(x => x.active === 1)
          }
          setTimeout(() => {
            setToursDataInfo(tourInfo);
            setRestart(false)
            setLoadingData(false);
          }, 500);
        })
        .catch((error) => {
          setTimeout(() => {
            setRestart(false)
            setToursDataInfo([]);
            setLoadingData(false);
          }, 500);          
        });
    } else {
      setLoadingData(true);
      getToursFiltered(filters)
        .then((resp) => {
          setCookie("tour_data", JSON.stringify(resp.data.data), cookieLife)
          let tourInfo = resp.data.data
          if (switch1) {
            tourInfo = tourInfo.filter(x => x.active === 1)
          }
          setTimeout(() => {
            setToursDataInfo(tourInfo);
            setRestart(false)
            setLoadingData(false);
          }, 500);
        })
        .catch((error) => {
          setTimeout(() => {
            setRestart(false)
            setToursDataInfo([]);
            setLoadingData(false);
          }, 500);
        });
    }
  };

  // bulk edit
  const [bulkModal, setBulkModal] = useState(false);

  // active table
  const activeTourToogle = (filter) => {
    setLoadingData(true)
    let tourInfo = toursDataInfo
    setCookie("switch1", !filter, cookieLife)
    if (!filter) {
      let updated = tourInfo.filter(x => x.active === 1)
      setRestart(true)
      setToursDataInfo(updated);
      setswitch1(true)
    }
    if (filter) {
      if (data) {
        let tourInfoOriginal = getCookie("tour_data", true);

        if (tourInfoOriginal) {
          tourInfo = tourInfoOriginal;
        } else {
          tourInfo = data;
        }

      }
      let updated = tourInfo
      setRestart(true)
      setToursDataInfo(updated);
      // setLoadingData(false);
      setswitch1(false)
    }
    setTimeout(() => {
      setRestart(false)
      setLoadingData(false)
    }, 500);

  }


  //delete

  const removeTourCookieStatus = (tourId) => {
    setLoadingData(true)
    setRestart(true)
    let tourInfo = getCookie("tour_data", true);
    if (tourInfo && tourId) {
      let updated = tourInfo.filter(x => x.id !== tourId)
      setCookie("tour_data", JSON.stringify(updated), cookieLife)
      setToursDataInfo(updated);
    }
    setTimeout(() => {
      setRestart(false)
      setLoadingData(false)
    }, 500);    
  }

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
            Swal.fire("Deleted!", "The Tour has been deleted.", "success");
            triggerUpdate();
            removeTourCookieStatus(tour.id)
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

  const copyTour = (tour) => {
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
        copyTourAPI(tour.id).then((resp) => {
          // console.log('copy', resp.data)
          window.location.href = `/tours/${resp.data.data.tour_id}`;
        })
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
        Header: "Location",
        accessor: "location_name",
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
                <Link to={`/tours/${tourData.id}`} target="_blank" className="text-success">
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {data && !restart ? (
                  <TableContainer
                    columns={columns}
                    data={toursDataInfo}
                    isGlobalFilter={true}
                    toursTable={true}
                    onClickFilter={onClickFilter}
                    onClickRemoveFilter={onClickRemoveFilter}
                    setBulkModal={setBulkModal}
                    isFiltered={isFiltered}
                    onSubmitFilters={onSubmitFilters}
                    activeTourToogle={activeTourToogle}
                    switch1={switch1}
                    setswitch1={setswitch1}
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
