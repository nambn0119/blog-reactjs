import React from 'react';

const DataTable = (props) => {
  const { name, data, columns, numOfPage, currentPage } = props;
  const renderHeader = () => {
    return columns.map((col, index) => <th key={index} scope="col">{col.name}</th>)
  }

  const renderData = () => {
    return (
      data.map((item, index) => (
        <tr key={index}>
          {
            columns.map((col, ind) => (
              <td key={ind}>{col.element(item)}</td>
            ))
          }
        </tr>
      ))
    )
  }

  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

    pagination.push(
      <li key="prev" className='page-item'>
        <button className='page-link'>&laquo;</button>
      </li>
    )

    for (let i = 0; i < numOfPage; i++) {
      pagination.push(
        <li key={i} className='page-item'>
          <button className='page-link'>{i}</button>
        </li>
      )
    }

    pagination.push(
      <li key='next' className='page-item'>
        <button className='page-link'>&laquo;</button>
      </li>
    )
    return pagination;
  }

  return (
    <div className="card mb-4">
      {/* table */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {renderHeader()}
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
        <tfoot>
          <tr>
            {renderHeader()}
          </tr>
        </tfoot>
      </table>
      {/* pagination */}
      <nav className='text-center justify-center items-center d-flex' aria-label="...">
        <ul className="pagination mx-auto d-flex">
          {renderPagination()}
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;