import { useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import { createCharterType, createCharterTypeFishing } from "../../../Utils/API/Manager";
import { IdResult, ManagerPage, showManagerError } from "../managerUi";

const CharterTypes = ({ kind }) => {
  const fishing = kind === "fishing";
  const [name, setName] = useState("");
  const [nameEs, setNameEs] = useState("");
  const [saving, setSaving] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const onCreate = (event) => {
    event.preventDefault();
    setSaving(true);
    const request = fishing
      ? createCharterTypeFishing({ name: name.trim(), name_es: nameEs.trim() })
      : createCharterType({ name: name.trim() });

    request
      .then((resp) => {
        setCreatedId(resp.data.data && resp.data.data.id);
        setName("");
        setNameEs("");
      })
      .catch(showManagerError)
      .finally(() => setSaving(false));
  };

  return (
    <ManagerPage title={fishing ? "CHARTER TYPES FISHING" : "CHARTER TYPES"}>
      <IdResult label="New id" value={createdId} />
      <Row>
        <Col lg="6">
          <Card>
            <CardBody>
              <Form onSubmit={onCreate}>
                <Label>Name</Label>
                <Input className="mb-3" value={name} onChange={(event) => setName(event.target.value)} required />
                {fishing ? (
                  <>
                    <Label>Name (Spanish)</Label>
                    <Input className="mb-3" value={nameEs} onChange={(event) => setNameEs(event.target.value)} />
                  </>
                ) : null}
                <Button type="submit" className="btn btn-orange" disabled={saving}>
                  {saving ? "Creating..." : "Create"}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ManagerPage>
  );
};

export default CharterTypes;
