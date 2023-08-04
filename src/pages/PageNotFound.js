import image from '../images/404.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createStyles,Container, SimpleGrid, Image, Title, Text, Button, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        border: '5px solid',
        position: 'absolute',
        top: '35%',
        bottom: '65%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px,'
    },

    img: {
        src: image,
    },

    title: {
      fontWeight: 900,
      fontSize: rem(34),
      marginBottom: theme.spacing.md,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(32),
      },
    },
  
    control: {
      [theme.fn.smallerThan('sm')]: {
        width: '100%',
      },
    },
  
    mobileImage: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    desktopImage: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  }));

const NotFoundImage = () => {
const { classes } = useStyles();
  const navigate = useNavigate();
  
  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={handleBackToHome}>
            Get back to home page
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default NotFoundImage;
