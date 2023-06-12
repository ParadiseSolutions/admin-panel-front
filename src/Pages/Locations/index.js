import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { locationsData } from "../../Utils/Redux/Actions/LocationsActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
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

	//locations request

	useEffect(() => {
		const locationsRequest = () => dispatch(locationsData());
		locationsRequest();
	}, [dispatch]);

	//saving locations data into variable
	
	const data = useSelector((state) => state.locations.locations.data);
	// console.log(data)

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
							// console.log(error);
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
				  setEditModal(true)
				  const locationData = cellProps.row.original;
				  setLocationsId(locationData.id);
				}}
			  >
				<i className="mdi mdi-pencil-outline font-size-18 text-paradise" id="edittooltip" />
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
				<i className="mdi mdi-delete-outline font-size-18" id="deletetooltip" />
				<UncontrolledTooltip placement="top" target="deletetooltip">
				  Delete
				</UncontrolledTooltip>
			  </Link>
			</div>
		  );
		},
	  }
]);

//modal new
const [ editModal, setEditModal] = useState(false)
const [addModal, setAddModal] = useState(false);
const onClickAddLocation = () => {
	setAddModal(!addModal);
};

const onClickEditLocation = () => {
	setEditModal(!editModal);
};
	return (
		<>
			<div className="page-content">
				<Container fluid>
				<div className=" mx-1">
						<h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
							LOCATIONS
						</h1>
					</div>

					<Row>
						<Col xs="12">
							
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
								
						</Col>
					</Row>
					<AddLocationModal addModal={addModal} setAddModal={setAddModal} onClickAddLocation={onClickAddLocation} />
					<UpdateLocationModal locationId = {locationsId} editModal={editModal} setEditModal={setEditModal} onClickEditLocation={onClickEditLocation} />
				</Container>
			</div>
		</>
	);
};

export default Locations;
