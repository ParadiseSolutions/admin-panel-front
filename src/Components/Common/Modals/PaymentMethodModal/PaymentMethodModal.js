import { createContactAPI } from "../../../../Utils/API/Contacts";
import BannerOne from "../../../Assets/images/paymentOne.png";
import BannerTwo from "../../../Assets/images/paymentTwo.png";
import AchForm from "./Components/ACHComponents/achForm";
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
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import AchAccHolderForm from "./Components/ACHComponents/AchAccHolderForm";
import WesternUnionForm from "./Components/WesternUnionComponents/WesternUnionForm";
import WesternUnionHolderForm from "./Components/WesternUnionComponents/WesternUnionHolderForm";
import WireTransferForm from "./Components/WireTransferComponents/WireTransferForm";
import WireTransferHolderForm from "./Components/WireTransferComponents/WireTransferHolderForm";
import PaypalForm from "./Components/PaypalComponents/PaypalForm";
import CreditCardForm from "./Components/CreditCardComponents/CreditCardForm";
import ZelleForm from "./Components/ZelleComponents/ZelleForm";
import VenmoForm from "./Components/VenmoComponents/VenmoForm";
import {
  getAccountTypePM,
  getCountryPM,
  getCurrencyPM,
  getExtraFeePM,
  getPaymentInstructionPM,
  getPaymentMethod,
  postPaymentMethod,
} from "../../../../Utils/API/PaymentsMethods";

const PaymentMethodModal = ({
  addContactModal,
  setAddContactModal,
  onClickNewContactProvider,
  setContactID,
  contactID
}) => {
  const { id } = useParams();
console.log(contactID)
const [paymentDataEdit, setPaymentDataEdit] = useState([])
  const [paymentTypeSelected, setPaymentTypeSelected] = useState(0);
  const [countrySelected, setCountrySelected] = useState(0);
  const [currencySelected, setCurrencySelected] = useState(0);
  const [countryCodeSelected, setCountryCodeSelected] = useState("");
  const [accountTypeSelected, setAccountTypeSelected] = useState(0);
  const [extraFeeSelected, setExtraFeeSelected] = useState(0);
  const [paymentInstructionSelected, setPaymentInstructionSelected] =
    useState(0);

  const [countryData, setCountryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [accountTypeData, setAccountTypeData] = useState([]);
  const [extraFeeData, setExtraFeeData] = useState([]);
  const [paymentInstructionData, setPaymentInstructionData] = useState([]);

  useEffect(() => {
    getCountryPM().then((response) => {
      setCountryData(response.data.data);
    });
    getCurrencyPM().then((response) => {
      setCurrencyData(response.data.data);
    });
    getAccountTypePM().then((response) => {
      setAccountTypeData(response.data.data);
    });
    getExtraFeePM().then((response) => {
      setExtraFeeData(response.data.data);
    });
    getPaymentInstructionPM().then((response) => {
      setPaymentInstructionData(response.data.data);
    });
  }, []);

  //edit data
  useEffect(() => {
    if (contactID) {
      getPaymentMethod(contactID).then((resp) => {
        setPaymentDataEdit(resp.data.data);
      })
    }
  }, [contactID])

  useEffect(() => {
    if (paymentDataEdit.length > 0) {
      setPaymentTypeSelected(paymentDataEdit?.payment_type?.id)
    }
  }, [paymentDataEdit])
  
  
console.log(paymentDataEdit?.payment_type?.id)
  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      //ach
      bank_name: "",
      ABA_Routing: "",
      account_number: "",
      name_ach: "",
      address_ach: "",
      city_ach: "",
      state_ach: "",
      postal_ach: "",
      phone_ach: "",
      email_ach: "",
      // Western Union
      bank_name_WU: "",
      aba_routing_WU: "",
      account_number_WU: "",
      clabe_WU: "",
      debit_card_WU: "",
      swift_WU: "",
      name_WU: "",
      email_WU: "",
      country_WU: "",
      state_WU: "",
      phone_WU: "",
      // paypal
      email_PP: "",
      amount_PP: "",
      payment_link_PP: "",
      // zelle
      email_zelle: "",
      amount_zelle: "",
      // venmo
      email_venmo: "",
      amount_venmo: "",
      // credit card
      payment_link_CC: "",
      phone_CC: "",
      amount_CC: "",
      // wire transfer
      bank_name_WT: "",
      swift_WT: "",
      clabe_WT: "",
      aba_routing_WT: "",
      account_number_WT: "",
      name_WT: "",
      address_WT: "",
      city_WT: "",
      state_WT: "",
      postal_WT: "",
      phone_WT: "",
      email_WT: "",
    },

    onSubmit: (values) => {
      let data = {};
      switch (paymentTypeSelected) {
        case 1:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null,
            currency_id: currencySelected,
            bank_name: values.bank_name,
            bank_country: countrySelected,
            aba_routing: values.ABA_Routing,
            account_number: values.account_number,
            account_name: values.name_ach,
            address: values.address_ach,
            state: values.state_ach,
            postal: values.postal_ach,
            city: values.city_ach,
            phone_country: countryCodeSelected,
            phone: values.phone_ach,
            email: values.email_ach,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: null,
            amount: null,
            payment_instruction_id: null,
            form_url: null,
            clabe: null,
          };
          break;

        case 4:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: 1, // preguntar
            currency_id: currencySelected,
            bank_name: values.bank_name_WU,
            bank_country: countrySelected,
            account_name: values.name_WU,
            state: values.state_WU,
            phone_country: countryCodeSelected,
            phone: values.phone_WU,
            email: values.email_WU,
            address: null,
            postal: null,
            city: null,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: null,
            amount: null,
            payment_instruction_id: null,
            form_url: null,
            clabe: null,
            aba_routing: null,
            account_number: null,
          };

          if (countryCodeSelected === 1) {
            data.aba_routing = values.aba_routing_WU;
            data.account_number = values.account_number_WU;
          } else if (countryCodeSelected === 2) {
            if (accountTypeSelected === 1) {
              data.clabe = values.clabe_WU;
            } else if (accountTypeSelected === 2) {
              data.account_number = values.debit_card_WU;
              data.swift = values.swift_WU;
              data.account_type_id = accountTypeSelected;
            }
          }

          break;
        case 5:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null, // preguntar
            currency_id: currencySelected,
            bank_name: values.bank_name_WT,
            bank_country: countrySelected,
            account_name: values.name_WT,
            state: values.state_WT,
            phone_country: countryCodeSelected,
            phone: values.phone_WT,
            email: values.email_WT,
            address: values.address_WT,
            postal: values.postal_WT,
            city: values.city_WT,
            routing_number: null,
            swift: values.swift_WT,
            account_type_id: null,
            extrafee_id: null,
            amount: null,
            payment_instruction_id: null,
            form_url: null,
            clabe: values.clabe_WT,
            aba_routing: values.aba_routing_WT,
            account_number: values.account_number_WT,
          };
          break;

        case 3:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null,
            currency_id: null,
            bank_name: null,
            bank_country: null,
            account_name: null,
            state: null,
            phone_country: null,
            phone: null,
            email: values.email_PP,
            address: null,
            postal: null,
            city: null,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: extraFeeSelected,
            amount: values.amount_PP,
            payment_instruction_id: null,
            form_url: values.payment_link_PP,
            clabe: null,
            aba_routing: null,
            account_number: null,
          };
          break;
        case 6:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null,
            currency_id: null,
            bank_name: null,
            bank_country: null,
            account_name: null,
            state: null,
            phone_country: null,
            phone: null,
            email: values.email_zelle,
            address: null,
            postal: null,
            city: null,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: extraFeeSelected,
            amount: values.amount_zelle,
            payment_instruction_id: null,
            form_url: null,
            clabe: null,
            aba_routing: null,
            account_number: null,
          };
          break;
        case 7:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null,
            currency_id: null,
            bank_name: null,
            bank_country: null,
            account_name: null,
            state: null,
            phone_country: null,
            phone: null,
            email: values.email_venmo,
            address: null,
            postal: null,
            city: null,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: extraFeeSelected,
            amount: values.amount_venmo,
            payment_instruction_id: null,
            form_url: null,
            clabe: null,
            aba_routing: null,
            account_number: null,
          };
          break;
        case 2:
          data = {
            provider_id: id,
            type_id: paymentTypeSelected,
            country_id: null,
            currency_id: null,
            bank_name: null,
            bank_country: null,
            account_name: null,
            state: null,
            phone_country: null,
            phone: extraFeeSelected === 1 ? values.phone_CC : null,
            email: null,
            address: null,
            postal: null,
            city: null,
            routing_number: null,
            swift: null,
            account_type_id: null,
            extrafee_id: extraFeeSelected,
            amount: values.amount_CC,
            payment_instruction_id: paymentInstructionSelected,
            form_url:
              extraFeeSelected === 2 || extraFeeSelected === 4
                ? values.form_url_CC
                : null,
            clabe: null,
            aba_routing: null,
            account_number: null,
          };
          break;

        default:
          break;
      }
      postPaymentMethod(data)
        .then((resp) => {
          if (resp.data.status === 201) {
            Swal.fire(
              "Created!",
              "Payment Method has been created.",
              "success"
            ).then(() => {
              setAddContactModal(false);
              document.location.reload();
            });
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
      centered
      size="xl"
      isOpen={addContactModal}
      toggle={() => {
        onClickNewContactProvider();
      }}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#3DC7F4", border: "none" }}
      >
        <h1 className="modal-title mt-0 text-white">+ Add New Payment</h1>
        <button
          onClick={() => {
            setAddContactModal(false);
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
      <div className="modal-body p-4">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validationType.handleSubmit();
            return false;
          }}
          className="custom-validation"
        >
          <Row className=" d-flex justify-content-between pb-4 ">
            <Col className="col-md-6">
              <img src={BannerOne} alt="image1" className="w-100" />
            </Col>
            <Col className="col-md-6">
              <img src={BannerTwo} alt="image2" className="w-100" />
            </Col>
          </Row>
          <Row>
            <Col
              className={
                paymentTypeSelected === 1 ||
                paymentTypeSelected === 4 ||
                paymentTypeSelected === 5
                  ? "col-6"
                  : "col-12"
              }
            >
              <Row>
                <Col
                  hidden={
                    !(
                      paymentTypeSelected === 1 ||
                      paymentTypeSelected === 4 ||
                      paymentTypeSelected === 5
                    )
                  }
                >
                  <Label className="text-bold">Bank's Information</Label>
                </Col>
              </Row>
              <Row>
                <Col
                  className={
                    paymentTypeSelected === 1 ||
                    paymentTypeSelected === 4 ||
                    paymentTypeSelected === 5
                      ? "col-5"
                      : "col-3"
                  }
                >
                  {paymentDataEdit}
                  <div className="form-outline mb-2">
                    <Label className="form-label">Payment Type</Label>
                    <Input
                      type="select"
                      name="payment_type"
                      onChange={(e) => {
                        setPaymentTypeSelected(+e.target.value);
                      }}
                      
                      onBlur={validationType.handleBlur}
                      value={paymentTypeSelected || ""}
                    >
                      <option value={null}>Select....</option>
                      <option value={1} selected={paymentDataEdit?.payment_type?.id === 1 ? true : false}>ACH</option>
                      <option value={2} selected={paymentDataEdit?.payment_type?.id === 2 ? true : false}>Credit Card</option>
                      <option value={3} selected={paymentDataEdit?.payment_type?.id === 3 ? true : false}>PayPal</option>
                      <option value={4} selected={paymentDataEdit?.payment_type?.id === 4 ? true : false}>Western Union</option>
                      <option value={5} selected={paymentDataEdit?.payment_type?.id === 5 ? true : false}>Wire Transfer</option>
                      <option value={6} selected={paymentDataEdit?.payment_type?.id === 6 ? true : false}>Zelle</option>
                      <option value={7} selected={paymentDataEdit?.payment_type?.id === 7 ? true : false}>Venmo</option>
                    </Input>
                  </div>
                </Col>
                {paymentTypeSelected === 1 ? (
                  <AchForm
                    validationType={validationType}
                    countryData={countryData}
                    currencyData={currencyData}
                    countrySelected={countrySelected}
                    setCountrySelected={setCountrySelected}
                    currencySelected={currencySelected}
                    setCurrencySelected={setCurrencySelected}
                  />
                ) : null}
                {paymentTypeSelected === 4 ? (
                  <WesternUnionForm
                    validationType={validationType}
                    countryData={countryData}
                    currencyData={currencyData}
                    accountTypeData={accountTypeData}
                    countrySelected={countrySelected}
                    setCountrySelected={setCountrySelected}
                    currencySelected={currencySelected}
                    setCurrencySelected={setCurrencySelected}
                    accountTypeSelected={accountTypeSelected}
                    setAccountTypeSelected={setAccountTypeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 5 ? (
                  <WireTransferForm
                    validationType={validationType}
                    countryData={countryData}
                    currencyData={currencyData}
                    accountTypeData={accountTypeData}
                    countrySelected={countrySelected}
                    setCountrySelected={setCountrySelected}
                    currencySelected={currencySelected}
                    setCurrencySelected={setCurrencySelected}
                    accountTypeSelected={accountTypeSelected}
                    setAccountTypeSelected={setAccountTypeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 3 ? (
                  <PaypalForm
                    validationType={validationType}
                    extraFeeData={extraFeeData}
                    setExtraFeeSelected={setExtraFeeSelected}
                    extraFeeSelected={extraFeeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 2 ? (
                  <CreditCardForm
                    validationType={validationType}
                    extraFeeData={extraFeeData}
                    paymentInstructionData={paymentInstructionData}
                    setExtraFeeSelected={setExtraFeeSelected}
                    extraFeeSelected={extraFeeSelected}
                    paymentInstructionSelected={paymentInstructionSelected}
                    setPaymentInstructionSelected={
                      setPaymentInstructionSelected
                    }
                  />
                ) : null}
                {paymentTypeSelected === 6 ? (
                  <ZelleForm
                    validationType={validationType}
                    extraFeeData={extraFeeData}
                    setExtraFeeSelected={setExtraFeeSelected}
                    extraFeeSelected={extraFeeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 7 ? (
                  <VenmoForm
                    validationType={validationType}
                    extraFeeData={extraFeeData}
                    setExtraFeeSelected={setExtraFeeSelected}
                    extraFeeSelected={extraFeeSelected}
                  />
                ) : null}
              </Row>
            </Col>
            {paymentTypeSelected === 1 ||
            paymentTypeSelected === 4 ||
            paymentTypeSelected === 5 ? (
              <Col
                style={{
                  borderLeft: "1px solid #a4a4a5",
                }}
                className="col-md-6"
              >
                <Row>
                  <Col>
                    <Label>Account Holder's Information</Label>
                  </Col>
                </Row>
                {paymentTypeSelected === 1 ? (
                  <AchAccHolderForm
                    validationType={validationType}
                    countryData={countryData}
                    countryCodeSelected={countryCodeSelected}
                    setCountryCodeSelected={setCountryCodeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 4 ? (
                  <WesternUnionHolderForm
                    validationType={validationType}
                    countryData={countryData}
                    countryCodeSelected={countryCodeSelected}
                    setCountryCodeSelected={setCountryCodeSelected}
                  />
                ) : null}
                {paymentTypeSelected === 5 ? (
                  <WireTransferHolderForm
                    validationType={validationType}
                    countryData={countryData}
                    countryCodeSelected={countryCodeSelected}
                    setCountryCodeSelected={setCountryCodeSelected}
                  />
                ) : null}
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col className="col-12 mt-2 d-flex justify-content-end">
              <Button
                type="submit"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
              >
                <i className="mdi mdi-plus me-1" />
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;
