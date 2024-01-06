import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import AuthenticatedRoute from './components/AuthenticatedRoute';

import Navbar from './components/Navbar';
import AddFriend from './components/AddFriend';
// import FriendList from './components/FriendList';
// import UpdateFriend from './components/UpdateFriend'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <AuthenticatedRoute exact path='/' component={AddFriend} />
        {/* <AuthenticatedRoute exact path='/' component={FriendList} /> */}
        {/* <AuthenticatedRoute exact path='/' component={UpdateFriend} /> */}
      </Switch>
    </Router>
  );
}

export default App;
