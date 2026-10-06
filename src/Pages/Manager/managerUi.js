import { Container } from "reactstrap";
import Swal from "sweetalert2";

export const managerErrorMessage = (error) => {
  const body = error && error.response && error.response.data;
  if (!body) {
    return "Request failed";
  }
  const details = body.data;
  if (details && typeof details === "object" && !Array.isArray(details)) {
    const firstKey = Object.keys(details)[0];
    const first = details[firstKey];
    if (Array.isArray(first) && first.length) {
      return String(first[0]);
    }
    if (typeof first === "string") {
      return first;
    }
  }
  return body.message || "Request failed";
};

export const showManagerError = (error) => {
  Swal.fire("Error", managerErrorMessage(error), "error");
};

export const copyValue = (value) => {
  const text = String(value);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire("Copied", text, "success");
    });
    return;
  }
  Swal.fire("data-id", text, "info");
};

export const ManagerPage = ({ title, children }) => (
  <div className="page-content pb-0 px-3">
    <Container fluid>
      <div className="mx-1">
        <h1 className="fw-bold" style={{ color: "#3DC7F4", fontSize: "3.5rem" }}>
          {title}
        </h1>
      </div>
      {children}
    </Container>
    <div className="content-footer pt-2 px-4 mt-4 mx-4">
      <p>{new Date().getFullYear()} © JS Tour & Travel</p>
    </div>
  </div>
);

export const IdResult = ({ label, value, extra }) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <div className="alert alert-success d-flex align-items-center justify-content-between mt-3">
      <div>
        <div className="text-muted">{label}</div>
        <div className="fw-bold" style={{ fontSize: "1.75rem", color: "#3DC7F4" }}>
          {value}
        </div>
      </div>
      <div className="d-flex align-items-center">
        {extra}
        <button type="button" className="btn btn-orange" onClick={() => copyValue(value)}>
          Copy
        </button>
      </div>
    </div>
  );
};
