import React from 'react';
import './PostDetails.css';
import { useParams } from 'react-router-dom';
import posts from '../../data/data';

const PostDetails = () => {
  const { postId } = useParams();

  const post = posts.find((post) => post.id === Number(postId));

  if (!post) {
    return <div>No se encontró la publicación</div>;
  }

  return (
    <div className="post-details-container">
      <h2>Detalles de la Publicación</h2>
      <h3>{post.title}</h3>
      <p>Autor: {post.author}</p>
      <p>Fecha: {post.date}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetails;

