import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import VideoList from './components/VideoList';
import VideoAdd from './components/VideoAdd';
import IdolList from "./components/IdolList"
import IdolAdd from "./components/IdolAdd";
import IdolProfile from './components/IdolProfile';
import GroupList from './components/GroupList';
import GroupProfile from './components/GroupProfile';
import UserForm from './components/UserForm';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/videos" element={<VideoList />} />
        <Route path="/videos/add" element={<VideoAdd />} />
        <Route path="/idols" element={<IdolList />} />
        <Route path="/idols/add" element={<IdolAdd />} />
        <Route path="/idols/:name" element={<IdolProfile />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/groups/:name" element={<GroupProfile />} />
        <Route path="/register" element={<UserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/edit/:username" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
};

export default App;




