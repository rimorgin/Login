import React from 'react';
import './Post.css';
import { Paper, Text } from '@mantine/core';

const Post = ({ postBody }) => {

  const { user } = postBody;

  return (

      <Paper className="post-body">
        <Text className='message' fw={400}>{user.displayName}</Text>
        <Text className='message' fw={100}>{user.message}</Text>
        <Text className='messageDate' size={'10px'} fw={400}>{user.date}</Text>
      </Paper>

  );
};

export default Post;
