import { useEffect, useState } from "react";
import { Row, Col, Modal } from "reactstrap";
import MenuBannerOne from "../../../Assets/images/asset_banner_one.png";
import MenuBannerTwo from "../../../Assets/images/asset_banner_two.jpg";
import MenuBannerThree from "../../../Assets/images/asset_banner_three.jpeg";
import AssetBannerOne from "../../../Assets/images/assetBannerOne.png";
import AssetBannerTwo from "../../../Assets/images/assetBannerTwo.png";
import BoatComponent from "./components/boatComponent";
import VehicleComponent from "./components/vehicleComponent";
import OthersComponent from "./components/othersComponent";
import { getBoatEdit } from "../../../../Utils/API/Assets";

const AssetModal = ({ assetModal, setAssetModal, editID, resetTable }) => {
  const [menu, setMenu] = useState(0);
  const [dataEdit, setDataEdit] = useState(null);
  useEffect(() => {
    if (editID) {
      getBoatEdit(editID).then((res) => {
        setDataEdit(res.data.data);
        setMenu(
          res.data.data.asset_id === 1
            ? 1
            : res.data.data.assets.asset_type === "Vehicles"
            ? 2
            : 3
        );
      });
    }
  }, [editID]);
  return (
    <Modal
      size="xl"
      centered
      isOpen={assetModal}
      toggle={() => {
        // onClickAddNewPayment();
      }}
    >
      {menu !== 0 ? (
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {dataEdit ? 
            menu === 1
            ? "+ Edit Boat"
            : menu === 2
            ? "+ Edit Vehicle"
            : menu === 3
            ? "+ Edit Other"
            : "" : 
            menu === 1
              ? "+ New Boat"
              : menu === 2
              ? "+ New Vehicle"
              : menu === 3
              ? "+ New Asset"
              : ""}
            {}
          </h1>
          <button
            onClick={() => {
              setAssetModal(false);
              setAssetModal(false);
              setDataEdit(null);
              setMenu(0);
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
              <BoatComponent
                setMenu={setMenu}
                setAssetModal={setAssetModal}
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                resetTable={resetTable}
              />
            ) : menu === 2 ? (
              <VehicleComponent
              setMenu={setMenu}
              setAssetModal={setAssetModal}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
              resetTable={resetTable}
              />
            ) : menu === 3 ? (
              <OthersComponent
              setMenu={setMenu}
              setAssetModal={setAssetModal}
              dataEdit={dataEdit}
              setDataEdit={setDataEdit}
              resetTable={resetTable}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </Modal>
  );
};

export default AssetModal;
