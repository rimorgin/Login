import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import date from "date-and-time";
import { Container, TextInput, createStyles } from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/brgy-logo.jpg";
import { useSelector } from "react-redux";
import AdditionInputs from "../components/AdditionInputs";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    borderRadius: `20px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const styles = StyleSheet.create({
  maintitle: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "OpenSans",
    marginTop: 24,
  },
  body: {
    width: "2500px",
    height: "3300px",
    paddingRight: 35,
    background: "transparent",
  },
  title: {
    fontSize: 29,
    fontFamily: "OpenSans",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "ultrabold",
    marginTop: 9,
  },

  text: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
  },

  textregular: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
  },
  clientname: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  container: {
    fontFamily: "Regular",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: `150vh`,
    borderRadius: 20,
  },
  pdfviewer: {
    height: "90vh",
    width: "35vw",
  },
  containerwrapper: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
  },
  leftcontainer: {
    width: 170,
    paddingTop: 100,
  },
  rightcontainer: {
    width: 600,
    paddingTop: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 18,
  },
  mainheader: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  containertext: {
    background: Logo,
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    width: "100%",
    marginTop: 40,
    height: 380,
  },
  receipenttext: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    fontWeight: 900,
    paddingBottom: 38,
  },
  textfirstparag: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    width: "auto",
    lineHeight: 2,
    textAlign: "justify",
  },
  firstcontainer: {
    flexDirection: "row",
    textAlign: "justify",
  },
  marginTopContainer: {
    marginTop: 12,
    textAlign: "justify",
  },

  marginspacing: {
    color: "white",
  },
  formcontainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "80%",
  },
  textlowercase: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "lowercase",
  },
  textCapitalize: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "capitalize",
  },
  textuppercase: {
    fontSize: 10,
    fontFamily: "OpenSans",
    textTransform: "uppercase",
  },
});

Font.register({
  family: "OpenSans",
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: 900 },
    { src: LucidaCalligraphy, fontStyle: "italic", fontWeight: "ultrabold" },
  ],
});

const CertificationStrandedDirect = () => {
  const { classes } = useStyles();
  const singleperson = useSelector((state) => state.facerecog.singlepersondata);
  const [ClientAge, setClientAge] = useState("");
  const [LocationBack, setLocationBack] = useState("");
  const [Agency, setAgency] = useState("");
  const [ClientName, setClientName] = useState("");
  const [ClientSex, setClientSex] = useState("");
  const [ClientCivilStatus, setClientCivilStatus] = useState("");
  const [ClientCitizenship, setClientCitizenship] = useState("");
  const [ClientAddress, setClientAddress] = useState("");

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>
        Certification Stranded Senior Citizen
      </Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              singleperson={singleperson}
              ClientAge={ClientAge}
              LocationBack={LocationBack}
              Agency={Agency}
              ClientName={ClientName}
              ClientSex={ClientSex}
              ClientCivilStatus={ClientCivilStatus}
              ClientCitizenship={ClientCitizenship}
              ClientAddress={ClientAddress}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            setClientAge={setClientAge}
            setLocationBack={setLocationBack}
            setAgency={setAgency}
            setClientName={setClientName}
            setClientSex={setClientSex}
            setClientCivilStatus={setClientCivilStatus}
            setClientCitizenship={setClientCitizenship}
            setClientAddress={setClientAddress}
            ClientName={ClientName}
          />
        </Container>
      </div>
    </Container>
  );
};

const DayMoment = (n) => {
  return (
    ["st", "nd", "rd"][(((((n < 0 ? -n : n) + 90) % 100) - 10) % 10) - 1] ||
    "th"
  );
};

const MyDocuments = ({
  singleperson,
  ClientAge,
  LocationBack,
  Agency,
  ClientName,
  ClientSex,
  ClientCivilStatus,
  ClientCitizenship,
  ClientAddress,
}) => {
  const now = new Date();
  const day = date.format(now, "D");
  const MonthAndDate = date.format(now, "MMMM, YYYY");

  return (
    <Document>
      <Page size="LETTER" wrap style={styles.body}>
        <View style={styles.row}>
          <View style={styles.leftcontainer}></View>
          <View style={styles.rightcontainer}>
            <View style={styles.mainheader}></View>
            <Text style={styles.title}>BARANGAY ACCEPTANCE</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that {""}
                  <Text style={styles.clientname}>{ClientName}</Text>,{" "}
                  <Text>{ClientAge}</Text> years of age,{" "}
                  <Text style={styles.textlowercase}>{ClientSex}</Text>,{" "}
                  <Text style={styles.textlowercase}>{ClientCivilStatus}</Text>,{" "}
                  <Text style={styles.textCapitalize}>{ClientCitizenship}</Text>{" "}
                  Citizen, is temporary residing at <Text>{ClientAddress}</Text>
                  , Barangay Luna, Surigao City, cannot go back to{" "}
                  <Text>{LocationBack}</Text> due to COVID 19 Protocol.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is issued upon request of the
                  above-mentioned person as required by <Text>{Agency}</Text>.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  Issued this{" "}
                  <Text>
                    {day}
                    {DayMoment(day)}
                  </Text>{" "}
                  day of <Text>{MonthAndDate}</Text> at Brgy. Sta Ana, Taytay, Rizal
                  , Philippines.{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DataFillOut = ({
  setClientAge,
  setLocationBack,
  setAgency,
  setClientName,
  setClientCitizenship,
  setClientCivilStatus,
  setClientSex,
  setClientAddress,
  ClientName,
}) => {
  return (
    <Container fluid="true" style={styles.formcontainer}>
      <TextInput
        style={styles.textinputs}
        label="Name"
        radius="sm"
        placeholder="ex. "
        onChange={(e) => setClientName(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Sex"
        radius="sm"
        placeholder="ex. Male"
        onChange={(e) => setClientSex(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Citizenship"
        radius="sm"
        placeholder="ex. Filipino"
        onChange={(e) => setClientCitizenship(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Civil Status"
        radius="sm"
        placeholder="ex. Single"
        onChange={(e) => setClientCivilStatus(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Address"
        radius="sm"
        placeholder="ex. Purok 1, Payawan 2"
        onChange={(e) => setClientAddress(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Age"
        radius="sm"
        placeholder="ex. 28"
        onChange={(e) => setClientAge(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Location want to go back"
        radius="sm"
        placeholder="ex. New Nazareth, Basilica, Province of Dinagat"
        onChange={(e) => setLocationBack(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Government Agency"
        radius="sm"
        placeholder="ex. DSWD-DINAGAT"
        onChange={(e) => setAgency(e.target.value)}
      />
      <AdditionInputs
        clientname={ClientName}
        lettername="Certification Stranded"
      />
    </Container>
  );
};

export default CertificationStrandedDirect;
