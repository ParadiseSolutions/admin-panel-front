import { useEffect, useState } from "react";
import AddonsImage from "../../../Assets/images/addons.png";
import {
  getPricingOptionsAPI,
  getAddonAPI,
  postAddonsAPI,
  putAddonAPI,
  triggerUpdate,
  getApplyOptionsAPI,
  getPricesPricingAPI,
} from "../../../../Utils/API/Tours";
import {
  Row,
  Col,
  Modal,
  Form,
  Label,
  Input,
  FormFeedback,
  Button,
  Tooltip,
} from "reactstrap";

const RelatedModal = ({
  setRelatedFilter,
  relatedFilter,
  refreshTable,
  editProductID,
  tourData,
  copyProduct,
  setCopyProduct,
  id,
}) => {
  //edit data

  return (
    <Modal centered size="xl" isOpen={relatedFilter}>
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">Add Related Tour</h1>

        <button
          onClick={() => {
            setRelatedFilter(false);
          }}
          type="button"
          className="close"
          style={{ color: "white" }}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-white bg-white">
            &times;
          </span>
        </button>
      </div>
      <div className="modal-body">
        <Row xl={12}>
          <Row className="flex mx-3">
            <Col className="col-11 mt-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Quick Search</Label>
                <Input name="product_name" placeholder="" type="text" />
              </div>
            </Col>
            <Col className="pt-1">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mt-4 p-0"
                type="button"
              >
                <i
                  className="bx bx-search-alt-2"
                  id="search"
                  style={{
                    fontSize: "30px",
                    color: "#3DC7F4",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                  // onClick={() => onSubmitFilters({ search: value })}
                ></i>
              </Button>
            </Col>
          </Row>
          <Row className="flex mx-3">
            <Label className="form-label">or Browse</Label>
            <Col className="col-3">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    // setCurrencySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {/* {map(currency, (curr, index) => {
                    return (
                      <option
                        key={index}
                        value={curr.currency_id}
                        selected={
                          dataEdit && dataEdit.voucher_currency
                            ? curr.currency_id === dataEdit.voucher_currency
                            : curr.currency_id === "USD" ||
                              curr.currency_id === "USD"
                        }
                      >
                        {curr.currency}
                      </option>
                    );
                  })} */}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    // setCurrencySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {/* {map(currency, (curr, index) => {
                    return (
                      <option
                        key={index}
                        value={curr.currency_id}
                        selected={
                          dataEdit && dataEdit.voucher_currency
                            ? curr.currency_id === dataEdit.voucher_currency
                            : curr.currency_id === "USD" ||
                              curr.currency_id === "USD"
                        }
                      >
                        {curr.currency}
                      </option>
                    );
                  })} */}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    // setCurrencySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {/* {map(currency, (curr, index) => {
                    return (
                      <option
                        key={index}
                        value={curr.currency_id}
                        selected={
                          dataEdit && dataEdit.voucher_currency
                            ? curr.currency_id === dataEdit.voucher_currency
                            : curr.currency_id === "USD" ||
                              curr.currency_id === "USD"
                        }
                      >
                        {curr.currency}
                      </option>
                    );
                  })} */}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    // setCurrencySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {/* {map(currency, (curr, index) => {
                    return (
                      <option
                        key={index}
                        value={curr.currency_id}
                        selected={
                          dataEdit && dataEdit.voucher_currency
                            ? curr.currency_id === dataEdit.voucher_currency
                            : curr.currency_id === "USD" ||
                              curr.currency_id === "USD"
                        }
                      >
                        {curr.currency}
                      </option>
                    );
                  })} */}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-4">
                <Label className="form-label">Website</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    // setCurrencySelected(e.target.value);
                  }}
                  //   value={validationType.values.department || ""}
                >
                  <option value="-1">Select....</option>
                  {/* {map(currency, (curr, index) => {
                    return (
                      <option
                        key={index}
                        value={curr.currency_id}
                        selected={
                          dataEdit && dataEdit.voucher_currency
                            ? curr.currency_id === dataEdit.voucher_currency
                            : curr.currency_id === "USD" ||
                              curr.currency_id === "USD"
                        }
                      >
                        {curr.currency}
                      </option>
                    );
                  })} */}
                </Input>
              </div>
            </Col>

            <Col className="pt-1">
              <Button
                color="paradise"
                outline
                className="waves-effect waves-light mt-4 p-0"
                type="button"
              >
                <i
                  className="bx bx-search-alt-2"
                  id="search"
                  style={{
                    fontSize: "30px",
                    color: "#3DC7F4",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                  // onClick={() => onSubmitFilters({ search: value })}
                ></i>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col
              className="col-12 p-1 my-2"
              style={{ backgroundColor: "#FFEFDE" }}
            >
              <p
                className="p-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#495057",
                  marginBottom: "0px",
                }}
              >
                Results
              </p>
            </Col>
          </Row>

          <Row
            className="col-12 d-flex justify-content-end mt-5"
            style={{ paddingRight: "30px" }}
          >
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light col-2 mx-4"
              type="button"
              onClick={() => {
                setRelatedFilter(false);
              }}
            >
              Close
            </Button>
            <Button
              id="save-button"
              type="submit"
              className="font-16 btn-block col-2 btn-orange"
            >
              Save
            </Button>
          </Row>
        </Row>
      </div>
    </Modal>
  );
};

export default RelatedModal;
