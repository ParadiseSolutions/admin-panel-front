import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getAirportTransferForms } from "../../../Utils/API/Manager";
import { ManagerPage, showManagerError } from "../managerUi";

const AirportTransfers = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAirportTransferForms()
      .then((resp) => setForms(resp.data.data || []))
      .catch(showManagerError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <ManagerPage title="AIRPORT TRANSFERS">
      {loading ? <p>Loading...</p> : null}
      <Row>
        {forms.map((form) => (
          <Col md="6" xl="4" key={`${form.web_code}-${form.type}`} className="mb-3">
            <Card className="h-100">
              <CardBody>
                <h5>{form.label}</h5>
                <p className="text-muted mb-3">{form.web_code} · {form.type}</p>
                <Link
                  className="btn btn-orange"
                  to={`/manager/airport-transfers/${encodeURIComponent(form.web_code)}/${encodeURIComponent(form.type)}`}
                >
                  Open
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </ManagerPage>
  );
};

export default AirportTransfers;
