import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap-v5";
import DataTable from "react-data-table-component";
import FilterComponent from '@/shared/FilterComponent';
import TableButton from '@/shared/action-buttons/TableButton'
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyComponent from '@/shared/components/empty-component/EmptyComponent';
import { getFormattedMessage } from '@/Helpers/Helpers'
const ReactDataTable = (props) => {
    const { columns, items, isLoading, ButtonValue, isShowSearch, AddButton, isPdf,
        isReportPdf, buttonImport, totalRows,
        importBtnTitle,
        goToImport,
        to,
        defaultLimit = 10,
        paginationRowsPerPageOptions = [10, 15, 25, 50, 100],
        subHeader = true,
        isEXCEL, isShowDateRangeField, isExport, } = props;

    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPages] = useState(defaultLimit);
    const [pageSize, setPageSize] = useState(10);
    const [direction, setDirection] = useState("asc");

    const handleSearch = (searchText) => {
        handlePageChange(1);
        setSearchText(searchText);
    };


    const handlePageChange = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }

        const pagination = document.getElementById("pagination-first-page");
        if (page === 1 && pagination !== null) {
            pagination.click();
        }
    };


    const handlePerRowsChange = async (recordPerPage) => {
        if (perPage !== recordPerPage) {
            setPerPages(recordPerPage);
            setPageSize(recordPerPage);
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: getFormattedMessage(
            "react-data-table.records-per-page.label"
        ),
    };
    const renderSortIcons = () => {
        return (
            <span className='sort-arrow-group'>
                <FontAwesomeIcon icon={faSort} />
            </span>
        );
    };
    const emptyStateProps = {
        isLoading: isLoading,
    };
    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <>
                {isShowSearch ? (
                    ""
                ) : (
                    <FilterComponent handleSearch={handleSearch} />
                )}
                <Col
                    xxl={isShowSearch ? 12 : 8}
                    className="d-flex flex-wrap align-items-start justify-content-end col-12 col-md-9 col-lg-8"
                >
                    {/* FILTER DROPDOWN START */}
                    {/* FILTER DROPDOWN END */}

                    {AddButton}
                    {isPdf ? (
                        <div className="text-end mb-2 ">
                            <Button
                                type="button"
                                variant="primary"
                                href={to}
                                className="me-3 btn-light-primary"
                            >
                                {getFormattedMessage("pdf.btn.label")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isReportPdf ? (
                        <div className="text-end mb-2 ">
                            <Button
                                type="button"
                                variant="primary"
                                className="me-3 btn-light-primary"
                            >
                                {getFormattedMessage("pdf.btn.label")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isEXCEL ? (
                        <div className="text-end mb-2 ">
                            <Button
                                type="button"
                                variant="primary"
                                className="me-3 btn-light-primary"
                            >
                                {" "}
                                {getFormattedMessage("excel.btn.label")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isExport ? (
                        <div className="text-end mb-2 ">
                            <Button
                                type="button"
                                variant="primary"
                                className="me-3 me-md-0 btn-light-primary"
                            >
                                {" "}
                                {getFormattedMessage("product.export.title")}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {isShowDateRangeField ? (
                        <DateRangePicker
                            onDateSelector={onDateSelector}
                            selectDate={selectDate}
                        />
                    ) : null}
                    {buttonImport ? (
                        <div className="text-end mb-2  order-2">
                            <Button
                                variant="primary"
                                className="mx-md-1 me-3  btn-light-primary"
                                onClick={goToImport}
                            >
                                {importBtnTitle
                                    ? getFormattedMessage(importBtnTitle)
                                    : getFormattedMessage(
                                        "product.import.title"
                                    )}
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    {ButtonValue ? (
                        <TableButton ButtonValue={ButtonValue} to={to} />
                    ) : null}
                </Col>

            </>
        );
    }, []);

    return (
        <div className="data-table pt-0">
            {/* 
                onSort={customSort} */}
            <DataTable
                columns={columns}
                data={items}
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead={false}
                pagination={true}
                onChangePage={handlePageChange}
                sortServer
                paginationTotalRows={totalRows}
                paginationServer={true}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                paginationComponentOptions={paginationComponentOptions}
                subHeader={subHeader}
                sortIcon={renderSortIcons(direction)}
                noDataComponent={<EmptyComponent {...emptyStateProps} />}
            />
        </div>
    );
}

export default ReactDataTable;
