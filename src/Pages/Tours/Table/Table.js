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
  Input,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip,
} from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  toursTable,
  onClickFilter,
  onClickRemoveFilter,
  setBulkModal,
  isFiltered,
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

  // const onChangeInSelect = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
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
          <div
            className="search-box me-2 mb-2 d-flex"
            style={{ minWidth: "342px" }}
          >
            <div className="position-relative col-10">
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
              <i className="bx bx-search search-icon"></i>
              
            </div>

            {isFiltered ? (
              <div 
              style={{ marginTop: "5px" }}
              >
                <i
                  className="mdi mdi-filter-remove-outline"
                  outline
                  style={{
                    fontSize: "26px",
                    marginLeft: "10px",
                    
                    color: "#3DC7F4",
                    cursor: "pointer",
                  }}
                  /* className="waves-effect waves-light mb-3 ml-1" */
                  onClick={() => onClickRemoveFilter()}
                />
              </div>
            ) : (
              <div 
              style={{ marginTop: "5px" }}
              >
                <i
                  className="mdi mdi-filter-outline"
                  outline
                  style={{
                    fontSize: "26px",
                    marginLeft: "10px",
                    color: "#CED4DA",
                    cursor: "pointer",
                  }}
                  /* className="waves-effect waves-light mb-3 ml-1" */
                  onClick={() => onClickFilter()}
                />
              </div>
            )}

            <div 
            style={{ marginTop: "9px" }}
            >
              <i
                className="bx bx-download"
                outline
                style={{
                  fontSize: "30px",
                  marginLeft: "10px",
                  color: "#CED4DA",
                  cursor: "pointer",
                }}
                /* className="waves-effect waves-light mb-3 ml-1" */
                onClick={() => onClickRemoveFilter()}
              />
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }

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

            {toursTable && (
              <Col sm="8">
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
                        className="uil uil-edit-alt "
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
                      {!isFiltered ? 
                      <UncontrolledTooltip placement="top" target="bulkedit">
                      Use filters to Bulk Edit.
                      </UncontrolledTooltip>
                      
                      : null}
                    </div>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          {toursTable && (
            <div className="table-responsive" style={{ minHeight: "503px" }}>
              <Table hover {...getTableProps()} className="react_table" >
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
