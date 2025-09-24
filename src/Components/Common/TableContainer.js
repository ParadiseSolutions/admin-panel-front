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
import {
  Table,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
} from "reactstrap";
import { DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";
import Switch from "react-switch";
const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 14,
        color: "#ced4da",
        // width: "200px",
        paddingRight: 13,
        marginTop: "-2px",
        fontWeight: 600,
      }}
    >
      {" "}
      All
    </div>
  );
};

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 14,
        color: "#3dc7f4",
        paddingLeft: 15,
        marginTop: "-2px",
        fontWeight: 600,
      }}
    >
      {" "}
      Active
    </div>
  );
};
const TableContainer = ({
  columns,
  data,
  switch1,
  setswitch1,
  activeTourToogle,
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
  paymentsProvidersTable,
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
  onClickFilter,
  onClickRemoveFilter,
  setBulkModal,
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
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex },
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

  return (
    <Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row className="mb-0">
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
                      className="waves-effect waves-light mb-3 btn btn-orange"
                      onClick={handleUserClicks}
                    >
                      <i className="mdi mdi-plus me-1" />
                      Add New Department
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickAddLocation()}
                  >
                    <i className="mdi mdi-plus me-1"></i>
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickAddNewWebsite()}
                  >
                    + Add New Website
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
                      className="waves-effect waves-light mb-3 btn btn-orange"
                      onClick={handleUserClicks}
                    >
                      <i className="mdi mdi-plus me-1"></i>
                      Add New Role
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickAddTourType()}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add New Tour Type
                  </Button>
                </div>
              </Col>
            )}

            {cartsTable && (
              <Col sm="8">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickAddNewCart()}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add New Cart
                  </Button>
                </div>
              </Col>
            )}
            {providersTable && (
              <Col sm="10">
                <div className="text-sm-end d-flex justify-content-between">
                    <div
                  id="active_tour"
                  className="mt-2"
                  style={{  marginLeft: '10px', cursor: "pointer" }}
                >
                  <>
                    <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      onColor="#3DC7F4"
                      width={90}
                      className={switch1 ? "blue-switch-outlined" : "gray-switch-outlined"}
                      onChange={() => {
                        setswitch1(!switch1);
                        activeTourToogle(switch1)
                      }}
                      checked={switch1}
                    />
                    {switch1 ?
                      <UncontrolledTooltip placement="top" target="active_tour">
                        Show All Providers
                      </UncontrolledTooltip> :
                      <UncontrolledTooltip placement="top" target="active_tour">
                        Show Active
                      </UncontrolledTooltip>
                    }

                  </>
                </div>
                  <Link to={"/providers/new"}>
                    <Button
                      type="button"
                      className="waves-effect waves-light mb-3 btn btn-orange"
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
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickNewContactProvider()}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add New Contact
                  </Button>
                </div>
              </Col>
            )}
            {paymentsProvidersTable && (
              <Col sm="12">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    className="waves-effect waves-light mb-3 btn btn-orange"
                    onClick={() => onClickNewContactProvider()}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add Method
                  </Button>
                </div>
              </Col>
            )}
            {operatorsTable && (
              <Col sm="10">
                <div className="text-sm-end d-flex justify-content-between">
                 <div
                  id="active_tour"
                  className="mt-2"
                  style={{  marginLeft: '10px', cursor: "pointer" }}
                >
                  <>
                    <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      onColor="#3DC7F4"
                      width={90}
                      className={switch1 ? "blue-switch-outlined" : "gray-switch-outlined"}
                      onChange={() => {
                        setswitch1(!switch1);
                        activeTourToogle(switch1)
                      }}
                      checked={switch1}
                    />
                    {switch1 ?
                      <UncontrolledTooltip placement="top" target="active_tour">
                        Show All Operators
                      </UncontrolledTooltip> :
                      <UncontrolledTooltip placement="top" target="active_tour">
                        Show Active
                      </UncontrolledTooltip>
                    }

                  </>
                </div>
                  <Link to={"/operators/new"}>
                    <Button
                      type="button"
                      className="waves-effect waves-light mb-3 btn btn-orange"
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
                  <Button
                    type="button"
                    color="paradiseOrange"
                    outline
                    className="waves-effect waves-light mb-3 "
                    onClick={() => onClickRemoveFilter()}
                  >
                    <i className="bx bx-download" />
                  </Button>
                  <Button
                    type="button"
                    color="paradiseOrange"
                    outline
                    className="waves-effect waves-light mb-3 mx-1"
                    onClick={() => onClickRemoveFilter()}
                  >
                    <i className="mdi mdi-filter-remove-outline " />
                  </Button>
                  <Button
                    type="button"
                    color="paradiseOrange"
                    outline
                    className="waves-effect waves-light mb-3 ml-1"
                    onClick={() => onClickFilter()}
                  >
                    <i className="mdi mdi-filter-outline" />
                  </Button>
                  <Button
                    type="button"
                    color="paradiseOrange"
                    outline
                    className="waves-effect waves-light mb-3 mx-1"
                    onClick={() => setBulkModal(true)}
                  >
                    <i className="uil uil-edit-alt " />
                  </Button>

                  <Link to={"/tours/new"}>
                    <Button
                      type="button"
                      className="waves-effect waves-light mb-3 btn btn-orange"
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
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-departments-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-providers-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, index) => (
                        <th
                          key={index}
                          className={`table-column-categories-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" /*style={{minHeight:"605px"}}*/>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-locations-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" /*style={{minHeight:"605px"}}*/>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "570px" }}>
              <Table hover {...getTableProps()} className="react_table mb-0">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-users-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-shopping-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" /*style={{minHeight:"605px"}}*/>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-payment-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
          {paymentsProvidersTable && (
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <>
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column) => (
                          <>
                          <th
                            key={column.id}
                            /*{...document.write(column.Header)}*/

                            className={`table-column-operator-${column.Header}`}
                          >
                            <div {...column.getSortByToggleProps()}>
                              {column.render("Header")}
                              {generateSortingIndicator(column)}
                            </div>
                            
                            {/* <Filter column={column} /> */}
                          </th>
                          
                          </>
                        ))}
                      </tr>
                      
                    </>
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={column.id}>
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
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
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table">
                <thead className="table-nowrap">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          className={`table-column-tours-${column.Header}`}
                        >
                          <div {...column.getSortByToggleProps()}>
                            {column.render("Header")}
                            {generateSortingIndicator(column)}
                          </div>
                          {/* <Filter column={column} /> */}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Fragment key={index}>
                        <tr>
                          {row.cells.map((cell, index) => {
                            return (
                              <td key={index} {...cell.getCellProps()}>
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
        </CardBody>
      </Card>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex btn-group" role="group">
            <Pagination aria-label="Page navigation example">
              {pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    First
                  </PaginationLink>
                </PaginationItem>
              ) : null}
              <PaginationItem>
                <PaginationLink
                  onClick={previousPage}
                  disabled={!canPreviousPage}
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              {pageIndex >= 3 ? (
                <PaginationItem>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              ) : null}
              {pageOptions.map((item, index) => {
                return (
                  <PaginationItem
                    key={index}
                    hidden={
                      pageOptions.length < 4 ||
                      (index >= pageIndex - 2 && index <= pageIndex + 2)
                        ? false
                        : true
                    }
                    className={index === pageIndex ? "active" : ""}
                  >
                    <PaginationLink onClick={() => gotoPage(index)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                <PaginationItem>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              ) : null}

              <PaginationItem>
                <PaginationLink onClick={nextPage} disabled={!canNextPage}>
                  Next
                </PaginationLink>
              </PaginationItem>
              {pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    Last
                  </PaginationLink>
                </PaginationItem>
              ) : null}
            </Pagination>
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
      <Col sm={2}>
        <div
          className="search-box col-12 me-2 mb-2 d-inline-block"
        >
          <div className="position-relative col-12">
            <label
              htmlFor="search-bar-0"
              className="search-label"
              style={{ width: "100%" }}
            >
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
