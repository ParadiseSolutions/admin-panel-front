import React, { useEffect, useState } from "react";
import { getCategory, editCategory } from "../../../../Utils/API/Categories";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Modal, Form, Label, Input, FormFeedback, Button } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const EditCategoryModal = ({ categoryId, editModal, setEditModal, onClickEditCategory }) => {
	//tour types data request
	const [data, setData] = useState();
	useEffect(() => {
		if (categoryId) {
			getCategory(categoryId).then((resp) => {
				setData(resp.data.data);
			});
		}
	}, [categoryId]);

	const validationType = useFormik({
		enableReinitialize: true,

		initialValues: {
			name: data ? data.name : "",
			code: data ? data.code : "",
			parent_category: data ? data.parent_category : "",
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Name is required"),
			code: Yup.string().required("Code is required"),
		}),

		onSubmit: (values) => {
			let data = {
				name: values.name,
				code: values.code,
				parent_category: values.parent_category,
			};

			editCategory(categoryId, data)
				.then((resp) => {
					if (resp.data.status === 200) {
						Swal.fire("Success!", "Category has been edited", "success").then(() => {
							window.location.href = "/categories";
						});
					}
				})
				.catch((error) => {
					let errorMessages = [];
					Object.entries(error.response.data.data).map((item) => {
						errorMessages.push(item[1]);
					});

					Swal.fire(
						"Error!",
						// {error.response.},
						String(errorMessages[0])
					);
				});
		},
	});
	return (
		<>
			<Modal
				size="lg"
				isOpen={editModal}
				toggle={() => {
					onClickEditCategory();
				}}
			>
				<div className="modal-header" style={{ backgroundColor: "#3DC7F4", border: "none" }}>
					<h1 className="modal-title mt-0 text-white">+ Edit Category</h1>
					<button
						onClick={() => {
							setEditModal(false);
						}}
						type="button"
						className="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				{
					//modal body
				}
				<div className="modal-body">
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validationType.handleSubmit();
							return false;
						}}
						className="custom-validation"
					>
						<Row>
							<Col className="col-12 mx-5">
								<Row>
									<Col lg={3}>
										<div className="form-outline mb-4">
											<Label className="form-label">Category Name</Label>
											<Input
												name="name"
												placeholder=""
												type="text"
												onChange={validationType.handleChange}
												onBlur={validationType.handleBlur}
												value={validationType.values.name || ""}
												invalid={validationType.touched.name && validationType.errors.name ? true : false}
											/>
											{validationType.touched.name && validationType.errors.name ? <FormFeedback type="invalid">{validationType.errors.name}</FormFeedback> : null}
										</div>
									</Col>
									<Col lg={3}>
										<div className="form-outline mb-4">
											<Label className="form-label">Category Code</Label>
											<Input
												name="code"
												placeholder=""
												type="text"
												onChange={validationType.handleChange}
												onBlur={validationType.handleBlur}
												value={validationType.values.code || ""}
												invalid={validationType.touched.code && validationType.errors.code ? true : false}
											/>
											{validationType.touched.code && validationType.errors.code ? <FormFeedback type="invalid">{validationType.errors.code}</FormFeedback> : null}
										</div>
									</Col>
									<Col lg={3}>
										<div className="form-outline mb-4">
											<Label className="form-label">Parent Category</Label>
											<Input
												name="parent_category"
												placeholder=""
												type="text"
												onChange={validationType.handleChange}
												onBlur={validationType.handleBlur}
												value={validationType.values.parent_category || ""}
												invalid={validationType.touched.parent_category && validationType.errors.parent_category ? true : false}
											/>
											{validationType.touched.parent_category && validationType.errors.parent_category ? <FormFeedback type="invalid">{validationType.errors.parent_category}</FormFeedback> : null}
										</div>
									</Col>
								</Row>
								<Row>
									<Col className="col-10 mx-4 mt-2 d-flex justify-content-end">
										<Button type="submit" style={{ backgroundColor: "#F6851F", border: "none" }} className="waves-effect waves-light mb-3 btn btn-success">
											<i className="mdi mdi-plus me-1" />
											Submit
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</Form>
				</div>
			</Modal>
		</>
	);
};

export default EditCategoryModal;
