import { useEffect, useState } from "react";
import { getProviderAPI, getContactsProviderAPI } from "../../Utils/API/Providers";
import EditGeneralInformation from "./Utils/editGeneralInfo";
import Contacts from "./Utils/contacts";
import SocialMedia from "./Utils/socialMedia";
import { Container } from "reactstrap";
import { useParams } from 'react-router-dom'
const EditProvider = () => {
  const { id } = useParams();
  const [data, setData] = useState()
  const [contacts, setContacts] = useState()
  useEffect(() => {
    getProviderAPI(id).then((resp) =>{
      setData(resp.data.data)
    })
    getContactsProviderAPI(id).then((resp) =>{
      setContacts(resp.data.data)
    })
  }, [id]);

  


    return ( 
        <>
        <div className="page-content">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              {`+ PROVIDER - ${data ? data.name : ''}`}
            </h1>
          </div>
         <div xl={8}>
          <EditGeneralInformation data={data} />
          <Contacts contacts={contacts}/>
          <SocialMedia data={data} />
         </div>
          </Container>
          </div>
        </>
     );
}
 
export default EditProvider;