import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/user/UserList';
import UserAdd from './components/user/UserAdd';
import UserUpdate from './components/user/UserUpdate';
import PageNotFound from './components/PageNotFound';
import Profile from './layouts/Profile';
import PostList from './components/post/PostList';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/users' element={<UserList />}></Route>
            <Route path='/user/add' element={<UserAdd />}></Route>
            <Route path='/user/edit/:id' element={<UserUpdate />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/posts' element={<PostList />}></Route>
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
