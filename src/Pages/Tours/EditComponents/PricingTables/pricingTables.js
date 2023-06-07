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
import { Link } from "react-router-dom";

const PricingTables = ({
  columns,
  data,
  productsTable,
  addonsTable,
  onClickNewProduct,
  onClickNewAddon,
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
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  return (
    <Fragment>

      {productsTable && (
        <Col sm="12" className="">
          <div className="text-sm-end">
            <Button
              type="button"
              
              className="waves-effect waves-light mb-3 btn btn-orange"
              onClick={onClickNewProduct}
            >
              <i className="mdi mdi-plus me-1" />
              New Product
            </Button>
          </div>
        </Col>
      )}
    
      {productsTable && (
        <div className="table-responsive">
          <Table bordered hover {...getTableProps()} className="react_table">
            <thead className="table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.id}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
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
     

      <div className="d-flex justify-content-md-end justify-content-center align-items-center col-12">
        
          <div className="btn-group" role="group">
          <Button
                className="btn btn-orange" 
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </Button>
              <Button
                // color="primary"
                className="btn btn-orange"
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                {"<"}
              </Button>
          
          <div className="d-flex justify-content-center align-items-center input-group">
                <div className="input-group-text rounded-0 border-start-0">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
              </div>
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
          </div>
          
            <Button
              className="btn-orange"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              // color="primary"
              className="btn-orange"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        
      </div>
    </Fragment>
  );
};

export default PricingTables;
