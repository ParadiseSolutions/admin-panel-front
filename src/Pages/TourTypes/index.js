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
	// console.log(data);

	//delete Tour Type
	const tourTypesRequest = () => dispatch(tourTypesData());
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
						// const tourTypesRequest = () => dispatch(tourTypesData());
						tourTypesRequest();
						Swal.fire("Deleted!", "Tour Type has been deleted.", "success");
					})
					.catch((error) => {
						// console.log(error);
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
		{
			Header: "Action",
			accessor: "action",
			disableFilters: true,
			Cell: (cellProps) => {
			  const tourTypeData = cellProps.row.original;
			  return (
				<div className="d-flex gap-3">
				  
				  <div
				   
					className="text-success"
					onClick={() => {
					  setEditModal(true)
					  const tourTypeData = cellProps.row.original;
					  setTourTypesId(tourTypeData.id);
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
					  const tourTypeData = cellProps.row.original;
					  // setconfirm_alert(true);
					  onDelete(tourTypeData);
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
	const onClickAddTourType = () => {
		setAddModal(!addModal);
	};

	const onClickEditTourType = () => {
		setEditModal(!editModal);
	};
	return (
		<>
			<div className="page-content">
				<Container fluid>
					<div className=" mx-1">
						<h1 className="fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
							TOUR TYPES
						</h1>
					</div>

					<Row>
						<Col xs="12">
							
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
								
						</Col>
					</Row>
          			<AddTourTypeModal addModal={addModal} setAddModal={setAddModal} onClickAddTourType={onClickAddTourType} />
					  <UpdateTourTypeModal tourTypeId = {tourTypesId} editModal={editModal} setEditModal={setEditModal} onClickEditTourType={onClickEditTourType} />
				</Container>
			</div>
		</>
	);
};

export default TourTypes;
