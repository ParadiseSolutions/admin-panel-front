import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  clearAirportCache,
  createAirportAirline,
  createAirportHotel,
  getAirportTransferForm,
  updateAirportAirline,
  updateAirportHotel,
} from "../../../Utils/API/Manager";
import { ManagerPage, showManagerError } from "../managerUi";

const emptyHotel = {
  hotel_name: "",
  city_zone_id: "",
  round_trip: "0",
  arrival: "0",
  departure: "0",
  active: "1",
  airport: "",
  comments: "",
  coz_zone: "",
  cn_zone: "",
};

const emptyAirline = {
  code: "",
  name: "",
  country_code: "",
  country_name: "",
  domestic_flight: "0",
  airport: "",
  active: "1",
};

const yesNo = (value) => (Number(value) === 1 ? "Yes" : "No");

const AirportTransferForm = () => {
  const { webCode, type } = useParams();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hotelModal, setHotelModal] = useState(false);
  const [airlineModal, setAirlineModal] = useState(false);
  const [hotelForm, setHotelForm] = useState(emptyHotel);
  const [airlineForm, setAirlineForm] = useState(emptyAirline);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [editingAirlineId, setEditingAirlineId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    getAirportTransferForm(webCode, type)
      .then((resp) => setPayload(resp.data.data))
      .catch(showManagerError)
      .finally(() => setLoading(false));
  }, [webCode, type]);

  useEffect(() => {
    load();
  }, [load]);

  const showsCozumel = payload && payload.form && payload.form.shows_cozumel;

  const openHotel = (row) => {
    if (row) {
      setEditingHotelId(row.id);
      setHotelForm({
        hotel_name: row.hotel_name || "",
        city_zone_id: row.city_zone_id || "",
        round_trip: row.round_trip === null || row.round_trip === undefined ? "0" : String(row.round_trip),
        arrival: row.arrival === null || row.arrival === undefined ? "0" : String(row.arrival),
        departure: row.departure === null || row.departure === undefined ? "0" : String(row.departure),
        active: row.active === null || row.active === undefined ? "1" : String(row.active),
        airport: row.airport || "",
        comments: row.comments || "",
        coz_zone: row.coz_zone || "",
        cn_zone: row.cn_zone || "",
      });
    } else {
      setEditingHotelId(null);
      setHotelForm(emptyHotel);
    }
    setHotelModal(true);
  };

  const openAirline = (row) => {
    if (row) {
      setEditingAirlineId(row.id);
      setAirlineForm({
        code: row.code || "",
        name: row.name || "",
        country_code: row.country_code || "",
        country_name: row.country_name || "",
        domestic_flight: row.domestic_flight === null || row.domestic_flight === undefined ? "0" : String(row.domestic_flight),
        airport: row.airport || "",
        active: row.active === null || row.active === undefined ? "1" : String(row.active),
      });
    } else {
      setEditingAirlineId(null);
      setAirlineForm(emptyAirline);
    }
    setAirlineModal(true);
  };

  const hotelBody = () => {
    const zone = (payload.zones || []).find((item) => String(item.id) === String(hotelForm.city_zone_id));
    const body = {
      hotel_name: hotelForm.hotel_name.trim(),
      city_zone_id: hotelForm.city_zone_id === "" ? null : Number(hotelForm.city_zone_id),
      zone: zone ? zone.zone : null,
      round_trip: Number(hotelForm.round_trip),
      arrival: Number(hotelForm.arrival),
      departure: Number(hotelForm.departure),
      active: Number(hotelForm.active),
      airport: hotelForm.airport.trim(),
      comments: hotelForm.comments.trim(),
    };
    if (showsCozumel) {
      body.coz_zone = hotelForm.coz_zone || null;
      body.cn_zone = hotelForm.cn_zone || null;
    }
    return body;
  };

  const saveHotel = (event) => {
    event.preventDefault();
    setSaving(true);
    const request = editingHotelId
      ? updateAirportHotel(webCode, type, editingHotelId, hotelBody())
      : createAirportHotel(webCode, type, hotelBody());
    request
      .then(() => {
        setHotelModal(false);
        load();
      })
      .catch(showManagerError)
      .finally(() => setSaving(false));
  };

  const airlineBody = () => ({
    code: airlineForm.code.trim(),
    name: airlineForm.name.trim(),
    country_code: airlineForm.country_code.trim(),
    country_name: airlineForm.country_name.trim(),
    domestic_flight: Number(airlineForm.domestic_flight),
    airport: airlineForm.airport.trim(),
    active: Number(airlineForm.active),
  });

  const saveAirline = (event) => {
    event.preventDefault();
    setSaving(true);
    const request = editingAirlineId
      ? updateAirportAirline(webCode, type, editingAirlineId, airlineBody())
      : createAirportAirline(webCode, type, airlineBody());
    request
      .then(() => {
        setAirlineModal(false);
        load();
      })
      .catch(showManagerError)
      .finally(() => setSaving(false));
  };

  const onClearCache = () => {
    clearAirportCache(webCode, type)
      .then((resp) => {
        const removed = resp.data.data ? resp.data.data.removed : 0;
        Swal.fire("Cache cleared", `${removed} cache keys removed.`, "success");
      })
      .catch(showManagerError);
  };

  const hotelColumns = useMemo(() => [
    { Header: "Hotel", accessor: "hotel_name" },
    { Header: "Zone", accessor: "zone" },
    {
      Header: "Active",
      accessor: "active",
      Cell: (cell) => yesNo(cell.value),
    },
    {
      Header: "Action",
      id: "hotel-action",
      Cell: (cell) => (
        <button type="button" className="btn btn-link p-0" onClick={() => openHotel(cell.row.original)}>
          <i className="mdi mdi-pencil-outline font-size-18 text-paradise" />
        </button>
      ),
    },
  ], []);

  const airlineColumns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    { Header: "Name", accessor: "name" },
    { Header: "Airport", accessor: "airport" },
    {
      Header: "Active",
      accessor: "active",
      Cell: (cell) => yesNo(cell.value),
    },
    {
      Header: "Action",
      id: "airline-action",
      Cell: (cell) => (
        <button type="button" className="btn btn-link p-0" onClick={() => openAirline(cell.row.original)}>
          <i className="mdi mdi-pencil-outline font-size-18 text-paradise" />
        </button>
      ),
    },
  ], []);

  const title = payload && payload.form ? payload.form.label : `${webCode} · ${type}`;

  return (
    <ManagerPage title="AIRPORT TRANSFERS">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/manager/airport-transfers">All forms</Link>
          <h4 className="mb-0 mt-2">{title}</h4>
        </div>
        <Button type="button" className="btn btn-orange" onClick={onClearCache}>
          Clear cache
        </Button>
      </div>
      {loading || !payload ? (
        <p>Loading...</p>
      ) : (
        <>
          <h4 className="mt-2">Hotels</h4>
          <TableContainer
            columns={hotelColumns}
            data={payload.hotels || []}
            isGlobalFilter={true}
            managerTable={true}
            managerAddLabel="Add hotel"
            managerSearchId="hotel-search"
            onClickAddManager={() => openHotel(null)}
          />
          <h4 className="mt-4">Airlines</h4>
          <TableContainer
            columns={airlineColumns}
            data={payload.airlines || []}
            isGlobalFilter={true}
            managerTable={true}
            managerAddLabel="Add airline"
            managerSearchId="airline-search"
            onClickAddManager={() => openAirline(null)}
          />
        </>
      )}

      <Modal isOpen={hotelModal} toggle={() => setHotelModal(false)} size="lg">
        <ModalHeader toggle={() => setHotelModal(false)}>
          {editingHotelId ? "Edit hotel" : "Add hotel"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={saveHotel}>
            <Label>Hotel name</Label>
            <Input className="mb-3" value={hotelForm.hotel_name} onChange={(event) => setHotelForm({ ...hotelForm, hotel_name: event.target.value })} />
            <Label>Zone</Label>
            <Input type="select" className="mb-3" value={hotelForm.city_zone_id} onChange={(event) => setHotelForm({ ...hotelForm, city_zone_id: event.target.value })}>
              <option value="">Select zone</option>
              {(payload && payload.zones ? payload.zones : []).map((zone) => (
                <option key={zone.id} value={zone.id}>{zone.zone}</option>
              ))}
            </Input>
            <Row>
              <Col md="4">
                <Label>Round trip</Label>
                <Input type="select" className="mb-3" value={hotelForm.round_trip} onChange={(event) => setHotelForm({ ...hotelForm, round_trip: event.target.value })}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Input>
              </Col>
              <Col md="4">
                <Label>Arrival</Label>
                <Input type="select" className="mb-3" value={hotelForm.arrival} onChange={(event) => setHotelForm({ ...hotelForm, arrival: event.target.value })}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Input>
              </Col>
              <Col md="4">
                <Label>Departure</Label>
                <Input type="select" className="mb-3" value={hotelForm.departure} onChange={(event) => setHotelForm({ ...hotelForm, departure: event.target.value })}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Input>
              </Col>
            </Row>
            <Label>Active</Label>
            <Input type="select" className="mb-3" value={hotelForm.active} onChange={(event) => setHotelForm({ ...hotelForm, active: event.target.value })}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </Input>
            <Label>Airport</Label>
            <Input className="mb-3" value={hotelForm.airport} onChange={(event) => setHotelForm({ ...hotelForm, airport: event.target.value })} />
            <Label>Comments</Label>
            <Input className="mb-3" value={hotelForm.comments} onChange={(event) => setHotelForm({ ...hotelForm, comments: event.target.value })} />
            {showsCozumel ? (
              <Row>
                <Col md="6">
                  <Label>Cozumel zone</Label>
                  <Input type="select" className="mb-3" value={hotelForm.coz_zone} onChange={(event) => setHotelForm({ ...hotelForm, coz_zone: event.target.value })}>
                    <option value="">—</option>
                    {(payload.coz_zone_options || []).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Input>
                </Col>
                <Col md="6">
                  <Label>Cancun zone</Label>
                  <Input type="select" className="mb-3" value={hotelForm.cn_zone} onChange={(event) => setHotelForm({ ...hotelForm, cn_zone: event.target.value })}>
                    <option value="">—</option>
                    {(payload.cn_zone_options || []).map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </Input>
                </Col>
              </Row>
            ) : null}
            <Button type="submit" className="btn btn-orange" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={airlineModal} toggle={() => setAirlineModal(false)} size="lg">
        <ModalHeader toggle={() => setAirlineModal(false)}>
          {editingAirlineId ? "Edit airline" : "Add airline"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={saveAirline}>
            <Row>
              <Col md="4">
                <Label>Code</Label>
                <Input className="mb-3" maxLength={3} value={airlineForm.code} onChange={(event) => setAirlineForm({ ...airlineForm, code: event.target.value })} />
              </Col>
              <Col md="8">
                <Label>Name</Label>
                <Input className="mb-3" value={airlineForm.name} onChange={(event) => setAirlineForm({ ...airlineForm, name: event.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label>Country code</Label>
                <Input className="mb-3" maxLength={3} value={airlineForm.country_code} onChange={(event) => setAirlineForm({ ...airlineForm, country_code: event.target.value })} />
              </Col>
              <Col md="8">
                <Label>Country name</Label>
                <Input className="mb-3" value={airlineForm.country_name} onChange={(event) => setAirlineForm({ ...airlineForm, country_name: event.target.value })} />
              </Col>
            </Row>
            <Label>Domestic flight</Label>
            <Input type="select" className="mb-3" value={airlineForm.domestic_flight} onChange={(event) => setAirlineForm({ ...airlineForm, domestic_flight: event.target.value })}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Input>
            <Label>Airport</Label>
            <Input className="mb-3" value={airlineForm.airport} onChange={(event) => setAirlineForm({ ...airlineForm, airport: event.target.value })} />
            <Label>Active</Label>
            <Input type="select" className="mb-3" value={airlineForm.active} onChange={(event) => setAirlineForm({ ...airlineForm, active: event.target.value })}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </Input>
            <Button type="submit" className="btn btn-orange" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </ManagerPage>
  );
};

export default AirportTransferForm;
