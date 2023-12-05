import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import DataTable from '../common/DataTable';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const UserList = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [numOfPage, setNumOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(1);
    const [searchSring, setSearchSring] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [deleteItem, setDeleteItem] = useState(null);
    const [deleteType, setDeleteType] = useState('single');
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(Date.now());


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
                    <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row.id)}><i className="fa fa-trash"></i> Delete</button>
                </>
            )
        }
    ];

    const handleDelete = (id) => {
        setDeleteItem(id);
        setShowModal(true);
        setDeleteType('single');
    }

    const handleMultiDelete = () => {
        setShowModal(true);
        setDeleteType('multi');
    }

    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true));
            requestApi(`/users/${ deleteItem }`, 'DELETE', []).then(res => {
                setShowModal(false);
                setRefresh(Date.now());
                toast.success('Delete success');
                dispatch(actions.controlLoading(false));
            }).catch(err => {
                console.log(err);
                setShowModal(false);
                toast.error('Delete fail');
                dispatch(actions.controlLoading(false));
            });
        } else {
            dispatch(actions.controlLoading(true));
            requestApi(`/users/multiple?ids=${ selectedRows.toString() }`, 'DELETE', []).then(res => {
                setShowModal(false);
                setSelectedRows([]);
                setRefresh(Date.now());
                toast.success('Delete success');
                dispatch(actions.controlLoading(false));
            }).catch(err => {
                setShowModal(false);
                toast.error('Delete fail');
                dispatch(actions.controlLoading(false));
            });
        }
    }

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
            console.log(err);
            dispatch(actions.controlLoading(false));
        })
    }, [currentPage, itemPerPage, searchSring, refresh]);
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Tables</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tables</li>
                    </ol>
                    <div className="mb-3">
                        <Link to={'/user/add'} className='btn btn-sm btn-success me-2'><i className='fa fa-plus'></i>Add new</Link>
                        {selectedRows.length > 0 && <button onClick={handleMultiDelete} type='button' className='btn btn-sm btn-danger me-2'><i className="fa fa-trash"></i>Delete</button>}

                    </div>
                    <DataTable
                        name='List Users'
                        data={users}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemPerPage={setItemPerPage}
                        onKeySearch={(keyword) => { setSearchSring(keyword) }}
                        onSelectedRows={rows => {
                            setSelectedRows(rows);
                        }}
                    />

                </div>
            </main>
            <Modal show={showModal} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                    <Button onClick={requestDeleteApi} className='btn-danger'>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;