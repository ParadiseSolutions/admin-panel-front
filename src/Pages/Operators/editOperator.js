import { useEffect, useState } from "react";
import { getProviderAPI, getContactsProviderAPI, getSocialProviderAPI } from "../../Utils/API/Providers";
import EditGeneralInformation from "./Utils/editGeneralInfo";
import Contacts from "./Utils/contacts";
import SocialMedia from "./Utils/socialMedia";
import AutomatedConfirmation from "./Utils/automatedConfirmation";
import { Container } from "reactstrap";
import { useParams } from 'react-router-dom'
import PaymentMethods from "../Providers/Utils/PaymentMethods";
import Assets from "../Providers/Utils/assets";
const EditOperator = () => {
  const { id } = useParams();
  const [data, setData] = useState()
  const [contacts, setContacts] = useState()
  const [socialData, setSocialData] = useState()

  useEffect(() => {
    getProviderAPI(id).then((resp) =>{
      setData(resp.data.data)
    })
    getContactsProviderAPI(id).then((resp) =>{
      setContacts(resp.data.data)
    })
    getSocialProviderAPI(id).then((resp) =>{
      setSocialData(resp.data.data)
    })
  }, [id]);

  


    return ( 
        <>
        <div className="page-content pb-0">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              {`+ OPERATOR - ${data ? data.name : ''}`}
            </h1>
          </div>
         <div xl={8}>
          <EditGeneralInformation data={data} />
          <Contacts contacts={contacts}/>
          <PaymentMethods contacts={contacts} id={id} />
          <AutomatedConfirmation socialData={socialData} id={id} />
          <Assets contacts={contacts} id={id} />
          <SocialMedia socialData={socialData} id={id} />
         </div>
          </Container>
          </div>
          <div className="content-footer pt-2 px-4 mt-4 mx-4">
          <p>{new Date().getFullYear()} © JS Tour & Travel</p>
        </div>
        </>
     );
}
 
export default EditOperator;