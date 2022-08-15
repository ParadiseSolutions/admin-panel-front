import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  departmentTable,
  rolesTable,
  websitesTable,
  tourTypesTable,
  usersTable,
  cartsTable,
  categoriesTable,
  locationsTable,
  paymentsTable,
  providersTable,
  contactsProvidersTable,
  operatorsTable,
  toursTable,
  productsTour,
  URLTourTable,
  handleUserClicks,
  onClickAddNew,
  onClickAddCategory,
  onClickAddNewWebsite,
  onClickAddNewCart,
  onClickAddTourType,
  onClickAddNewPayment,
  onClickNewProvider,
  onClickNewContactProvider,
  onClickAddLocation,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Row className="mb-3">
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        {departmentTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to="/departments/new">
                <Button
                  type="button"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                  onClick={handleUserClicks}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add New Department
                </Button>
              </Link>
            </div>
          </Col>
        )}

        {rolesTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to="/roles/new">
                <Button
                  type="button"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                  onClick={handleUserClicks}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add New Rol
                </Button>
              </Link>
            </div>
          </Col>
        )}
        {categoriesTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddCategory()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Category
              </Button>
            </div>
          </Col>
        )}

        {locationsTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddLocation()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Location
              </Button>
            </div>
          </Col>
        )}

        {websitesTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddNewWebsite()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Website
              </Button>
            </div>
          </Col>
        )}
        {rolesTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to="/roles/new">
                <Button
                  type="button"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                  onClick={handleUserClicks}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add New Rol
                </Button>
              </Link>
            </div>
          </Col>
        )}

        {usersTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddNew()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New User
              </Button>
            </div>
          </Col>
        )}
        
        {paymentsTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddNewPayment()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Payment
              </Button>
            </div>
          </Col>
        )}

        {tourTypesTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddTourType()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Tour Type
              </Button>
            </div>
          </Col>
        )}

        {usersTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddNew()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New User
              </Button>
            </div>
          </Col>
        )}
        {cartsTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickAddNewCart()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Cart
              </Button>
            </div>
          </Col>
        )}
        {providersTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to={"/providers/new"}>
                <Button
                  type="button"
                  style={{ backgroundColor: "#F6851F", border: "none" }}
                  className="waves-effect waves-light mb-3 btn btn-success"
                  onClick={() => onClickNewProvider()}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add New Provider
                </Button>
              </Link>
            </div>
          </Col>
        )}
        {contactsProvidersTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                onClick={() => onClickNewContactProvider()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Contact
              </Button>
            </div>
          </Col>
        )}
        {operatorsTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to={'/operators/new'}>
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                // onClick={() => onClickNewContactProvider()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Operator
              </Button>
              </Link>
             
            </div>
          </Col>
        )}
        {toursTable && (
          <Col sm="8">
            <div className="text-sm-end">
              <Link to={'/tours/new'}>
              <Button
                type="button"
                style={{ backgroundColor: "#F6851F", border: "none" }}
                className="waves-effect waves-light mb-3 btn btn-success"
                // onClick={() => onClickNewContactProvider()}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Tour
              </Button>
              </Link>
             
            </div>
          </Col>
        )}

        {/* <Col md={1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col> */}
      </Row>

    

      {departmentTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {providersTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {categoriesTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {rolesTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {locationsTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {rolesTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {websitesTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {tourTypesTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {usersTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {cartsTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {paymentsTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {contactsProvidersTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {operatorsTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {productsTour && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {URLTourTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      {toursTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {/* {generateSortingIndicator(column)} */}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell.id} {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              // color="info"
              style={{ backgroundColor: "#3DC7F4", border: "none" }}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              // color="primary"
              style={{ backgroundColor: "#3DC7F4", border: "none" }}
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              style={{ backgroundColor: "#3DC7F4", border: "none" }}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              // color="primary"
              style={{ backgroundColor: "#3DC7F4", border: "none" }}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col sm={4}>
        <div className="search-box me-2 mb-2 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
