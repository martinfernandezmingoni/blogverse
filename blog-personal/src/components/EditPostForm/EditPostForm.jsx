import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPostForm.css'; 
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const PATH = 'http://localhost:5000/post/post';

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty())
  const [isTitleEditing, setIsTitlteEditing] = useState(false)
  const [isAuthorEditing, setIsAuthorEditing] = useState(false)

  useEffect(() => {
    fetch(`${PATH}/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.message)
        setTitle(data.message.title);
        setAuthor(data.message.author);
        
        const contentState = convertFromRaw(JSON.parse(data.message.content));
        setContent(EditorState.createWithContent(contentState));
      })
      .catch((error) => {
        console.error('Error al obtener la publicación:', error.message);
      });
  }, [postId]);

  const handleTitleEditing = () => {
    setIsTitlteEditing(true)
  }
  const handleAuthorEdit = () => {
    setIsAuthorEditing(true)
  }
  const handleSaveChanges = async (e) => {
    try {
      const updatePost = {
        title,
        author,
        content: JSON.stringify(convertToRaw(content.getCurrentContent()))
      }

      const response = await fetch(`${PATH}/${postId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePost)
      })
      if(response.ok) {
        navigate(`/post/${postId}`)
      }else {
        throw new Error ('Error al guardar los cambios')
      }
    } catch (error) {
      console.error('Error al guardar los cambios', error.message)
    }
  }
  return (
    <div className='edit-post-form-container'>
      {post ? (
        <>
          <div className='edit-controls'>
            <h2>
              {isTitleEditing ? (
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                />
              ) : (
                <>
                  {title}{' '}
                  <button className='edit-button' onClick={handleTitleEditing}>
                    Editar
                  </button>
                </>
              )}
            </h2>
            <p className='post-author'>
              {isAuthorEditing ? (
                <input
                  type='text'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              ):(
                <>
                  Author: {author}{' '}
                  <button className='edit-button' onClick={handleAuthorEdit}>
                    Editar
                  </button>
                </>
              )}
            </p>
          </div>
          <Editor editorState={content} onEditorStateChange={setContent} />
          <button className='save-button' onClick={handleSaveChanges}>
            Guardar Cambios
          </button>
        </>  
      ):(
        <p className='"loading-message'>Cargando....</p>
      )}
    </div>
  );
};

export default EditPostForm