import { Col, Label, Input, FormFeedback, Tooltip } from "reactstrap";

const AddonPriceBreakdown = ({
  validationType,
  prefix = "p",
  invoiceField = "net_price",
  tooltips,
}) => {
  const p = prefix;
  const t = tooltips || {};

  const field = (name, label, labelClass = "", bgStyle) => (
    <Col className="col-2" style={bgStyle}>
      <div className="form-outline mb-2">
        <div className="d-flex justify-content-between">
          <Label className={`form-label ${labelClass}`}>{label}</Label>
          {t[name] && (
            <div>
              <i className="uil-question-circle font-size-15" id={`addon-${name}`} />
              <Tooltip placement="right" isOpen={t[name].open} target={`addon-${name}`} toggle={t[name].toggle}>
                {t[name].text}
              </Tooltip>
            </div>
          )}
        </div>
        <div className="input-group">
          <span className="input-group-text form-label fw-bold bg-paradise text-white border-0">$</span>
          <Input name={`${p}_${name}`} type="text" readOnly value={validationType.values[`${p}_${name}`] || ""} />
        </div>
      </div>
    </Col>
  );

  return (
    <>
      {field("base_amount", "Before Tax", "", { backgroundColor: "#FFEFDEBF" })}
      {field("iva", "16% IVA", "", { backgroundColor: "#FFEFDEBF" })}
      <Col className="col-2" style={{ backgroundColor: "#FFEFDEBF" }}>
        <div className="form-outline mb-2">
          <div className="d-flex justify-content-between">
            <Label className="form-label text-paradiseOrange">Price w/ Tax</Label>
            {t.total_price && (
              <div>
                <i className="uil-question-circle font-size-15" id="addon-total-price" />
                <Tooltip placement="right" isOpen={t.total_price.open} target="addon-total-price" toggle={t.total_price.toggle}>
                  {t.total_price.text}
                </Tooltip>
              </div>
            )}
          </div>
          <div className="input-group">
            <span className="input-group-text form-label fw-bold bg-paradise text-white border-0">$</span>
            <Input name={`${p}_total_price`} type="text" readOnly value={validationType.values[`${p}_total_price`] || ""} />
          </div>
        </div>
      </Col>
      {field("gratuity", "Gratuity", "", { backgroundColor: "#E9F4FFBF" })}
      {field("final_total", "Total Price", "", { backgroundColor: "#E9F4FFBF" })}
      <Col className="col-2">
        <div className="form-outline mb-2">
          <div className="d-flex justify-content-between">
            <Label className="form-label">Invoice Amt</Label>
            {t.invoice && (
              <div>
                <i className="uil-question-circle font-size-15" id="addon-invoice" />
                <Tooltip placement="right" isOpen={t.invoice.open} target="addon-invoice" toggle={t.invoice.toggle}>
                  {t.invoice.text}
                </Tooltip>
              </div>
            )}
          </div>
          <div className="input-group">
            <span className="input-group-text form-label fw-bold bg-paradise text-white border-0">$</span>
            <Input name={invoiceField} type="text" readOnly value={validationType.values[invoiceField] || ""} />
          </div>
        </div>
      </Col>
    </>
  );
};

export default AddonPriceBreakdown;
