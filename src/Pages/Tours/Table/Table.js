import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
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
  Input,
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

//switch
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
        fontWeight: 600
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
        fontWeight: 600
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
  toursTable,
  onClickFilter,
  onClickRemoveFilter,
  setBulkModal,
  isFiltered,
  onSubmitFilters,
  activeTourToogle,
  switch1,
  setswitch1
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

    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
      autoResetPage: false,
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

  const [value, setValue] = useState("");

  return (
    <Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row className="mb-0">
            <Col lg={7} className="d-flex">
              <div className="form-outline mb-4 col-4">
                <Input
                  name="search"
                  placeholder="Search"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <i
                className="bx bx-search-alt-2 ico-hover-orange"
                id="search"
                style={{
                  fontSize: "35px",
                  color: "#3DC7F4",
                  margin: "5px",
                  cursor: "pointer",
                }}
                onClick={() => onSubmitFilters({ search: value })}
              ></i>
              <UncontrolledTooltip placement="top" target="search">
                Submit
              </UncontrolledTooltip>
              <div
                className="search-box  d-flex"
                style={{ minWidth: "342px", marginTop: "-5px" }}
              >
                {isFiltered ? (
                  <>
                    <i
                      className="mdi mdi-filter-remove-outline ico-hover-orange"
                      id="remove"
                      outline
                      style={{
                        fontSize: "35px",
                        color: "#3DC7F4",
                        cursor: "pointer",
                      }}
                      /* className="waves-effect waves-light mb-3 ml-1" */
                      onClick={() => onClickRemoveFilter()}
                    />
                    <UncontrolledTooltip placement="top" target="remove">
                      Clear Filters
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <div>
                    <i
                      className="mdi mdi-filter-outline ico-hover-orange"
                      id="filter"
                      outline
                      style={{
                        fontSize: "35px",
                        color: "#CED4DA",
                        cursor: "pointer",
                      }}
                      /* className="waves-effect waves-light mb-3 ml-1" */
                      onClick={() => onClickFilter()}
                    />
                    <UncontrolledTooltip placement="top" target="filter">
                      Filters
                    </UncontrolledTooltip>
                  </div>
                )}

                <div
                  id="export"
                  style={{ marginTop: "9px", cursor: "pointer" }}
                >
                  <>
                    <i
                      className="bx bx-download ico-hover-orange"
                      outline
                      style={{
                        fontSize: "35px",
                        marginLeft: "10px",
                        color: "#CED4DA",
                        cursor: "pointer",
                      }}
                      /* className="waves-effect waves-light mb-3 ml-1" */
                      onClick={() => onClickRemoveFilter()}
                    />
                    <UncontrolledTooltip placement="top" target="export">
                      Export Data
                    </UncontrolledTooltip>
                  </>
                </div>
                <div
                  id="active_tour"
                  style={{ marginTop: "12px", marginLeft: '10px', cursor: "pointer" }}
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
                        Show All Tours
                      </UncontrolledTooltip> :
                      <UncontrolledTooltip placement="top" target="active_tour">
                        Show Active
                      </UncontrolledTooltip>
                    }

                  </>
                </div>
              </div>
            </Col>
            {toursTable && (
              <Col lg={5}>
                <div className="text-sm-end">
                  <div className="d-flex flex-row-reverse">
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
                    <div style={{ marginTop: "5px" }}>
                      <i
                        className="uil uil-edit-alt ico-hover-orange"
                        id="bulkedit"
                        outline
                        style={{
                          fontSize: "26px",
                          marginRight: "10px",
                          color: isFiltered ? "#3DC7F4" : "#CED4DA",
                          cursor: "pointer",
                        }}
                        /* className="waves-effect waves-light mb-3 ml-1" */
                        onClick={() =>
                          isFiltered ? setBulkModal(true) : setBulkModal(false)
                        }
                      />
                      {isFiltered ? (
                        <UncontrolledTooltip placement="top" target="bulkedit">
                          Bulk Edit
                        </UncontrolledTooltip>
                      ) : <UncontrolledTooltip placement="top" target="bulkedit">
                        Use filters to Bulk Edit
                      </UncontrolledTooltip>}
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
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

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
