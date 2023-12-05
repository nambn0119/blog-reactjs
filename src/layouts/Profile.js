import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import * as actions from '../redux/actions';
import requestApi from '../helpers/api';
import { toast } from 'react-toastify';


const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isSelectedFile, setSelectedFile] = useState(false);
  const noAvatar = 'https://realist-app-image.s3.amazonaws.com/no-avatar.jpg';

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi('/users/profile', 'GET').then((res) => {
      console.log(res);
      setProfileData({ ...res.data, avatar: res.data.avatar })
      dispatch(actions.controlLoading(false));
    }).catch((err) => {
      console.log(err);
      dispatch(actions.controlLoading(false));
    })
  }, []);

  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();

      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
          file: file
        })
        setSelectedFile(true);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleUpdateAvatar = () => {
    let formData = new FormData();
    formData.append('avatar', profileData.file);

    dispatch(actions.controlLoading(true));
    requestApi('/users/upload-avatar', 'POST', formData, 'json', 'multipart/form-data').then((res) => {
      console.log(res);
      dispatch(actions.controlLoading(false));
      toast.success('Upload image successfuly');
    }).catch(err => {
      console.log(err);
      dispatch(actions.controlLoading(false));
      toast.success('Upload image failed');
    })

  }

  return (
    <div id='layoutSidenav_content'>
      <main>
        <div className="container-fluid px-4">
          <div className="mt-4">Profile</div>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to={'/'}>Dashboard</Link></li>
            <li className="breadcrumb-item">Update avatar</li>
          </ol>
          <div className="card mb-4">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <img src={profileData.avatar ? profileData.avatar : noAvatar} className='img-thumbnail rounded mb-2' alt="" />
                  <div className="input-file float-start">
                    <label htmlFor="file" className='btn-file btn-sm btn btn-primary'>Browse Files</label>
                    <input onChange={onImageChange} className='d-none' id='file' type="file" accept='image/*' />
                  </div>
                  {isSelectedFile && <button onClick={handleUpdateAvatar} className='btn btn-sm btn-success float-end'>Update</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;