import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import { Container, Group, Button, createStyles, Input, TextInput } from "@mantine/core";
import Webcam from "react-webcam";
import { Capture, ArrowBack } from "tabler-icons-react";
import FileSaver from "file-saver";
import { useViewportSize } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
const useStyles = createStyles((theme) => ({
  cameracontainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  webcamcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonscontainer: {
    marginTop: `${theme.spacing.xs}px`,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  hidden: {
    display: "none",
  },
  savercontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "2rem",
  },
  registerbutton: {
    marginTop: `${theme.spacing.lg}px`,
    width: "100px",
  },
}));

const videoConstraints = {
    width: 1920,
    height: 1020,
    facingMode: "user"
  };

const WebCamera = ({ videoRef, handleSaveImage }) => {
  const isLargeScreen = window.innerWidth >= 1024;
  const { classes, cx } = useStyles();
  const { width } = useViewportSize();
  const [Image, setImage] = useState("");
  const webcamRef = useRef(null);
  const photoRef = useRef({
    width: 300,
    height: 300
  });
  const [Picname, setPicname] = useState("");
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImage(imageSrc);
  }, [webcamRef]);

 
  const SaveImage = () => {
    if (!Image) {
      showNotification({
        title: "Capture image",
        message: "You forgot to capture image! 🤥",
      });
    } else if (!Picname) {
      showNotification({
        title: "Enter the name",
        message: "You forgot to enter the name! 🤥",
      });
    } else if (Image && Picname) {
      handleSaveImage(Image, Picname);
      showNotification({
        title: "Saved Successfully!",
        message: "Your photo has been saved successfully!",
      });
      FileSaver.saveAs(Image, `${Picname}.jpg`);
    }
  };
  return (
    <Container className={classes.cameracontainer}>
      {Image ? (
        <Container className={classes.webcamcontainer} >
          <img src={Image} width="350px" height="195" alt="capturedImage"></img>
          </Container>
      ) : (
        <Webcam
          audio={false}
          width={350}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      )}
      <Group direction="row" className={classes.buttonscontainer}>
        <Button
          leftIcon={<Capture size={18} strokeWidth={2} />}
          variant="gradient"
          className={cx(classes.buttoncapture, { [classes.hidden]: Image })}
          onClick={capture}
        >
          Capture
        </Button>
        <Button
          leftIcon={<ArrowBack size={18} strokeWidth={2} />}
          variant="gradient"
          onClick={() => setImage(null)}
          className={cx(classes.buttonreset, { [classes.hidden]: !Image })}
        >
          Reset
        </Button>
        <Button variant="gradient" onClick={SaveImage}>
          Save
        </Button>
      </Group>
 
        <Group direction="row" className={classes.buttonscontainer} >
          <TextInput
            placeholder="Picture name"
            radius="md"
            size={isLargeScreen ? 'md' : 'sm'}
            value={Picname}
            variant="filled"
            onChange={(e) => setPicname(e.target.value)}
          ></TextInput>
        </Group>
        <Group direction="row" className={classes.buttonscontainer}>
        
        </Group>
        </Container>
  );
};

export default WebCamera;
