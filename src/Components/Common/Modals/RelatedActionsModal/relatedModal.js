import { useEffect, useState } from "react";

import { Row, Col, Modal, Label, Input, Button } from "reactstrap";
import { editRelatedType } from "../../../../Utils/API/Tours";

const RelatedActionsModal = ({
  setRelatedEdit,
  relatedEdit,
  editRelatedData,
  refreshTable
}) => {
  const [typeSelected, setTypeSelected] = useState("");

  useEffect(() => {
    if (editRelatedData) {
      setTypeSelected(editRelatedData.type_id.toString());
    }
  }, [editRelatedData]);

  const onSubmit = () => {
    let data = {
      type_id:typeSelected
    }
    editRelatedType(editRelatedData.id, data).then((resp) =>{
      if (resp.status === 200) {
        setRelatedEdit(false)
        refreshTable()
      }
    }).catch((err) => console.log(err))
  };
  return (
    <Modal centered size="" isOpen={relatedEdit}>
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">Edit Related Tour</h1>

        <button
          onClick={() => {
            setRelatedEdit(false);
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
          <Row>
            <Col className="">
              <div className="form-outline">
                <Label className="form-label">Type</Label>
                <Input
                  type="select"
                  name=""
                  onChange={(e) => {
                    setTypeSelected(e.target.value);
                  }}
                >
                  <option value="-1">Select....</option>
                  <option
                    value="1"
                    selected={typeSelected === "1" ? true : false}
                  >
                    Backup
                  </option>
                  <option
                    value="2"
                    selected={typeSelected === "2" ? true : false}
                  >
                    Alternative
                  </option>
                </Input>
              </div>
            </Col>
          </Row>

          <Row
            className="col-12 d-flex justify-content-end mt-5"
            style={{ paddingRight: "20px" }}
          >
            <Button
              color="paradise"
              outline
              className="waves-effect waves-light col-4 "
              type="button"
              onClick={() => {onSubmit()}}
            >
              Save and Close
            </Button>
          </Row>
        </Row>
      </div>
    </Modal>
  );
};

export default RelatedActionsModal;
