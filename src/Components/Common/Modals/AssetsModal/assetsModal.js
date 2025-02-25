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
import { useState } from "react";
import BoatComponent from "./components/boatComponent";
import AssetBannerOne from "../../../Assets/images/assetBannerOne.png";
import AssetBannerTwo from "../../../Assets/images/assetBannerTwo.png";
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
      ) : null}
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
            <Row className="mb-3 d-flex justify-content-center">
              <Col md={4}>
                <h1 onClick={() => setMenu(1)}>Boats</h1>
              </Col>
              <Col md={4}>
                <h1 onClick={() => setMenu(2)}>vehicles</h1>
              </Col>
              <Col md={4}>
                <h1 onClick={() => setMenu(3)}>others</h1>
              </Col>
            </Row>
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
