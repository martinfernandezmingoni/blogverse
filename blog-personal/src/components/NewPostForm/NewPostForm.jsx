  import React, { useState, useEffect } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import './NewPostForm.css';
  import Draft from '../Draft/Draft';


  const NewPostForm = () => {
    const { postId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
      if (postId) {
        fetch(`http://localhost:5000/post/${postId}`)
          .then((response) => response.json())
          .then((data) => {
            setTitle(data.title);
            setContent(data.content);
            setAuthor(data.author);
          })
          .catch((error) => console.error('Error al obtener la publicacion'));
      }
    }, [postId]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors  = {}
      if(!title.trim()) {
        newErrors.title = 'El titulo es obligatorio'
      } 
      if(!content.trim()){
        newErrors.content = 'El contenido es obligatorio'
      }

      if(Object.keys(newErrors).length > 0){
        setErrors(newErrors)
        return
      }

      try {
        let response;

        if (postId) {
          response = await fetch(`http://localhost:5000/post/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author }),
          });
        } else {
          response = await fetch('http://localhost:5000/post/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author }),
          });
        }
        if (!response.ok) {
          throw new Error('Error al crear publicacion');
        }

        navigate('/todos');
      } catch (error) {
        console.error('Error al guardar publicacion', error.message);
      }
    };

    return (
      <form onSubmit={handleSubmit}>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mt-4">Crea tu Blog</h2>
              <div className="mb-3 d-flex align-items-center">
                <label htmlFor="titulo" className="form-label me-3">
                  Título
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-valid' : ''}`}
                  id="titulo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <label htmlFor="autor" className="form-label me-3">
                  Autor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="autor"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-editor-container">
                <Draft content={content} setContent={setContent} />
              </div>
              {errors.content && <div className='invalid-feedback'>{errors.content}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary mt-3 float-end">
                Crear Publicación
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  export default NewPostForm;
