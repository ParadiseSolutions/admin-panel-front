import React, { useEffect, useState } from "react";
import { websitesData } from "../../../../Utils/Redux/Actions/WebsitesActions";
import { getCartAPI, editCartAPI } from "../../../../Utils/API/ShoppingCarts";
import { useSelector, useDispatch } from "react-redux";
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
import { map } from "lodash";
import Swal from "sweetalert2";

const EditCartModal = ({ editCartModal, setEditCartModal, onClickEditCart, cartID }) => {

  //data request
  const [dataCarts, setDataCarts] = useState({})
  useEffect(() => {
    getCartAPI(cartID).then((resp) =>{
      setDataCarts(resp.data.data)
    })
  }, [cartID]);

// console.log(dataCarts)
  const dispatch = useDispatch();
  //websites request
  useEffect(() => {
    const websitesRequest = () => dispatch(websitesData());
    websitesRequest();
  }, [dispatch]);


  //get info
  const dataWebsites = useSelector((state) => state.websites.websites.data);


  const [websiteID, setWebsiteID] = useState('')
  const onChangeSelectionWeb = (selection) =>{
    setWebsiteID(selection)
  }

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: dataCarts.name,
      cart_number: dataCarts.cart_number,
      server: dataCarts.server,
      test_link: dataCarts.test_link,
      website_id:''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Cart Name is required"),
      cart_number: Yup.string().required("Cart ID is required"),
      server: Yup.string().required("Server is required").max(3, 'no more than 3 characters')
    }),
    onSubmit: (values) => {

      let data = {
        name: values.name,
        cart_number: values.cart_number,
        server: values.server,
        test_link: values.test_link ? values.test_link : '',
        website_id: websiteID ? websiteID : dataCarts.id
      };
      editCartAPI(cartID, data)
        .then((resp) => {
          if (resp.data.status === 200) {
            Swal.fire("Edited!", "The Cart has been edited.", "success").then(
              () => {
                setEditCartModal(false);
              }
            );
          }
        })
        .catch((error) => {
          // console.log(error.response);
          Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
        });
    },
  });

  return (
    <Modal
      size="lg"
      centered
      isOpen={editCartModal}
      toggle={() => {
        onClickEditCart();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Edit Shopping Cart</h1>
        <button
          onClick={() => {
            setEditCartModal(false);
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
                    <Label className="form-label">Cart Name</Label>
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
                    <Label className="form-label">Cart ID</Label>
                    <Input
                      name="cart_number"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.cart_number || ""}
                      invalid={
                        validationType.touched.cart_number &&
                        validationType.errors.cart_number
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.cart_number &&
                    validationType.errors.cart_number ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.cart_number}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Server</Label>
                    <Input
                      name="server"
                      placeholder=""
                      type="text"
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.server || ""}
                      invalid={
                        validationType.touched.server &&
                        validationType.errors.server
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.server &&
                    validationType.errors.server ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.server}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col className="col-5 mx-4">
                  <div className="form-outline mb-4">
                    <Label className="form-label">Test Link</Label>
                    <Input
                      name="test_link"
                      placeholder=""
                      type=""
                      onChange={validationType.handleChange}
                      onBlur={validationType.handleBlur}
                      value={validationType.values.test_link || ""}
                      invalid={
                        validationType.touched.test_link &&
                        validationType.errors.test_link
                          ? true
                          : false
                      }
                    />
                    {validationType.touched.test_link &&
                    validationType.errors.test_link ? (
                      <FormFeedback type="invalid">
                        {validationType.errors.test_link}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col lg={5}>
                  <div className="form-outline mb-4">
                    <Label className="form-label">Websites</Label>

                    <Input
                      type="select"
                      name="department"
                      onChange={(e) => onChangeSelectionWeb(e.target.value)}
                      onBlur={validationType.handleBlur}
                      //   value={validationType.values.department || ""}
                    >
                      <option>Select....</option>
                      {map(dataWebsites, (website, index) => {
                        return (
                          <option value={website.id} selected={dataCarts.website_id === website.id ? 'true' : 'false'} >
                            {website.company_name}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </Col>
               
              </Row>
              <Row>
                <Col className="col-10 mx-4 mt-2 d-flex justify-content-end">
                  <Button
                    type='submit'
                    style={{ backgroundColor:"#F6851F", border: "none" }}
                    className="waves-effect waves-light mb-3 btn btn-success"
                  >
                    Save Changes
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

export default EditCartModal;
