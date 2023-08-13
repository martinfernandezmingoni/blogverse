import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useParams } from 'react-router-dom';
import './PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    fetch(`http://localhost:5000/post/post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.message)

        const contentState = convertFromRaw(JSON.parse(data.message.content))
        setContent(EditorState.createWithContent(contentState))
      })
      .catch((error) => {
        console.error('Error al obtener la publicación:', error.message);
      });
  }, [postId]);

  return (
    <div className="post-details-container">
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p className="post-author">Author: {post.author}</p>
          <Editor editorState={content} readOnly />
        </>
      ) : (
        <p className='post-title'>Cargando...</p>
      )}
    </div>
  );
};

export default PostDetails;
