import React from 'react';
import LiveSearch from './LiveSearch';

const DataTable = (props) => {
  const { name, data, columns, numOfPage, currentPage, onPageChange, onChangeItemPerPage, onKeySearch } = props;
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
      <li key="prev" className={prevPage ? 'page-item' : 'page-item disabled'}>
        <button onClick={() => onPageChange(prevPage)} className='page-link'>&laquo;</button>
      </li>
    )

    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li key={i} className={currentPage === i ? 'page-item active' : 'page-item'}>
          <button onClick={() => onPageChange(i)} className='page-link'>{i}</button>
        </li>
      )
    }

    pagination.push(
      <li key='next' className={nextPage ? 'page-item' : 'page-item disabled'}>
        <button onClick={() => onPageChange(nextPage)} className='page-link'>&raquo;</button>
      </li>
    )
    return pagination;
  }

  const onchangeOption = (e) => {
    const target = e.target;
    onChangeItemPerPage(target.value);
  }

  return (
    <div className="card mb-3">
      <div className="card-header mb-3">
        <i className="fas fa-table me-1"></i>
        {name}
      </div>
      <div className="card-body">
        <div className="row d-flex">
          <div className="col-sm-6 col-md-6">
            <label className='d-inline-flex'>Show
              <select name="example_length" className="form-select form-select-sm ms-1 me-1" onChange={onchangeOption}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select> entries
            </label>
          </div>
          <div className="col-sm-6 col-md-6">
            <label className='d-inline-flex float-end'>Search:
              <LiveSearch onKeySearch={onKeySearch} />
            </label>
          </div>
        </div>
      </div>
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
      {numOfPage > 1 && (
        <nav className='text-center justify-center items-center d-flex' aria-label="...">
          <ul className="pagination mx-auto d-flex">
            {renderPagination()}
          </ul>
        </nav>
      )}
      {/* pagination */}
    </div>
  );
};

export default DataTable;