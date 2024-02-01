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

const AddonsTables = ({
  columns,
  data,
  productsTable,
  addonsTable,
  onClickNewProduct,
  onClickNewAddon,
  onClickInstructions
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
      <Row>
      {addonsTable && (
        <>
        <Col sm="4">
          <h1 className="text-paradise">Add-Ons</h1>
        </Col>  
        <Col sm="8">
          <div className="text-sm-end">
            <Button
              type="button"
              style={{ backgroundColor: "#F6851F", border: "none" }}
              className="waves-effect waves-light mb-3 btn btn-success mt-3 mx-5"
              onClick={() => {
              //console.log('tabla')
                onClickInstructions()
              }}
            >
              <i className="mdi mdi-plus me-1" />
               Set Add-Ons Instructions
            </Button>
            <Button
              type="button"
              style={{ backgroundColor: "#F6851F", border: "none" }}
              className="waves-effect waves-light mb-3 btn btn-success mt-3"
              onClick={onClickNewAddon}
            >
              <i className="mdi mdi-plus me-1" />
              Add New Add-On
            </Button>
          </div>
        </Col>
        </>
      )}

      {addonsTable && (
        <div className="table-responsive">
          <Table hover {...getTableProps()} className="react_table">
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
      </Row>
      
      

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          
        <div className="d-flex btn-group" role="group">
            <Button
              // color="info"
              className="btn-orange"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              // color="primary"
              className="btn-orange"
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
            className="text-center input-group-text bg-white rounded-0"
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
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddonsTables;
