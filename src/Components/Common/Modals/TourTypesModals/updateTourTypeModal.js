import React, { useEffect, useState } from "react";
import { getTourType, editTourType } from "../../../../Utils/API/TourTypes";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Modal, Form, Label, Input, FormFeedback, Button } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash";
import Swal from "sweetalert2";

const EditTourTypeModal = ({ tourTypeId, editModal, setEditModal, onClickEditTourType }) => {
	//tour types data request
	const [data, setData] = useState();
	useEffect(() => {
		if (tourTypeId) {
			getTourType(tourTypeId).then((resp) => {
				setData(resp.data.data);
			});
		}
	}, [tourTypeId]);
    
	const validationType = useFormik({
		enableReinitialize: true,

		initialValues: {
			name: data ? data.name : "",
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Name is required"),
		}),

		onSubmit: (values) => {
			let data = {
				name: values.name,
			};

			editTourType(tourTypeId, data)
				.then((resp) => {
					if (resp.data.status === 200) {
						Swal.fire("Success!", "Tour Type has been edited", "success").then(() => {
							window.location.href = "/tour-types";
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
					onClickEditTourType();
				}}
			>
				<div className="modal-header">
					<h5 className="modal-title mt-0" id="myLargeModalLabel">
						Edit Tour Type
					</h5>
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
										<Label className="form-label">Tour Type Name</Label>
										<Input
											name="name"
											placeholder=""
											type="text"
											onChange={validationType.handleChange}
											onBlur={validationType.handleBlur}
											value={validationType.values.name || ""}
											invalid={validationType.touched.name && validationType.errors.name ? true : false}
										/>
										{validationType.touched.name && validationType.errors.name ? <FormFeedback type="invalid">{validationType.errors.company_name}</FormFeedback> : null}
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
			</Modal>
		</>
	);
};

export default EditTourTypeModal;
