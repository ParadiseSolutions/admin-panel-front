
import GeneralInformation from "./Utils/generalInfo";
import { Container } from "reactstrap";

const NewProvider = () => {
    return ( 
        <>
        <div className="page-content">
        <Container fluid>
         <div xl={8}>
          <GeneralInformation />
         </div>
          </Container>
          </div>
        </>
     );
}
 
export default NewProvider;