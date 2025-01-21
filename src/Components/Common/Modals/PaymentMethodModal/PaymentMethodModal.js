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
} from "../../../../Utils/API/PaymentsMethods";

const PaymentMethodModal = ({
  addContactModal,
  setAddContactModal,
  onClickNewContactProvider,
}) => {
  const { id } = useParams();

  const [paymentTypeSelected, setPaymentTypeSelected] = useState(0);
  const [countrySelected, setCountrySelected] = useState(0);
  const [currencySelected, setCurrencySelected] = useState(0);
  const [countryCodeSelected, setCountryCodeSelected] = useState("");
  const [accountTypeSelected, setAccountTypeSelected] = useState(0);

  const [countryData, setCountryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [accountTypeData, setAccountTypeData] = useState([]);

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
  }, []);

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
      bank_name_WU:'',
      aba_routing_WU:'',
      account_number_WU:'',
      clabe_WU:'',
      debit_card_WU:'',
      swift_WU:'',
      name_WU:'',
      email_WU:'',
      country_WU:'',
      state_WU:'',
      phone_WU:''
    },
    // validationSchema: Yup.object().shape({
    //   // job_title: Yup.string().required("Field required"),
    //   first_name: Yup.string().required("Field required"),
    //   last_name: Yup.string().required("Field required"),
    //   // surname: Yup.string().required("Field required"),
    //   // primary_email:  Yup.string()
    //   // .email("Must be a valid Email")
    //   // .max(255)
    //   // .required("Email is required"),
    //   // secondary_email:  Yup.string()
    //   // .email("Must be a valid Email")
    //   // .max(255)
    //   // .required("Email is required"),
    //   // business_phone: Yup.number().required(
    //   //   "Please Enter Your Number"
    //   // ),
    //   // mobile_phone: Yup.number().required(
    //   //   "Please Enter Your Number"
    //   // ),
    // }),
    onSubmit: (values) => {
      console.log(values);

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
        // Agregar más casos si es necesario
        case 2:
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
        default:
          // Acción por defecto si no se cumple ninguno de los casos
          break;
      }
      console.log(data);
      // let data = {
      //   foreign_key: id,
      //   title: values.title,
      //   job_title: values.job_title,
      //   first_name: values.first_name,
      //   last_name: values.last_name,
      //   surname: values.surname,
      //   whatsapp: values.whatsapp,
      //   primary_email: values.primary_email,
      //   secondary_email: values.secondary_email,
      //   business_phone: values.business_phone,
      //   mobile_phone: values.mobile_phone,
      //   notes: values.notes,
      //   skype: values.skype,
      // };
      // createContactAPI(data)
      //   .then((resp) => {
      //     if (resp.data.status === 201) {
      //       Swal.fire("Created!", "Contact has been created.", "success").then(
      //         () => {
      //           setAddContactModal(false);
      //           document.location.reload();
      //         }
      //       );
      //     }
      //   })
      //   .catch((error) => {
      //     // console.log(error.response);
      //     Swal.fire("Error!", `${error.response.data.data[0]}`, "error");
      //   });
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
                <Col hidden={
                    !(paymentTypeSelected === 1 ||
                    paymentTypeSelected === 4 ||
                    paymentTypeSelected === 5)
                  }>
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
                        <option value={1}>ACH</option>
                        <option value={2}>Credit Card</option>
                        <option value={3}>PayPal</option>
                        <option value={4}>Western Union</option>
                        <option value={5}>Wire Transfer</option>
                        <option value={6}>Zelle</option>
                        <option value={7}>Venmo</option>
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
                  {paymentTypeSelected === 5 ? <WireTransferForm /> : null}
                  {paymentTypeSelected === 3 ? <PaypalForm /> : null}
                  {paymentTypeSelected === 2 ? <CreditCardForm /> : null}
                  {paymentTypeSelected === 6 ? <ZelleForm /> : null}
                  {paymentTypeSelected === 7 ? <VenmoForm /> : null}
              </Row>
            </Col>
            {paymentTypeSelected === 1 ||
            paymentTypeSelected === 4 ||
            paymentTypeSelected === 5 ? (
              <Col
                style={{
                  borderLeft: "1px solid #a4a4a5"                
                }}
                className="col-md-6">
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
                {paymentTypeSelected === 5 ? <WireTransferHolderForm /> : null}
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
