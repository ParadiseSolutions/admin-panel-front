
import GeneralInformation from "./Utils/generalInfo";
import { Container } from "reactstrap";

const NewOperator = () => {
    return ( 
        <>
        <div className="page-content">
        <Container fluid>
        <div className=" mx-5">
            <h1 className="display-5 fw-bold cursor-pointer" style={{ color: "#3DC7F4" }}>
              + OPERATORS
            </h1>
          </div>
         <div xl={8}>
          <GeneralInformation />
         </div>
          </Container>
          </div>
        </>
     );
}
 
export default NewOperator;