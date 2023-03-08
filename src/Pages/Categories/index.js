import { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { categoriesData } from "../../Utils/Redux/Actions/CategoriesActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../Components/Common/TableContainer";
import { Name, Active } from "./CategoriesCols";
import Swal from "sweetalert2";
import { categoryDelete } from "../../Utils/API/Categories";
import AddCategoryModal from "../../Components/Common/Modals/CategoriesModals/addCategoryModal";
import UpdateCategoryModal from "../../Components/Common/Modals/CategoriesModals/updateCategoryModal";

const Categories = () => {
	 const [categoryId, setCategoryId] = useState(false);
	 const dispatch = useDispatch();

	//Categories request

	useEffect(() => {
		const categoriesRequest = () => dispatch(categoriesData());
		categoriesRequest();
	}, [dispatch]);

	//saving categories data into a variable
	const data = useSelector((state) => state.categories.categories.data);

	//delete category
	const categoriesRequest = () => dispatch(categoriesData());
	const onDelete = (categoryData) => {
		Swal.fire({
			title: "Delete Category?",
			icon: "question",
			text: `Do you want delete ${categoriesData.name}`,
			showCancelButton: true,
			confirmButtonText: "Yes",
			confirmButtonColor: "#F38430",
			cancelButtonText: "Cancel",
		}).then((resp) => {
			if (resp.isConfirmed) {
				categoryDelete(categoryData.id)
					.then((resp) => {
						// const tourTypesRequest = () => dispatch(tourTypesData());
						categoriesRequest();
						Swal.fire("Deleted!", "Category has been deleted.", "success");
					})
					.catch((error) => {
						console.log("jalopy",error);
					});
			}
		});
	};

    //categories columns 
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name",
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
                return <Name {...cellProps} />
            }
        },
        {
            Header: "Code",
            accessor: "code",
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
                return <Name {...cellProps} />
            }
        },
        {
            Header: "Parent",
            accessor: "parent_category",
            disableFilters: true,
            filterable: false,
            Cell: (cellProps) => {
                return <Name {...cellProps} />
            }

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
			  const categoriesData = cellProps.row.original;
			  return (
				<div className="d-flex gap-3">
				  
				  <div
				   
					className="text-success"
					onClick={() => {
					  setEditModal(true)
					  const categoriesData = cellProps.row.original;
					  setCategoryId(categoriesData.id);
					}}
				  >
					<i className="mdi mdi-pencil font-size-18" id="edittooltip" />
					<UncontrolledTooltip placement="top" target="edittooltip">
					  Edit
					</UncontrolledTooltip>
				  </div>
				  <Link
					to="#"
					className="text-danger"
					onClick={() => {
					  const categoriesData = cellProps.row.original;
					  // setconfirm_alert(true);
					  onDelete(categoriesData);
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
		  }
    ])
    const [ editModal, setEditModal] = useState(false)
	const [addModal, setAddModal] = useState(false);
	const onClickAddCategory = () => {
		setAddModal(!addModal);
	};

	const onClickEditCategory = () => {
		setEditModal(!editModal);
	};
	return (
		<>
			<div className="page-content">
				<Container fluid>
					<div className=" mx-5">
						<h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
							CATEGORIES
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
											categoriesTable={true}
											isAddOrder={true}
											onClickAddCategory={onClickAddCategory}
											onClickEditCategory={onClickEditCategory}
											// // handleOrderClicks={handleOrderClicks}
										/>
									) : null}
								</CardBody>
							</Card>
						</Col>
					</Row>
                     <AddCategoryModal addModal={addModal} setAddModal={setAddModal} onClickAddCategory={onClickAddCategory} />
					<UpdateCategoryModal categoryId = {categoryId} editModal={editModal} setEditModal={setEditModal} onClickEditCategory={onClickEditCategory} />
				</Container>
			</div>
		</>
	);
};

export default Categories;
