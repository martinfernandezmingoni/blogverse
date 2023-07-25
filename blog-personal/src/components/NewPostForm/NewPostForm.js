import React, { useState } from 'react';
import './NewPostForm.css';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar los datos del formulario al servidor
    console.log('Título:', title);
    console.log('Contenido:', content);
    console.log('Autor:', author);
    // Reseteamos los campos del formulario después de enviarlo
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <h2>Nueva Publicación</h2>
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Contenido:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <label>
        Autor:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default NewPostForm;
