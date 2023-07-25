import React from 'react';
import './PostList.css';
import post from '../../data/data'

const PostList = () => {
  return (
    <div className="post-list-container">
      <h2>Lista de Publicaciones</h2>
      <p>Aca vamos a poneer la lista de los blogs que se vayan publicando</p>
      <ul>
        {post.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
