import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import {
  createPricingOptionDetail,
  getPricingOptions,
  getPricingSkuCodes,
  getPricingTourTypes,
} from "../../../Utils/API/Manager";
import { IdResult, ManagerPage, showManagerError } from "../managerUi";

const emptyForm = {
  tour_type_id: "",
  pricing_option_id: "",
  name: "",
  singular_name: "",
  sku_code: "",
  add_on_type: "",
  position_display: "",
};

const PricingOptionDetails = () => {
  const [tourTypes, setTourTypes] = useState([]);
  const [pricingOptions, setPricingOptions] = useState([]);
  const [skuCodes, setSkuCodes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  useEffect(() => {
    getPricingTourTypes()
      .then((resp) => setTourTypes(resp.data.data || []))
      .catch(showManagerError);
    getPricingSkuCodes()
      .then((resp) => setSkuCodes(resp.data.data || []))
      .catch(showManagerError);
  }, []);

  const onTourType = (tourTypeId) => {
    setForm({ ...form, tour_type_id: tourTypeId, pricing_option_id: "" });
    setPricingOptions([]);
    if (!tourTypeId) {
      return;
    }
    getPricingOptions(tourTypeId)
      .then((resp) => setPricingOptions(resp.data.data || []))
      .catch(showManagerError);
  };

  const onCreate = (event) => {
    event.preventDefault();
    setSaving(true);
    createPricingOptionDetail({
      tour_type_id: Number(form.tour_type_id),
      pricing_option_id: Number(form.pricing_option_id),
      name: form.name.trim(),
      singular_name: form.singular_name.trim(),
      sku_code: form.sku_code || null,
      add_on_type: form.add_on_type === "" ? null : Number(form.add_on_type),
      position_display: form.position_display === "" ? null : Number(form.position_display),
    })
      .then((resp) => {
        setCreatedId(resp.data.data && resp.data.data.id);
        setForm({ ...emptyForm, tour_type_id: form.tour_type_id, pricing_option_id: form.pricing_option_id });
      })
      .catch(showManagerError)
      .finally(() => setSaving(false));
  };

  return (
    <ManagerPage title="PRICING OPTION DETAILS">
      <IdResult label="New id" value={createdId} />
      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <Form onSubmit={onCreate}>
                <Label>Tour type</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.tour_type_id}
                  onChange={(event) => onTourType(event.target.value)}
                  required
                >
                  <option value="">Select tour type</option>
                  {tourTypes.map((row) => (
                    <option key={row.id} value={row.id}>{row.name}</option>
                  ))}
                </Input>
                <Label>Pricing option</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.pricing_option_id}
                  onChange={(event) => setForm({ ...form, pricing_option_id: event.target.value })}
                  required
                >
                  <option value="">Select pricing option</option>
                  {pricingOptions.map((row) => (
                    <option key={row.id} value={row.id}>{row.name}</option>
                  ))}
                </Input>
                <Label>Option Name</Label>
                <Input
                  className="mb-3"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
                <Label>Singular Option Name</Label>
                <Input
                  className="mb-3"
                  value={form.singular_name}
                  onChange={(event) => setForm({ ...form, singular_name: event.target.value })}
                />
                <Label>SKU code</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.sku_code}
                  onChange={(event) => setForm({ ...form, sku_code: event.target.value })}
                >
                  <option value="">None</option>
                  {skuCodes.map((row) => (
                    <option key={row.sku_code} value={row.sku_code}>
                      {row.sku_code} — {row.name}
                    </option>
                  ))}
                </Input>
                <Label>Add-on type</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.add_on_type}
                  onChange={(event) => setForm({ ...form, add_on_type: event.target.value })}
                >
                  <option value="">No Addon/No Upgrade</option>
                  <option value="1">Addon</option>
                  <option value="2">Upgrade</option>
                  <option value="3">Available for Both (Addon and Upgrade)</option>
                </Input>
                <Label>Position</Label>
                <Input
                  type="number"
                  className="mb-3"
                  value={form.position_display}
                  onChange={(event) => setForm({ ...form, position_display: event.target.value })}
                />
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

export default PricingOptionDetails;
