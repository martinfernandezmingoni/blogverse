import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import PostList from './components/PostList/PostList';
import PostDetails from './components/PostDetails/PostDetails';
import NewPostForm from './components/NewPostForm/NewPostForm';
import Navibar from './components/Navbar/NavBar';
import EditPostForm from './components/EditPostForm/EditPostForm'
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/post/post')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error.message);
      });
  }, []);

  return (
    <Router>
      <Navibar />
      <div className="app-container">
        <Routes>
          
        <Route exact path="/" element={<Home />} />
        <Route 
          path="/new" 
          element={<NewPostForm />} 
        />
        <Route
          path="/todos"
          element={<PostList posts={posts}/>} 
        />
        <Route
          path="/post/:postId"
          element={<PostDetails/>}
        />
        <Route 
          path="/edit/:postId" 
          element={<EditPostForm/>} 
        />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
