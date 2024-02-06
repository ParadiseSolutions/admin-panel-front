import React, { Fragment } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table, Row, Col,
  Pagination,
  PaginationItem,
  PaginationLink } from "reactstrap";

const PricingTables = ({
  columns,
  data,
  productsTable,
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

  return (
    <Fragment>    
      {productsTable && (
        <div className="table-responsive">
          <Table hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        { generateSortingIndicator(column) }
                      </div>
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
          <div className="d-flex btn-group" role="group">
            <Pagination aria-label="Page navigation example">
              {
                pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                <PaginationItem>
                  <PaginationLink onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}>First</PaginationLink>
                </PaginationItem>
                  ):null
              }
              <PaginationItem>
                <PaginationLink onClick={previousPage}
                disabled={!canPreviousPage}>Previous</PaginationLink>
              </PaginationItem>
              {
                pageIndex >= 3 ? (
                  <PaginationItem>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                ):null
              }
              {
                pageOptions.map((item, index) => {
                  return (
                    <PaginationItem
                    key={index}
                    hidden={pageOptions.length < 4 || (index >= pageIndex - 2 && index <= pageIndex + 2) ? false : true}
                    className={index === pageIndex ? "active" : ""}>
                      <PaginationLink
                       onClick={() => gotoPage(index)}>{index + 1}</PaginationLink>
                    </PaginationItem>
                  )
                })
              }
              {
                pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                  <PaginationItem>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                ):null
              }
              
              <PaginationItem>
                <PaginationLink onClick={nextPage}
                disabled={!canNextPage}>Next</PaginationLink>
              </PaginationItem>
              {
                pageOptions.length >= 4 && pageIndex < pageOptions.length - 1 ? (
                <PaginationItem>
                  <PaginationLink onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}>Last</PaginationLink>
                </PaginationItem>
                ):null
              }
            </Pagination>    
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PricingTables;
