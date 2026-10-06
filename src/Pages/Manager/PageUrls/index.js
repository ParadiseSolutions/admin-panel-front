import { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Row, Table, UncontrolledTooltip } from "reactstrap";
import { createPageUrl, getPageUrlCatalogs, searchPageUrls } from "../../../Utils/API/Manager";
import { IdResult, ManagerPage, copyValue, showManagerError } from "../managerUi";

const pageMetaTag = (row) => {
  const pageType = String(row.page_type || "").toLowerCase();
  const dataId = row.data_id;
  const dataType = row.page_type_id === null || row.page_type_id === undefined ? "" : row.page_type_id;
  return `<meta id="x_info" data-id="${dataId}" data-type="${dataType}">\n<meta name="page-type" content="${pageType}" id="x_info_pagetype">`;
};

const CopyMetaTag = ({ row, targetId }) => (
  <span
    className="text-warning mx-2"
    onClick={() => {
      navigator.clipboard.writeText(pageMetaTag(row));
    }}
  >
    <i
      className="mdi mdi-content-copy font-size-18"
      id={targetId}
      style={{ cursor: "pointer" }}
    />
    <UncontrolledTooltip placement="top" target={targetId}>
      Copy Meta Tag
    </UncontrolledTooltip>
  </span>
);

const emptyForm = {
  website_id: "",
  path_type_id: "",
  page_name: "",
  url: "",
};

const PageUrls = () => {
  const [catalogs, setCatalogs] = useState({ websites: [], path_types: [] });
  const [searchUrl, setSearchUrl] = useState("");
  const [results, setResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    getPageUrlCatalogs()
      .then((resp) => {
        setCatalogs(resp.data.data || { websites: [], path_types: [] });
      })
      .catch(showManagerError);
  }, []);

  const onSearch = (event) => {
    event.preventDefault();
    const term = searchUrl.trim();
    if (!term) {
      return;
    }
    setSearching(true);
    searchPageUrls(term)
      .then((resp) => {
        setResults(resp.data.data || []);
      })
      .catch(showManagerError)
      .finally(() => setSearching(false));
  };

  const onCreate = (event) => {
    event.preventDefault();
    setSaving(true);
    createPageUrl({
      website_id: Number(form.website_id),
      path_type_id: Number(form.path_type_id),
      page_name: form.page_name.trim(),
      url: form.url.trim(),
    })
      .then((resp) => {
        setCreated(resp.data.data || null);
        setForm(emptyForm);
      })
      .catch(showManagerError)
      .finally(() => setSaving(false));
  };

  return (
    <ManagerPage title="PAGE URLS">
      <IdResult
        label="data-id"
        value={created && created.data_id}
        extra={created ? <CopyMetaTag row={created} targetId="copy-meta-created" /> : null}
      />
      <Row>
        <Col lg="6">
          <Card>
            <CardBody>
              <h4 className="mb-3">Search URL</h4>
              <Form onSubmit={onSearch}>
                <Label>URL</Label>
                <Input
                  value={searchUrl}
                  onChange={(event) => setSearchUrl(event.target.value)}
                  placeholder="https://"
                />
                <Button type="submit" className="btn btn-orange mt-3" disabled={searching}>
                  {searching ? "Searching..." : "Search"}
                </Button>
              </Form>
              {results && results.length === 0 ? (
                <p className="text-muted mt-3 mb-0">No page found for that URL.</p>
              ) : null}
              {results && results.length > 0 ? (
                <Table responsive className="mt-3 mb-0">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>data-id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row) => (
                      <tr key={row.data_id}>
                        <td>{row.url}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-link p-0 fw-bold"
                            onClick={() => copyValue(row.data_id)}
                          >
                            {row.data_id}
                          </button>
                          <CopyMetaTag row={row} targetId={`copy-meta-${row.data_id}`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card>
            <CardBody>
              <h4 className="mb-3">Create page URL</h4>
              <Form onSubmit={onCreate}>
                <Label>Website</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.website_id}
                  onChange={(event) => setForm({ ...form, website_id: event.target.value })}
                  required
                >
                  <option value="">Select website</option>
                  {catalogs.websites.map((website) => (
                    <option key={website.id} value={website.id}>
                      {website.label}
                    </option>
                  ))}
                </Input>
                <Label>Page type</Label>
                <Input
                  type="select"
                  className="mb-3"
                  value={form.path_type_id}
                  onChange={(event) => setForm({ ...form, path_type_id: event.target.value })}
                  required
                >
                  <option value="">Select page type</option>
                  {catalogs.path_types.map((pathType) => (
                    <option key={pathType.id} value={pathType.id}>
                      {pathType.name}
                    </option>
                  ))}
                </Input>
                <Label>Page name</Label>
                <Input
                  className="mb-3"
                  value={form.page_name}
                  onChange={(event) => setForm({ ...form, page_name: event.target.value })}
                  required
                />
                <Label>Page URL</Label>
                <Input
                  className="mb-3"
                  value={form.url}
                  onChange={(event) => setForm({ ...form, url: event.target.value })}
                  required
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

export default PageUrls;
