import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './PostList.css';

const PATH = 'http://localhost:5000/post/post';

const PostList = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch(PATH)
      .then((response) => response.json())
      .then((data) => setPosts(data.message)) // El servidor devuelve la lista de publicaciones en la propiedad "message"
      .catch((error) => console.error('Error al obtener las publicaciones:', error.message));
  }, []);

  

  return (
    <div>
      <h2>Lista de Publicaciones</h2>
      {posts ? (
        
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              <span className="post-title">
                <strong>{post.title}</strong>
                <br />
                <span className="post-author">by {post.author}</span>
              </span>
              <Link className='view-button' to={`/post/${post._id}`}>
                Ver
              </Link>
              <Link className='view-button' to={`/edit/${post._id}`}>
                Editar
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='post-title'>Cargando...</p>
      )      
    }
    </div>
  );
};

export default PostList;
