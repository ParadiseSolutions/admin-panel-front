import { createPaymentTypeAPI } from "../../../../Utils/API/Payments";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const AddPaymentModal = ({ addPaymentModal, setPaymentModal, onClickAddNewPayment }) => {

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      default_label:''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Cart Name is required"),
      default_label: Yup.string().required("Default Label is required"),
    }),
    onSubmit: (values) => {

      let data = {
        name: values.name,
        default_label: values.default_label
      };
      createPaymentTypeAPI(data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire("Created!", "Payment Type has been created.", "success").then(
              () => {
                setPaymentModal(false);
              }
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <Modal
      size="lg"
      isOpen={addPaymentModal}
      toggle={() => {
        onClickAddNewPayment();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add New Payment Type</h1>
        <button
          onClick={() => {
            setPaymentModal(false);
          }}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" style={{ color: "white" }}>
            &times;
          </span>
        </button>
      </div>
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
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="name"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.name || ""}
                      invalid={
                        validationType.touched.name &&
                        validationType.errors.name
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.name &&
                    validationType.errors.name ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Default Label</Label>
                    <Input
                      name="default_label"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.default_label || ""}
                      invalid={
                        validationType.touched.default_label &&
                        validationType.errors.default_label
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.default_label &&
                    validationType.errors.default_label ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.default_label}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col className="col-10 mx-4 mt-2 d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{ backgroundColor:  "#F6851F", border: "none" }}
                    className="waves-effect waves-light mb-3 btn btn-success"
                  >
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
  );
};

export default AddPaymentModal;
