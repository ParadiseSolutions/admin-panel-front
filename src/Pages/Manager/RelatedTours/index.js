import { useState } from "react";
import { Button, Card, CardBody, Col, Label, Row, Table } from "reactstrap";
import { Select } from "antd";
import Swal from "sweetalert2";
import {
  getRelatedTour,
  previewRelatedTours,
  saveRelatedTours,
  searchRelatedTours,
} from "../../../Utils/API/Manager";
import { ManagerPage, showManagerError } from "../managerUi";

const mergeOptions = (current, incoming) => {
  const map = {};
  current.forEach((item) => {
    map[item.id] = item;
  });
  incoming.forEach((item) => {
    map[item.id] = item;
  });
  return Object.values(map);
};

const RelatedTours = () => {
  const [query, setQuery] = useState("");
  const [searchHits, setSearchHits] = useState([]);
  const [tour, setTour] = useState(null);
  const [options, setOptions] = useState([]);
  const [relatedIds, setRelatedIds] = useState([]);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSearch = (value) => {
    setQuery(value);
    if (!value || value.trim() === "") {
      setSearchHits([]);
      return;
    }
    searchRelatedTours(value.trim(), tour ? tour.id : 0)
      .then((resp) => setSearchHits(resp.data.data || []))
      .catch(showManagerError);
  };

  const loadTour = (tourId) => {
    if (!tourId) {
      return;
    }
    setBusy(true);
    setPreview(null);
    getRelatedTour(tourId)
      .then((resp) => {
        const data = resp.data.data;
        setTour(data.tour);
        setOptions((data.options || []).filter((item) => item.id !== data.tour.id));
        setRelatedIds(data.related_ids || []);
        setQuery("");
        setSearchHits([]);
      })
      .catch(showManagerError)
      .finally(() => setBusy(false));
  };

  const addSearchedTour = (tourId) => {
    const found = searchHits.find((item) => item.id === Number(tourId));
    if (!found || (tour && found.id === tour.id)) {
      return;
    }
    setOptions((current) => mergeOptions(current, [found]));
    setRelatedIds((current) => (current.indexOf(found.id) === -1 ? current.concat(found.id) : current));
  };

  const clusterBody = () => ({
    tour_id: tour.id,
    related_tour_ids: relatedIds,
  });

  const onPreview = () => {
    if (!tour) {
      return;
    }
    setBusy(true);
    previewRelatedTours(clusterBody())
      .then((resp) => setPreview(resp.data.data))
      .catch(showManagerError)
      .finally(() => setBusy(false));
  };

  const onSave = () => {
    if (!tour) {
      return;
    }
    setBusy(true);
    saveRelatedTours(clusterBody())
      .then((resp) => {
        const data = resp.data.data || {};
        Swal.fire(
          "Saved",
          `Updated ${ (data.affected || []).length } tours. HTML jobs: ${data.jobs_dispatched || 0}.`,
          "success"
        );
        setPreview(null);
        loadTour(tour.id);
      })
      .catch((error) => {
        setBusy(false);
        showManagerError(error);
      });
  };

  return (
    <ManagerPage title="RELATED TOURS">
      <Row>
        <Col lg="8">
          <Card>
            <CardBody>
              <Label>Find a tour</Label>
              <Select
                showSearch
                filterOption={false}
                value={tour ? tour.id : undefined}
                placeholder="Search by id or name"
                style={{ width: "100%" }}
                onSearch={onSearch}
                onChange={(value) => loadTour(Number(value))}
                notFoundContent={query ? "No tours" : "Type an id or name"}
                options={searchHits
                  .concat(tour && !searchHits.some((item) => item.id === tour.id) ? [tour] : [])
                  .map((item) => ({ value: item.id, label: item.label }))}
              />
              {tour ? (
                <div className="mt-4">
                  <h4 className="mb-1">{tour.label}</h4>
                  <p className="text-muted">Choose the related tours for this cluster. Saving can add or remove links.</p>
                  <Label>Add a related tour</Label>
                  <Select
                    showSearch
                    filterOption={false}
                    value={undefined}
                    placeholder="Search and add"
                    style={{ width: "100%", marginBottom: 16 }}
                    onSearch={onSearch}
                    onChange={(value) => addSearchedTour(value)}
                    options={searchHits
                      .filter((item) => item.id !== tour.id)
                      .map((item) => ({ value: item.id, label: item.label }))}
                  />
                  <Label>Related tours</Label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    value={relatedIds}
                    onChange={(values) => setRelatedIds(values.map((value) => Number(value)))}
                    options={options.map((item) => ({ value: item.id, label: item.label }))}
                    optionFilterProp="label"
                  />
                  <div className="mt-3">
                    <Button type="button" className="btn btn-orange me-2" onClick={onPreview} disabled={busy}>
                      Preview
                    </Button>
                    <Button type="button" className="btn btn-orange" onClick={onSave} disabled={busy}>
                      {busy ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              ) : null}
              {preview && preview.changes && preview.changes.length > 0 ? (
                <Table responsive className="mt-4 mb-0">
                  <thead>
                    <tr>
                      <th>Tour</th>
                      <th>Action</th>
                      <th>Before</th>
                      <th>After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.changes.map((change) => (
                      <tr key={change.tour_id}>
                        <td>#{change.tour_id} {change.name}</td>
                        <td>{change.action}</td>
                        <td>{change.before || "—"}</td>
                        <td>{change.after || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
              {preview && preview.changes && preview.changes.length === 0 ? (
                <p className="text-muted mt-3 mb-0">No changes to save.</p>
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </ManagerPage>
  );
};

export default RelatedTours;
