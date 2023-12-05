import React from 'react';
import { Link } from 'react-router-dom';

const UserAdd = () => {
  return (
    <div id='layoutSidenav_content'>
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">New user</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to={'/'}>Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to={'/users'}>Users</Link></li>
            <li className="breadcrumb-item active">Add new</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-plus me-1"></i>
              Add
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <form>
                  <div className="col-md-6">
                    <div className="mb-3 mt-3">
                      <label className="form-label">First name:</label>
                      <input type="text" className="form-control" placeholder='Enter first name' />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last name:</label>
                      <input type="text" className="form-control" placeholder='Enter last name' />
                    </div>
                    <div className="mb-3 mt-3">
                      <label className="form-label">Email:</label>
                      <input type="text" className="form-control" placeholder='Enter email' />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password:</label>
                      <input type="password" className="form-control" placeholder='Enter password' />
                    </div>
                    <div className="mt-3 mb-3">
                      <label className="form-label">Status:</label>
                      <select className='form-select'>
                        <option value="1">Active</option>
                        <option value="2">InActive</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAdd;