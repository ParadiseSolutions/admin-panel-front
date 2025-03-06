import { useState } from "react";
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
import MenuBannerOne from "../../../Assets/images/asset_banner_one.png";
import MenuBannerTwo from "../../../Assets/images/asset_banner_two.jpg";
import MenuBannerThree from "../../../Assets/images/asset_banner_three.jpeg";
import AssetBannerOne from "../../../Assets/images/assetBannerOne.png";
import AssetBannerTwo from "../../../Assets/images/assetBannerTwo.png";
import BoatComponent from "./components/boatComponent";
import VehicleComponent from "./components/vehicleComponent";
import OthersComponent from "./components/othersComponent";

const AssetModal = ({ assetModal, setAssetModal, onClickAddNewPayment }) => {
  const [menu, setMenu] = useState(0);

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      default_label: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      default_label: Yup.string().required("Default Label is required"),
    }),
    onSubmit: (values) => {
      let data = {
        name: values.name,
        default_label: values.default_label,
      };
      createPaymentTypeAPI(data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire(
              "Created!",
              "Payment Type has been created.",
              "success"
            ).then(() => {
              setAssetModal(false);
            });
          }
        })
        .catch((error) => {
          if (error.response.data.data === null) {
            Swal.fire(
              "Error!",
              // {error.response.},
              String(error.response.data.message)
            );
          } else {
            let errorMessages = [];
            Object.entries(error.response.data.data).map((item) => {
              errorMessages.push(item[1]);
              return true;
            });

            Swal.fire(
              "Error!",
              // {error.response.},
              String(errorMessages[0])
            );
          }
        });
    },
  });

  return (
    <Modal
      size="xl"
      centered
      isOpen={assetModal}
      toggle={() => {
        onClickAddNewPayment();
      }}
    >
      {menu !== 0 ? (
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {menu === 1
              ? "+ New Boat"
              : menu === 2
              ? "+ New Vehicle"
              : menu === 3
              ? "+ New Other"
              : ""}
          </h1>
          <button
            onClick={() => {
              setAssetModal(false);
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
      ) : (
        <div>
          <button
            onClick={() => {
              setAssetModal(false);
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
      )}
      <div className="modal-body">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          {menu === 0 ? (
            <>
              <Row className="d-flex text-center my-4 mb-5">
                <h2>Choose Asset Type</h2>
              </Row>
              <Row className="mb-3 d-flex justify-content-center ">
                <Col md={4} className="d-flex justify-content-center my-4">
                  <div
                    className="text-center"
                    onClick={() => setMenu(1)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="rounded-circle bg-orange"
                      style={{
                        width: 200,
                        height: 200,
                        backgroundImage: `url(${MenuBannerOne})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <h1 className="mt-3">Boats</h1>
                  </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center my-4">
                  <div
                    className="text-center"
                    onClick={() => setMenu(2)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="rounded-circle bg-orange"
                      style={{
                        width: 200,
                        height: 200,
                        backgroundImage: `url(${MenuBannerThree})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <h1 className="mt-3">Vehicles</h1>
                  </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center my-4">
                  <div
                    className="text-center"
                    onClick={() => setMenu(3)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="rounded-circle bg-orange"
                      style={{
                        width: 200,
                        height: 200,
                        backgroundImage: `url(${MenuBannerTwo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <h1 className="mt-3">Others</h1>
                  </div>
                </Col>
              </Row>
            </>
          ) : menu === 1 || menu === 2 || menu === 3 ? (
            <>
              <Row className=" d-flex justify-content-between pb-4 ">
                <Col className="col-md-6">
                  <img src={AssetBannerOne} alt="image1" className="w-100" />
                </Col>
                <Col className="col-md-6">
                  <img src={AssetBannerTwo} alt="image1" className="w-100" />
                </Col>
              </Row>
              {menu === 1 ? (
                <BoatComponent setMenu={setMenu} />
              ) : menu === 2 ? (
                <VehicleComponent setMenu={setMenu} />
              ) : menu === 3 ? (
                <OthersComponent setMenu={setMenu} />
              ) : null}
            </>
          ) : null}
        </Form>
      </div>
    </Modal>
  );
};

export default AssetModal;
