import React, { useState } from 'react';
import './PostEditor.css';
import { Button, Textarea, Text } from '@mantine/core';

const PostEditor = ({ addPost }) => {
  const [newPostBody, setNewPostBody] = useState('');

  const handlePostEditorInputChange = (ev) => {
    setNewPostBody(ev.target.value);
  };

  const createPost = () => {
    addPost(newPostBody);
    setNewPostBody('');
  };

  return (
    <div className="panel panel-default post-editor">
      <div className="panel-body">
        <Text>post a message</Text>
        <Textarea
          autosize
          className="form-control post-editor-input"
          value={newPostBody}
          onChange={handlePostEditorInputChange}
        />
        <Button variant='gradient' className="btn btn-success post-editor-button" onClick={createPost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
