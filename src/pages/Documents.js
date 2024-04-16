import React, { useState, useEffect, useCallback, useRef } from "react";
import { createStyles, Container, Group, Button, Text, useMantineColorScheme, useMantineTheme, AppShell, Header } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSelector, useDispatch } from "react-redux";
import DirectAccess from "../components/DirectAccess";
import DisplayData from "../components/DisplayData";
import FaceRecognitionWebCam from "../components/FaceRecognitionWebCam";
import RegisterForm from "../components/RegisterForm";
import WebCamera from "../components/Webcam";
import { DataDisplayClose } from "../redux/FaceRecognitionRedux";
import { SideNavContainer } from "../components/SideNavContainer";
import ColorScheme from "../components/ColorScheme";
import LogoHeader from "../components/LogoHeader";
import { useNavigate } from "react-router";
import { AppContext } from "../App";
import { useContext } from "react";
import { SideNavContainerAdmin } from "../components/SideNavContainerAdmin";

const useStyles = createStyles((theme) => ({
  root: {
    fontFamily: "Regular",
    width: "90dvw",
    height: "85dvh",
    borderRadius: `10px`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
    top:-10
  },
  button: {
    transition: "ease-in-out 500ms",
    marginLeft: `${theme.spacing.sm}px`,

    "&:hover": {
      background: theme.colors.blue,
    },
  },
  button2: {
    marginLeft: `${theme.spacing.sm}px`,
    transition: "ease-in-out 500ms",
    width: "180px",

    "&:hover": {
      background: theme.colors.blue,
    },
  },
  group: {
    padding: `0 ${theme.spacing.sm}px`,
  },
  registercontainer: {
    width: "100%",
    height: "85vh",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },
  hidden: {
    display: "none",
  },

  noimage: {
    width: "150px",
    height: "150px",
    border: `1px dashed ${theme.colors.lighttheme[1]}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  app: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appVideo: {
    display: "flex",
    alignItems: "center",
  },
  canvas: {
    position: "absolute",
    top: "100px",
  },
  containernotif: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80vh",
  },
  textnotif: {
    fontFamily: "Bold",
  },
}));

const Documents = () => {
  const { classes, cx } = useStyles();
  const videoRef = useRef();
  const { singlepersondata } = useSelector((state) => state.facerecog);
  const [RegisterButtonClick, setRegisterButtonClick] = useState(false);
  const [FaceRecognitionButtonClick, setFaceRecognitionButtonClick] =
    useState(false);
  const [AccessDocuments, setAccessDocuments] = useState(false);
  const dispatch = useDispatch();
  const {colorScheme} = useMantineColorScheme();
  const theme = useMantineTheme();
  const isLargeScreen = window.innerWidth >= 1024;
  const navigate = useNavigate();
  const {isAdmin, isZLeader} = useContext(AppContext);

  const CloseWebCam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
  };

  const HeaderDashBoard = () => {
    return(
      <Header height={100} color={colorScheme === 'dark' ? 'dark' : 'white'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          <LogoHeader />
          <div>
            {(isAdmin && !isZLeader) ? <SideNavContainerAdmin navigate={navigate} /> : <SideNavContainer navigate={navigate} />}
          </div>
        </div>
        <div>
          {isLargeScreen ? <ColorScheme /> : <div></div>}
        </div>
      </div>
    </Header>
    )
  }

  return (
    <><div><HeaderDashBoard/></div><>
    </><div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", top: '80%', marginTop: '50px' }}>
        <div className={classes.root}>
          <Container fluid="true" pt="lg">
            <Buttons
              setRegisterButtonClick={setRegisterButtonClick}
              RegisterButtonClick={RegisterButtonClick}
              FaceRecognitionButtonClick={FaceRecognitionButtonClick}
              setFaceRecognitionButtonClick={setFaceRecognitionButtonClick}
              AccessDocuments={AccessDocuments}
              setAccessDocuments={setAccessDocuments}
              classes={classes}
              CloseWebCam={CloseWebCam}
              dispatch={dispatch} />
          </Container>
          {RegisterButtonClick && !FaceRecognitionButtonClick && !AccessDocuments && (
            <Container className={classes.registercontainer} fluid="true">
              <Group direction="column">
                <WebCamera videoRef={videoRef} />
              </Group>
              <Group direction="column">
                <RegisterForm />
              </Group>
            </Container>
          )}
          {FaceRecognitionButtonClick && !RegisterButtonClick && !AccessDocuments && (
            <Container className={classes.registercontainer} fluid="true">
              <Group direction="column">
                <FaceRecognitionWebCam
                  videoRef={videoRef}
                  singlepersondata={singlepersondata}
                  CloseWebCam={CloseWebCam} />
              </Group>
              <Group direction="column">
                <DisplayData />
              </Group>
            </Container>
          )}
          {AccessDocuments && !RegisterButtonClick && !FaceRecognitionButtonClick && (
            <Container className={classes.registercontainer} fluid="true">
              <DirectAccess />
            </Container>
          )}
          <Container
            className={cx(classes.containernotif, {
              [classes.hidden]: FaceRecognitionButtonClick ||
                RegisterButtonClick ||
                AccessDocuments,
            })}
            fluid="true"
          >
            <Text className={classes.textnotif} size="md" transform="capitalize">
              Please Press a Button
            </Text>
          </Container>
        </div>
      </div></>
    
  );
};


const Buttons = ({
  classes,
  setRegisterButtonClick,
  RegisterButtonClick,
  FaceRecognitionButtonClick,
  setFaceRecognitionButtonClick,
  CloseWebCam,
  AccessDocuments,
  setAccessDocuments,
  dispatch,
}) => {
  return (
    <Group className={classes.group} direction="row" style={{ zIndex: 1, pointerEvents: 'auto' }}>
      <Button
        variant="gradient"
        size="sm"
        className={classes.button}
        onClick={() => {
          if (!FaceRecognitionButtonClick && !AccessDocuments) {
            setRegisterButtonClick(!RegisterButtonClick);
          }
          RegisterButtonClick && CloseWebCam();
        }}
      >
        {RegisterButtonClick ? "Close" : "Register a Person"}
      </Button>
      <Button
        variant="gradient"
        size="sm"
        className={classes.button2}
        onClick={() => {
          if (!RegisterButtonClick && !AccessDocuments) {
            setFaceRecognitionButtonClick(!FaceRecognitionButtonClick);
          }
          FaceRecognitionButtonClick && CloseWebCam();
        }}  
      >
        {FaceRecognitionButtonClick ? "Close" : "Apply for Documents"}
      </Button>
      <Button
        variant="gradient"
        size="sm"
        className={classes.button}
        onClick={() => {
          if (!RegisterButtonClick && !FaceRecognitionButtonClick) {
            setAccessDocuments(!AccessDocuments);
          }
        }}
      >
        {AccessDocuments ? "Close" : "Direct Access"}
      </Button>
    </Group>

  );
};

export default Documents;
