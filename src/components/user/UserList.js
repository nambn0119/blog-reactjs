import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import DataTable from '../common/DataTable'

const UserList = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [numOfPage, setNumOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);
    const [searchSring, setSearchSring] = useState('');

    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        {
            name: "First name",
            element: row => row.first_name
        },
        {
            name: "Last name",
            element: row => row.last_name
        },
        {
            name: "Email",
            element: row => row.email
        },
        {
            name: "Created at",
            element: row => row.created_at
        },
        {
            name: "Updated at",
            element: row => row.updated_at
        },
        {
            name: "Actions",
            element: row => (
                <>
                    <button type="button" className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> Edit</button>
                    <button type="button" className="btn btn-sm btn-danger me-1" onClick={null}><i className="fa fa-trash"></i> Delete</button>
                </>
            )
        }
    ];

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        let query = `?item_per_page=${ itemPerPage }&page=${ currentPage }&search=${ searchSring }`;
        requestApi(`/users${ query }`, 'GET', []).then((res) => {
            console.log(res);
            setUsers(res.data.data)
            setCurrentPage(res.data.currentPage);
            setNumOfPage(res.data.lastPage);
            dispatch(actions.controlLoading(false));
        }).catch((err) => {
            dispatch(actions.controlLoading(false));
            console.log(err);
        })
    }, [currentPage, itemPerPage, searchSring]);
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Tables</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tables</li>
                    </ol>
                    <DataTable
                        name='List Users'
                        data={users}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemPerPage={setItemPerPage}
                        onKeySearch={(keyword) => { setSearchSring(keyword) }}
                    />

                </div>
            </main>
        </div>
    );
};

export default UserList;