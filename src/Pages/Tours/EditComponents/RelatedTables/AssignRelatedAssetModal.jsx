import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  Label,
  Input,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { map } from "lodash";
import {
  getApplyOptionsAPI,
  getPricesPricingAPI,
} from "../../../../Utils/API/Tours";
import QuestionIcon from "../../../../Components/Assets/images/questionIcon.svg";

const AssignRelatedAssetModal = ({
  isOpen,
  onClose,
  onConfirm,
  tourId,
  editData = null,
}) => {
  const [applyOptions, setApplyOptions] = useState([]);
  const [applyOptionsSelected, setApplyOptionsSelected] = useState(0);
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [matchingProductsSelected, setMatchingProductsSelected] = useState([]);

  const getProductIdsFromEditData = (data) => {
    const products = data?.products || [];
    return products.map((item) =>
      typeof item === "object" ? item.id : +item,
    );
  };

  useEffect(() => {
    if (isOpen) {
      getApplyOptionsAPI().then((resp) => {
        setApplyOptions(resp.data.data);
      });
      if (tourId) {
        getPricesPricingAPI(tourId).then((resp) => {
          setMatchingProducts(resp.data.data);
        });
      }

      if (editData) {
        setApplyOptionsSelected(editData.apply_to || 0);
        const productIds = getProductIdsFromEditData(editData);
        setMatchingProductsSelected(productIds);
      } else {
        setApplyOptionsSelected(0);
        setMatchingProductsSelected([]);
      }
    }
  }, [isOpen, tourId, editData]);

  useEffect(() => {
    if (!isOpen) {
      setApplyOptionsSelected(0);
      setMatchingProductsSelected([]);
    }
  }, [isOpen]);

  const handleMulti = (selected) => {
    setMatchingProductsSelected(selected);
  };

  const handleConfirm = () => {
    onConfirm({
      apply_to: applyOptionsSelected,
      products: matchingProductsSelected,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      centered
      size="md"
      contentClassName="border-0 rounded-4"
    >
      <ModalBody className="p-4 p-md-5">
        <div className="text-center mb-4">
          <img
            src={QuestionIcon}
            alt="Assign related asset"
            width="80"
            height="80"
            className="mx-auto d-block"
          />
        </div>

        <h4 className="text-center fw-bold mb-2" style={{ color: "#495057" }}>
          {editData ? "Edit Related Asset?" : "Assign Related Asset?"}
        </h4>
        <p
          className="text-center mb-4"
          style={{ color: "#74788d", fontSize: "15px" }}
        >
          What should this asset apply to?
        </p>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <Label className="form-label mb-0 me-1">Apply to</Label>
            <i
              className="uil-question-circle font-size-15"
              id="assignAssetApplyToTooltip"
              style={{ color: "#74788d", cursor: "pointer" }}
            />
            <UncontrolledTooltip
              autohide
              placement="top"
              target="assignAssetApplyToTooltip"
            >
              Select whether this asset applies to one, multiple, or all
              products in this tour.
            </UncontrolledTooltip>
          </div>
          <Input
            type="select"
            name="apply_to"
            value={applyOptionsSelected}
            onChange={(e) => {
              setApplyOptionsSelected(+e.target.value);
              setMatchingProductsSelected([]);
            }}
            style={{ borderRadius: "8px" }}
          >
            <option value="-1">Select....</option>
            {map(applyOptions, (option, index) => (
              <option key={index} value={option.apply_id}>
                {option.currency}
              </option>
            ))}
          </Input>
        </div>

        {applyOptionsSelected === 1 ? (
          <div className="form-outline mb-4">
            <Label className="form-label">Matching Product(s)</Label>
            <Input
              type="select"
              name="matching_product"
              value={matchingProductsSelected[0] ?? -1}
              onChange={(e) => {
                setMatchingProductsSelected([+e.target.value]);
              }}
              style={{ borderRadius: "8px" }}
            >
              <option value="-1">Select....</option>
              {map(matchingProducts, (item, index) => (
                <option key={index} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Input>
          </div>
        ) : applyOptionsSelected === 2 ? (
          <div className="form-outline mb-4">
            <Label className="form-label">Matching Product(s)</Label>
            <Select
              mode="multiple"
              allowClear
              rows="5"
              style={{ width: "100%", paddingTop: "5px" }}
              placeholder="Please select"
              value={matchingProductsSelected}
              onChange={handleMulti}
            >
              {map(matchingProducts, (item, index) => (
                <Option key={index} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        ) : null}

        <div className="d-flex justify-content-center gap-3">
          <Button
            color="paradise"
            className="px-4"
            style={{ borderRadius: "8px", minWidth: "100px" }}
            onClick={handleConfirm}
          >
            Yes
          </Button>
          <Button
            color="paradise"
            outline
            className="px-4"
            style={{ borderRadius: "8px", minWidth: "100px" }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AssignRelatedAssetModal;
