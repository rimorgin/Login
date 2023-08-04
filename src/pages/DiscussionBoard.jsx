import React, { useState, useEffect } from 'react';
import Post from '../components/DiscussionBoardComponents/Post/Post';
import PostEditor from '../components/DiscussionBoardComponents/PostEditor/PostEditor';
import { onChildAdded, off, push, ref as rRef, set } from 'firebase/database';
import { database } from '../firebase';
import { AppContext } from '../App';
import { useContext } from 'react';
import { Paper, createStyles, useMantineTheme, Modal, Text } from '@mantine/core';
import { HomeNavBar } from '../components/HorizontalNavBar';
import { useNavigate } from 'react-router';

const useStyles = createStyles((theme) => ({
  body: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5],
    width: '80vw',
    minHeight: '100vh', // Changed from '100dvh' to '100vh'
    maxHeight: 'fit-content',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    transition: 'ease-in-out 500ms' 
  },
  postEditorContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postEditor: {
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    position: 'sticky',
    bottom: '0',
    zIndex: '1',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5],
  },
}))

const DiscussionBoard = () => {
  const {classes} = useStyles();
  const theme = useMantineTheme();
  const databaseRef = rRef(database, 'posts');
  const { loggedInUserName } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const currDate = new Date().toLocaleDateString();
  const currDateTime = new Date().toLocaleTimeString();
  const messageDate = currDateTime + ' ' + currDate;
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if loggedInUserName is empty, and open the modal if it is
    if (loggedInUserName === '') {
      setOpened(true);
    }
  }, [loggedInUserName]);

  const closeModal = () => {
    setOpened(false);
    navigate('/')
  };
  

  useEffect(() => {
    const updateLocalState = (snapshot) => {
      const response = snapshot.val();
      console.log(response);
      // Check if the post already exists in the posts state
      if (!posts.find((post) => JSON.stringify(post) === JSON.stringify(response))) {
        setPosts((prevPosts) => [...prevPosts, response]);
      }
    };
    const handleChildAdded = (snapshot) => {
      updateLocalState(snapshot);
    };

    onChildAdded(databaseRef, handleChildAdded);

    // Clean up the event listener when the component unmounts
    return () => {
      off(databaseRef, 'child_added', handleChildAdded);
    };
  }, [databaseRef, posts]);

  const addPost = (postBody) => {
    const postToSave = { 
      user: {
        displayName: loggedInUserName,
        message: postBody, 
        date: messageDate,
      }
    };
    const newPostRef = push(databaseRef); // Generate a new child reference
    set(newPostRef, postToSave); // Set the post data to the new child reference
  };

  return (
    <div>
      <HomeNavBar/>
      {loggedInUserName === "" && <Modal
        centered
        opened={opened}
        onClose={closeModal}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Text>Logging in to the web page is required before viewing the contents of the discussion board.</Text>
      </Modal>}
      <Paper className={classes.body}>
      <div className={classes.postEditorContainer}>
      {posts.length > 0 &&
        posts.map((post, idx) => <Post key={idx} postBody={post} />)}
        
        <div className={classes.postEditor}> 
          <PostEditor addPost={addPost} />
        </div>
        </div>
      </Paper>
    </div>
  );



};

export default DiscussionBoard;
