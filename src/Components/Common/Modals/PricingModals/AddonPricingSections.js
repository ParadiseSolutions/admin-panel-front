import { Row, Col, Label, Input, FormFeedback, Tooltip } from "reactstrap";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { map } from "lodash";
import { setDecimalFormat, setRateFormat } from "../../../../Utils/CommonFunctions";
import AddonPriceBreakdown from "./AddonPriceBreakdown";
import eyeIcon from "../../../Assets/images/eye-icon.svg";
import eyeIconSlash from "../../../Assets/images/eye-slash-icon.svg";

const sectionHeaderStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#495057",
  marginBottom: "0px",
};

const addonInputAddonStyle = { fontSize: "0.85em" };

const FieldTooltip = ({ id, isOpen, toggle, children }) => (
  <>
    <i className="uil-question-circle font-size-15" id={id} />
    <Tooltip placement="right" isOpen={isOpen} target={id} toggle={toggle}>
      {children}
    </Tooltip>
  </>
);

const MoneyInput = ({
  name,
  validationType,
  readOnly = false,
  prefix = "$",
  suffix,
  onBlur,
  invalid,
}) => (
  <div className="input-group">
    {prefix ? (
      <span
        className="input-group-text form-label fw-bold bg-paradise text-white border-0"
        style={addonInputAddonStyle}
      >
        {prefix}
      </span>
    ) : null}
    <Input
      name={name}
      type="text"
      readOnly={readOnly}
      onChange={validationType.handleChange}
      onBlur={onBlur}
      value={validationType.values[name] || ""}
      invalid={invalid}
    />
    {suffix ? (
      <span
        className="input-group-text form-label fw-bold bg-paradise text-white border-0"
        style={addonInputAddonStyle}
      >
        {suffix}
      </span>
    ) : null}
  </div>
);

const AddonPricingSections = ({
  validationType,
  priceSheetSelected,
  setPriceSheetSelected,
  priceBreakdown,
  setPriceBreakdown,
  dataEdit,
  providerPricingCalc,
  ourCommission,
  currency,
  currencyList,
  setCurrencySelected,
  currencySelected,
  priceCollectSelected,
  setRecalc,
  providerPricingTab,
  setProviderPricingTab,
  ourPricingTab,
  setOurPricingTab,
  comparisonPricingTab,
  setComparisonPricingTab,
  providerHeaderTooltip,
  setproviderHeaderTooltip,
  comparisonHeaderTooltip,
  setComparisonHeaderTooltip,
  priceSheetTooltip,
  setpriceSheetTooltip,
  estRateTooltip,
  setestRateTooltip,
  estComTooltip,
  setestComTooltip,
  netPriceTooltip,
  setnetPriceTooltip,
  baseTooltip,
  setbaseTooltip,
  ivaTooltip,
  setivaTooltip,
  totalPriceTooltip,
  settotalPriceTooltip,
  gratuityTooltip,
  setgratuityTooltip,
  finalTotalTooltip,
  setfinalTotalTooltip,
  baseTooltipOP,
  setbaseTooltipOP,
  ivaTooltipOP,
  setivaTooltipOP,
  totalPriceTooltipOP,
  settotalPriceTooltipOP,
  gratuityTooltipOP,
  setgratuityTooltipOP,
  finalTotalTooltipOP,
  setfinalTotalTooltipOP,
  ttop5,
  setttop5,
  ttop6,
  setttop6,
  ttop7,
  setttop7,
  ttop8,
  setttop8,
  ttop9,
  setttop9,
  ttop10,
  setttop10,
  ttop11,
  setttop11,
  ttop12,
  setttop12,
  ttop13,
  setttop13,
  ttop14,
  setttop14,
  ttop15,
  setttop15,
  ttop16,
  setttop16,
  ttop17,
  setttop17,
  ttop20,
  setttop20,
  ttop21,
  setttop21,
  ttop22,
  setttop22,
  onOurPriceBlur,
  onProviderFieldBlur,
  onComparisonFieldBlur,
}) => {
  const currencies = currencyList || currency || [];

  const providerBlur = (field, value, isRate = false) => {
    if (onProviderFieldBlur) {
      if (field !== "rate") setRecalc?.(true);
      onProviderFieldBlur(field, value, isRate);
    } else {
      const formatted = isRate
        ? setRateFormat(value || "")
        : setDecimalFormat(value || "");
      validationType.setFieldValue(field, formatted);
      providerPricingCalc?.();
    }
  };

  const providerBlurCalc = (field, value, isRate = false) => {
    providerBlur(field, value, isRate);
    providerPricingCalc?.();
  };

  const comparisonBlur = (field, value) => {
    if (onComparisonFieldBlur) {
      setRecalc?.(true);
      onComparisonFieldBlur(field, value);
    } else {
      validationType.setFieldValue(field, setDecimalFormat(value || ""));
      providerPricingCalc?.();
    }
  };

  const invoiceFieldBySheet = {
    "1": "net_price",
    "2": "net_price_percentage",
    "3": "net_price_fixed",
  };
  const invoiceField =
    invoiceFieldBySheet[priceSheetSelected] || "net_price";

  const breakdownTooltips = {
    base_amount: baseTooltip && {
      open: baseTooltip,
      toggle: () => setbaseTooltip(!baseTooltip),
      text: "The base price of the product before taxes and gratuities are added on.",
    },
    iva: ivaTooltip && {
      open: ivaTooltip,
      toggle: () => setivaTooltip(!ivaTooltip),
      text: "The amount of IVA (VAT) that is due to the Mexican Government.",
    },
    total_price: totalPriceTooltip && {
      open: totalPriceTooltip,
      toggle: () => settotalPriceTooltip(!totalPriceTooltip),
      text: "Net Price including Taxes not including Gratuity. This is the main price for comparison purposes.",
    },
    gratuity: gratuityTooltip && {
      open: gratuityTooltip,
      toggle: () => setgratuityTooltip(!gratuityTooltip),
      text: "The amount of mandatory Gratuity required by the Provider to be collected.",
    },
    final_total: finalTotalTooltip && {
      open: finalTotalTooltip,
      toggle: () => setfinalTotalTooltip(!finalTotalTooltip),
      text: "The total cost including taxes and any mandatory Gratuity.",
    },
    invoice: {
      open: ttop17,
      toggle: () => setttop17(!ttop17),
      text: (
        <>
          The amount due to the provider on the invoice.
          <br />
          Our Deposit - Our Commission.
        </>
      ),
    },
  };

  const PriceBreakdownToggle = () => (
    <div
      onClick={() => setPriceBreakdown(!priceBreakdown)}
      style={{ cursor: "pointer" }}
      className="d-flex align-items-center mt-2"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setPriceBreakdown(!priceBreakdown);
      }}
    >
      <p className="mb-0">Price Breakdown</p>
      <img
        src={priceBreakdown ? eyeIconSlash : eyeIcon}
        alt={priceBreakdown ? "Hide Price Breakdown" : "Show Price Breakdown"}
        style={{ width: "20px", marginLeft: "10px", marginTop: "-10px" }}
      />
    </div>
  );

  const renderProviderSite = () => (
    <Col className="col-2">
      <div className="form-outline mb-2" id="provider_price">
        <div className="d-flex justify-content-between">
          <Label className="form-label">Provider Site</Label>
          <div>
            <FieldTooltip id="addonProviderSite" isOpen={ttop6} toggle={() => setttop6(!ttop6)}>
              The price the provider sells the tour for on their own website.
            </FieldTooltip>
          </div>
        </div>
        <MoneyInput
          name="provider_price"
          validationType={validationType}
          onBlur={(e) => providerBlurCalc("provider_price", e.target.value)}
        />
      </div>
    </Col>
  );

  return (
    <>
      {/* Provider Pricing */}
      <Col
        className="col-12 p-1 my-2 d-flex justify-content-between"
        style={{ backgroundColor: "#E9F4FF" }}
      >
        <div className="d-flex">
          <p className="p-2" style={sectionHeaderStyle}>
            Provider Pricing
          </p>
          <div className="mt-2">
            <FieldTooltip
              id="addonProviderHeaderTooltip"
              isOpen={providerHeaderTooltip}
              toggle={() => setproviderHeaderTooltip(!providerHeaderTooltip)}
            >
              The pricing specified by the Provider on the service agreement. This
              is for our reference; Our Pricing is what the customer pays.
            </FieldTooltip>
          </div>
        </div>
        <div
          className="m-2"
          style={{ cursor: "pointer" }}
          onClick={() => setProviderPricingTab(!providerPricingTab)}
        >
          {providerPricingTab ? (
            <IoIosArrowDown size={30} />
          ) : (
            <IoIosArrowForward size={30} />
          )}
        </div>
      </Col>

      {providerPricingTab ? (
        <Row className="d-flex col-12">
          <Col className="col-2">
            <div className="form-outline mb-2">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Rate Type</Label>
                {setpriceSheetTooltip && (
                  <div>
                    <FieldTooltip
                      id="addonRateTypeTooltip"
                      isOpen={priceSheetTooltip}
                      toggle={() => setpriceSheetTooltip(!priceSheetTooltip)}
                    >
                      Choose what type of agreement we have with the provider.
                      <br />
                      <br />
                      Net Price - We pay a Net Rate and whatever we add is our
                      commission.
                      <br />
                      <br />
                      Rate % - Commission rate off the price in the agreement.
                      <br />
                      <br />
                      Fixed Rate - A set commission not based on Net Rate or Rate
                      %.
                    </FieldTooltip>
                  </div>
                )}
              </div>
              <Input
                type="select"
                name="p_price_sheet"
                value={priceSheetSelected || "-1"}
                onChange={(e) => {
                  setPriceSheetSelected(e.target.value);
                  providerPricingCalc?.();
                }}
              >
                <option value="-1">Select....</option>
                <option value="1">Net Price</option>
                <option value="2">Rate %</option>
                <option value="3">Fixed Rate</option>
              </Input>
            </div>
          </Col>

          {priceSheetSelected === "1" ? (
            <>
              <Col className="col-2">
                <div className="form-outline mb-2" id="net_rate">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Net Price</Label>
                    <div>
                      <FieldTooltip id="addonNetRate" isOpen={ttop8} toggle={() => setttop8(!ttop8)}>
                        The Net Price specified in our service agreement.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="net_rate"
                    validationType={validationType}
                    onBlur={(e) => providerBlurCalc("net_rate", e.target.value)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="public_price">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Public</Label>
                    <div>
                      <FieldTooltip id="addonPublicPrice" isOpen={ttop5} toggle={() => setttop5(!ttop5)}>
                        The price the provider refers to as Public or Regular Price.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="public_price"
                    validationType={validationType}
                    onBlur={(e) => providerBlurCalc("public_price", e.target.value)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Rate %</Label>
                    {setestRateTooltip && (
                      <div>
                        <FieldTooltip
                          id="addonEstRate"
                          isOpen={estRateTooltip}
                          toggle={() => setestRateTooltip(!estRateTooltip)}
                        >
                          Approximate commission rate based on Public and Net Price.
                        </FieldTooltip>
                      </div>
                    )}
                  </div>
                  <MoneyInput
                    name="p_est_rate"
                    validationType={validationType}
                    readOnly
                    prefix={null}
                    suffix="%"
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Com.</Label>
                    {setestComTooltip && (
                      <div>
                        <FieldTooltip
                          id="addonEstCom"
                          isOpen={estComTooltip}
                          toggle={() => setestComTooltip(!estComTooltip)}
                        >
                          Commission as the difference between Public and Net Price.
                        </FieldTooltip>
                      </div>
                    )}
                  </div>
                  <MoneyInput name="p_est_commission" validationType={validationType} readOnly />
                </div>
              </Col>
              {renderProviderSite()}
              <PriceBreakdownToggle />
              {priceBreakdown ? (
                <AddonPriceBreakdown
                  validationType={validationType}
                  prefix="p"
                  invoiceField={invoiceField}
                  tooltips={breakdownTooltips}
                />
              ) : null}
            </>
          ) : null}

          {priceSheetSelected === "2" ? (
            <>
              <Col className="col-2">
                <div className="form-outline mb-2" id="public_price">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Public</Label>
                    <div>
                      <FieldTooltip id="addonPublicPrice2" isOpen={ttop5} toggle={() => setttop5(!ttop5)}>
                        The Public or Regular Price in our service agreement.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="public_price"
                    validationType={validationType}
                    onBlur={(e) => providerBlurCalc("public_price", e.target.value)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="rate">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Rate %</Label>
                    <div>
                      <FieldTooltip id="addonRatePct" isOpen={ttop7} toggle={() => setttop7(!ttop7)}>
                        Commission rate from the service agreement.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="rate"
                    validationType={validationType}
                    prefix={null}
                    suffix="%"
                    onBlur={(e) => providerBlurCalc("rate", e.target.value, true)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="net_rate">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Net Price</Label>
                    {setnetPriceTooltip && (
                      <div>
                        <FieldTooltip
                          id="addonNetPriceReadonly"
                          isOpen={netPriceTooltip}
                          toggle={() => setnetPriceTooltip(!netPriceTooltip)}
                        >
                          Net Price on the Service Agreement per Payment Settings.
                        </FieldTooltip>
                      </div>
                    )}
                  </div>
                  <MoneyInput name="net_rate" validationType={validationType} readOnly />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="commission">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Commission</Label>
                    <div>
                      <FieldTooltip id="addonProvComm2" isOpen={ttop20} toggle={() => setttop20(!ttop20)}>
                        Agreed commission before discounts, calculated from Net Price.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="provider_commission"
                    validationType={validationType}
                    readOnly
                  />
                </div>
              </Col>
              {renderProviderSite()}
              <PriceBreakdownToggle />
              {priceBreakdown ? (
                <AddonPriceBreakdown
                  validationType={validationType}
                  prefix="p"
                  invoiceField={invoiceField}
                  tooltips={breakdownTooltips}
                />
              ) : null}
            </>
          ) : null}

          {priceSheetSelected === "3" ? (
            <>
              <Col className="col-2">
                <div className="form-outline mb-2" id="public_price">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Public</Label>
                    <div>
                      <FieldTooltip id="addonPublicPrice3" isOpen={ttop5} toggle={() => setttop5(!ttop5)}>
                        The Public or Regular Price in our service agreement.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="public_price"
                    validationType={validationType}
                    onBlur={(e) => providerBlurCalc("public_price", e.target.value)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="commission">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Commission</Label>
                    <div>
                      <FieldTooltip id="addonPCommission" isOpen={ttop20} toggle={() => setttop20(!ttop20)}>
                        Fixed commission from the service agreement.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput
                    name="p_commission"
                    validationType={validationType}
                    onBlur={(e) => providerBlurCalc("p_commission", e.target.value)}
                  />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2" id="net_rate">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Net Price</Label>
                    <div>
                      <FieldTooltip id="addonNetRate3" isOpen={ttop7} toggle={() => setttop7(!ttop7)}>
                        Net Price on the Service Agreement per Payment Settings.
                      </FieldTooltip>
                    </div>
                  </div>
                  <MoneyInput name="net_rate" validationType={validationType} readOnly />
                </div>
              </Col>
              <Col className="col-2">
                <div className="form-outline mb-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label">Est. Rate %</Label>
                    {setestRateTooltip && (
                      <div>
                        <FieldTooltip
                          id="addonEstRate3"
                          isOpen={estRateTooltip}
                          toggle={() => setestRateTooltip(!estRateTooltip)}
                        >
                          Approximate commission rate based on Public and Net Price.
                        </FieldTooltip>
                      </div>
                    )}
                  </div>
                  <MoneyInput
                    name="p_est_rate"
                    validationType={validationType}
                    readOnly
                    prefix={null}
                    suffix="%"
                  />
                </div>
              </Col>
              {renderProviderSite()}
              <PriceBreakdownToggle />
              {priceBreakdown ? (
                <AddonPriceBreakdown
                  validationType={validationType}
                  prefix="p"
                  invoiceField={invoiceField}
                  tooltips={breakdownTooltips}
                />
              ) : null}
            </>
          ) : null}
        </Row>
      ) : null}

      {/* Our Pricing */}
      <Col
        className="col-12 p-1 my-2 d-flex justify-content-between"
        style={{ backgroundColor: "#FFEFDE" }}
      >
        <p className="p-2" style={sectionHeaderStyle}>
          Our Pricing
        </p>
        <div
          className="m-2"
          style={{ cursor: "pointer" }}
          onClick={() => setOurPricingTab(!ourPricingTab)}
        >
          {ourPricingTab ? (
            <IoIosArrowDown size={30} />
          ) : (
            <IoIosArrowForward size={30} />
          )}
        </div>
      </Col>

      {ourPricingTab ? (
        <>
          <Row className="d-flex col-12">
            <Col className="col-2">
              <div className="form-outline mb-2" id="our_price">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Our Price</Label>
                  <div>
                    <FieldTooltip id="addonOurPrice" isOpen={ttop12} toggle={() => setttop12(!ttop12)}>
                      The price we will sell the add-on for.
                    </FieldTooltip>
                  </div>
                </div>
                <MoneyInput
                  name="our_price"
                  validationType={validationType}
                  onBlur={onOurPriceBlur}
                  invalid={
                    validationType.touched.our_price &&
                    !!validationType.errors.our_price
                  }
                />
                {validationType.touched.our_price && validationType.errors.our_price ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.our_price}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2" id="commission">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Commission</Label>
                  <div>
                    <FieldTooltip id="addonOurComm" isOpen={ttop15} toggle={() => setttop15(!ttop15)}>
                      Our Price - Net Price = Commission.
                    </FieldTooltip>
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-text form-label fw-bold bg-paradise text-white border-0">
                    $
                  </span>
                  <Input readOnly type="text" value={ourCommission} />
                </div>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2" id="eff_rate">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Eff. Rate</Label>
                  <div>
                    <FieldTooltip id="addonEffRate" isOpen={ttop14} toggle={() => setttop14(!ttop14)}>
                      Effective commission rate (Commission / Our Price).
                    </FieldTooltip>
                  </div>
                </div>
                <MoneyInput
                  name="eff_rate"
                  validationType={validationType}
                  readOnly
                  prefix={null}
                  suffix="%"
                />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2" id="deposit">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Deposit</Label>
                  <div>
                    <FieldTooltip id="addonDeposit" isOpen={ttop16} toggle={() => setttop16(!ttop16)}>
                      Amount collected at booking, based on Collect above.
                    </FieldTooltip>
                  </div>
                </div>
                <MoneyInput
                  name="deposit"
                  validationType={validationType}
                  readOnly={+priceCollectSelected !== 1}
                  onBlur={(e) => {
                    validationType.setFieldValue(
                      "deposit",
                      setDecimalFormat(e.target.value || "")
                    );
                    providerPricingCalc?.();
                  }}
                  invalid={
                    validationType.touched.deposit && !!validationType.errors.deposit
                  }
                />
                {validationType.touched.deposit && validationType.errors.deposit ? (
                  <FormFeedback type="invalid">
                    {validationType.errors.deposit}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2" id="voucher_currency">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Vchr Currency</Label>
                  {setttop21 && (
                    <div>
                      <FieldTooltip
                        id="addonVCurrency"
                        isOpen={ttop21}
                        toggle={() => setttop21(!ttop21)}
                      >
                        Currency for Balance Due on the confirmation voucher (USD or MXN).
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <Input
                  type="select"
                  name="currency"
                  value={currencySelected || "-1"}
                  onChange={(e) => setCurrencySelected?.(e.target.value)}
                >
                  <option value="-1">Select....</option>
                  {map(currencies, (curr, index) => (
                    <option key={index} value={curr.currency_id}>
                      {curr.currency}
                    </option>
                  ))}
                </Input>
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2" id="voucher_balance">
                <div className="d-flex justify-content-between">
                  <Label style={{ fontSize: "13px" }} className="form-label">
                    Voucher Balance
                  </Label>
                  {setttop22 && (
                    <div>
                      <FieldTooltip
                        id="addonVBalance"
                        isOpen={ttop22}
                        toggle={() => setttop22(!ttop22)}
                      >
                        Balance Due on the confirmation voucher in USD or MXN.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <Input
                    name="voucher_balance"
                    type="text"
                    readOnly={
                      currencySelected !== "MXN $" && currencySelected !== "MXN"
                    }
                    onChange={validationType.handleChange}
                    value={validationType.values.voucher_balance || ""}
                  />
                  <span className="input-group-text form-label fw-bold bg-paradise text-white border-0">
                    $
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="d-flex col-12">
            <Col className="col-2">
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Before Tax</Label>
                  {setbaseTooltipOP && (
                    <div>
                      <FieldTooltip
                        id="addonTBase"
                        isOpen={baseTooltipOP}
                        toggle={() => setbaseTooltipOP(!baseTooltipOP)}
                      >
                        Base price before taxes and gratuities.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <MoneyInput name="t_base_amount" validationType={validationType} readOnly />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">16% IVA</Label>
                  {setivaTooltipOP && (
                    <div>
                      <FieldTooltip
                        id="addonTIva"
                        isOpen={ivaTooltipOP}
                        toggle={() => setivaTooltipOP(!ivaTooltipOP)}
                      >
                        IVA (VAT) due to the Mexican Government.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <MoneyInput name="t_iva" validationType={validationType} readOnly />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label text-paradiseOrange">Price w/Tax</Label>
                  {settotalPriceTooltipOP && (
                    <div>
                      <FieldTooltip
                        id="addonTTotal"
                        isOpen={totalPriceTooltipOP}
                        toggle={() => settotalPriceTooltipOP(!totalPriceTooltipOP)}
                      >
                        Our price including taxes, not including gratuity.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <MoneyInput name="t_total_price" validationType={validationType} readOnly />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Gratuity</Label>
                  {setgratuityTooltipOP && (
                    <div>
                      <FieldTooltip
                        id="addonTGratuity"
                        isOpen={gratuityTooltipOP}
                        toggle={() => setgratuityTooltipOP(!gratuityTooltipOP)}
                      >
                        Mandatory gratuity required by the Provider.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <MoneyInput name="t_gratuity" validationType={validationType} readOnly />
              </div>
            </Col>
            <Col className="col-2">
              <div className="form-outline mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label">Total Price</Label>
                  {setfinalTotalTooltipOP && (
                    <div>
                      <FieldTooltip
                        id="addonTFinal"
                        isOpen={finalTotalTooltipOP}
                        toggle={() => setfinalTotalTooltipOP(!finalTotalTooltipOP)}
                      >
                        Total including taxes and mandatory gratuity.
                      </FieldTooltip>
                    </div>
                  )}
                </div>
                <MoneyInput
                  name="t_final_total"
                  validationType={validationType}
                  readOnly={+priceCollectSelected !== 1}
                />
              </div>
            </Col>
          </Row>
        </>
      ) : null}

      {/* Comparison Pricing */}
      <Col
        className="col-12 p-1 my-2 d-flex justify-content-between"
        style={{ backgroundColor: "#e7ffdc", cursor: "pointer" }}
        onClick={() => setComparisonPricingTab(!comparisonPricingTab)}
      >
        <div className="d-flex">
          <p className="p-2" style={sectionHeaderStyle}>
            Comparison Pricing
          </p>
          <div className="mt-2">
            <FieldTooltip
              id="addonComparisonPricingTooltip"
              isOpen={comparisonHeaderTooltip}
              toggle={() => setComparisonHeaderTooltip(!comparisonHeaderTooltip)}
            >
              Competitor pricing used to calculate You Save on the website.
            </FieldTooltip>
          </div>
        </div>
        <div className="m-2" style={{ cursor: "pointer" }}>
          {comparisonPricingTab ? (
            <IoIosArrowDown size={30} />
          ) : (
            <IoIosArrowForward size={30} />
          )}
        </div>
      </Col>

      {comparisonPricingTab ? (
        <Row className="d-flex col-12">
          <Col className="col-2">
            <div className="form-outline mb-2" id="ship_price">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Ship Price</Label>
                <div>
                  <FieldTooltip id="addonShipPrice" isOpen={ttop10} toggle={() => setttop10(!ttop10)}>
                    Highest cruise ship price for this tour, if applicable.
                  </FieldTooltip>
                </div>
              </div>
              <MoneyInput
                name="ship_price"
                validationType={validationType}
                onBlur={(e) => comparisonBlur("ship_price", e.target.value)}
              />
            </div>
          </Col>
          <Col className="col-2">
            <div className="form-outline mb-2" id="compare_at">
              <div className="d-flex justify-content-between">
                <Label className="form-label">Compare At</Label>
                <div>
                  <FieldTooltip id="addonCompareAt" isOpen={ttop11} toggle={() => setttop11(!ttop11)}>
                    Regular price shown on our websites for comparison.
                  </FieldTooltip>
                </div>
              </div>
              <MoneyInput
                name="compare_at"
                validationType={validationType}
                onBlur={(e) => comparisonBlur("compare_at", e.target.value)}
              />
            </div>
          </Col>
          <Col className="col-2">
            <div className="form-outline mb-2" id="you_save">
              <div className="d-flex justify-content-between">
                <Label className="form-label">You Save</Label>
                <div>
                  <FieldTooltip id="addonYouSave" isOpen={ttop13} toggle={() => setttop13(!ttop13)}>
                    Calculated from Our Price vs Ship Price or Compare At.
                  </FieldTooltip>
                </div>
              </div>
              <MoneyInput
                name="you_save"
                validationType={validationType}
                readOnly
                prefix={null}
                suffix="%"
              />
            </div>
          </Col>
          <Col className="col-6">
            <div className="form-outline mb-2" id="compare_at_url">
              <div className="d-flex justify-content-between">
                <Label className="form-label">&quot;Compare At&quot; URL</Label>
                <div>
                  <FieldTooltip id="addonCompareAtURL" isOpen={ttop9} toggle={() => setttop9(!ttop9)}>
                    URL where the Compare At price can be verified.
                  </FieldTooltip>
                </div>
              </div>
              <Input
                name="compare_at_url"
                type="text"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.compare_at_url || ""}
                invalid={
                  validationType.touched.compare_at_url &&
                  !!validationType.errors.compare_at_url
                }
              />
              {validationType.touched.compare_at_url &&
              validationType.errors.compare_at_url ? (
                <FormFeedback type="invalid">
                  {validationType.errors.compare_at_url}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default AddonPricingSections;
