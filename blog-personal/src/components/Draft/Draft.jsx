import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Draft.css';

const Draft = ({ content, setContent }) => {
  const [editorState, setEditorState] = useState(
    content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);

    const contentState = state.getCurrentContent();
    const contentRaw = convertToRaw(contentState);

    const contentJson = JSON.stringify(contentRaw);
    setContent(contentJson);
  };

  return (
    <div className="text-editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="text-editor-wrapper"
        editorClassName="text-editor-content"
      />
    </div>
  );
};

export default Draft;
