import React, { useEffect, useState } from "react";
import { triggerUpdate, bulkUpdate } from "../../../../Utils/API/Tours";
import { Row, Modal, Button, Table } from "reactstrap";
import Swal from "sweetalert2";

const BulkEditModal = ({
  bulkEditModal,
  setBulkEditModal,
  pricesData,
  refreshTable,
  tourData,
}) => {
  console.log(pricesData);
  let preciosIniciales = [];
  pricesData?.forEach((element) => {
    preciosIniciales.push({
      id: element.id,
      label: element.label,
      sku: element.sku,
      public: element.public,
      rate: element.rate,
      // net_rate: element.net_rate,
      price: element.price,
      you_save: element.you_save,
      commission: element.commission,
      deposit: element.deposit,
      net_price: element.net_price,
    });
  });

  const initialData = () =>{
    let preciosIniciales = [];
    pricesData?.forEach((element) => {
      preciosIniciales.push({
        id: element.id,
        label: element.label,
        sku: element.sku,
        public: element.public,
        rate: element.rate,
        // net_rate: element.net_rate,
        price: element.price,
        you_save: element.you_save,
        commission: element.commission,
        deposit: element.deposit,
        net_price: element.net_price,
      });
    });
    return preciosIniciales
  }

  const [values, setValues] = useState(preciosIniciales);
  useEffect(() => {
    if (preciosIniciales.length > 0) {
      setValues(preciosIniciales);
    }
  }, [pricesData]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index][name] = value;
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let data = { items: values };

    bulkUpdate(tourData.id, data)
      .then((resp) => {
        if (resp.data.status === 200) {
          triggerUpdate();
          Swal.fire("Success!", "Prices has been edited", "success").then(
            () => {
              // setEditOverriteDate(false);
              refreshTable();
            }
          );
        }
      })
      .catch((error) => {
        let errorMessages = [];
        Object.entries(error.response.data.data).map((item) => {
          errorMessages.push(item[1]);
        });

        Swal.fire(
          "Error!",
          // {error.response.},
          String(errorMessages[0])
        );
      });

    // Aquí puedes realizar cualquier otra lógica con los valores del formulario
    refreshTable()
    initialData()
  };
  return (
    <>
      <Modal
        size="xl"
        style={{ maxWidth: "1700px", width: "100%" }}
        isOpen={bulkEditModal}
        // toggle={() => {
        //   setBulkEditModal(!bulkEditModal);
        // }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#3DC7F4", border: "none" }}
        >
          <h1 className="modal-title mt-0 text-white">
            {" "}
            Add Ons Instructions Set Up
          </h1>
          <button
            onClick={() => {
              setBulkEditModal(false);
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <Row className="row-12">
              <section className="table-responsive border-top mb-5">
                {values.length > 0 && (
                  <Table className="table table-bordered mb-0">
                    <thead>
                      <tr>
                        {Object.keys(preciosIniciales[0]).map((campo) => {
                          if (campo !== "id") {
                            if (campo === "label") {
                              return (
                                <th key={campo}>
                                  <h2 className="text-paradise font-bold">
                                    Products
                                  </h2>
                                </th>
                              );
                            } else {
                              return (
                                <th key={campo}>
                                  {campo === "sku"
                                    ? "SKU"
                                    : campo === "public"
                                    ? "Reg. Price"
                                    : campo === "price"
                                    ? "Our Price"
                                    : campo === "you_save"
                                    ? "Save"
                                    : campo === "rate"
                                    ? "Rate %"
                                    : campo === "commission"
                                    ? "Comm."
                                    : campo === "deposit"
                                    ? "Deposit"
                                    : campo === "net_price"
                                    ? "Net Price"
                                    : campo}
                                </th>
                              );
                            }
                          } else {
                            return null;
                          }
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {values.map((objeto, index) => (
                        <tr key={index}>
                          {Object.keys(objeto).map((campo) => {
                            // Excluimos el campo "id" de las celdas de la tabla

                            if (campo !== "id") {
                              return (
                                <td key={campo}>
                                  {campo === "label" ? (
                                    <div>{values[index][campo]}</div>
                                  ) : null}
                                  {campo !== "sku" && campo !== "label" ? (
                                    <input
                                      type="text"
                                      name={campo}
                                      value={values[index][campo]}
                                      onChange={(e) => handleChange(index, e)}
                                      className="form-control"
                                      style={{ width: "90px" }}
                                    />
                                  ) : (
                                    <>
                                      {campo !== "label" && (
                                        <input
                                          type="text"
                                          name={campo}
                                          value={values[index][campo]}
                                          onChange={(e) =>
                                            handleChange(index, e)
                                          }
                                          className="form-control w-auto"
                                        />
                                      )}
                                    </>
                                  )}
                                </td>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </section>
            </Row>

            <Row className="row-12 d-flex justify-content-end mt-3">
              <Button type="submit" className="font-16 btn-orange col-1 mx-3">
                {" "}
                Save 
              </Button>
              <Button type="submit" className="font-16 btn-orange col-1 mx-3" onClick={() => setBulkEditModal(false)}>
                {" "}
                Save and Close
              </Button>
            </Row>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default BulkEditModal;
