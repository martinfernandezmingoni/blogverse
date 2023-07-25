import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import NewPostForm from './components/NewPostForm/NewPostForm';
import Navibar from './components/Navbar/NavBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navibar />
      <div className="app-container">
        <Routes>
          
          <Route exact path="/" component={Home} />
          <Route path="/new" component={NewPostForm} />
          <Route path="/posts" component={PostList} />
          <Route path="/post/:postId" component={PostDetails} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
