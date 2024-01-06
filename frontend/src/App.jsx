import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddFriend from './components/AddFriend';
// import FriendList from './components/FriendList';
// import UpdateFriend from './components/UpdateFriend'

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route
          path='/'
          element={
            <AuthenticatedRoute>
              <AddFriend />
            </AuthenticatedRoute>
          }
        />

        {/* <AuthenticatedRoute path='/' element={FriendList} /> */}
        {/* <AuthenticatedRoute path='/' element={UpdateFriend} /> */}
      </Routes>
    </Router>
  );
}

export default App;
