import { Fragment } from 'react';
import Pagination from "react-js-pagination";

export const DataTable = (props) => {

    let {
        columnData = [],
        rowData = [],
        className = '',
        isLoader = false,
        disabled,
        variant = 'contained',
        materialUi = true,
        pagination = {
            count: 0,
            activePage: 0,
            rangeDisplayed: 10
        },
        paginationChange = () => { },
        children=''
    } = props;

    const handlePageChange = (pageNumber) => {

        if (paginationChange) {
            paginationChange(pageNumber)
        }

        // this.setState({activePage: pageNumber});
    }


    return (
        <Fragment>
            <table className={`table ${className}`}>
                <thead>
                    <tr>
                        {columnData.map(({ label }, i) =>
                            <th key={i}>{label}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                   {children}
                </tbody>
            </table>
            {pagination?.count > 0 && <div className='float-end '>
                <nav className='Page navigation example'>
                <Pagination
                    innerClass="pagination"
                    itemClass="page-item"
                    linkClass='page-link'
                    activePage={pagination.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={pagination.count}
                    pageRangeDisplayed={pagination.rangeDisplayed}
                    onChange={handlePageChange}
                />

                </nav>
              
            </div>}
        </Fragment>
    )

}