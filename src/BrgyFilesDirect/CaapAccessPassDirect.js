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
    flexDirection: "row",
    textAlign: "justify",
    flexWrap: "wrap",
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

const CaapAccessPassDirect = () => {
  const { classes } = useStyles();
  const [ClientAge, setClientAge] = useState("");
  const [ClientName, setClientName] = useState("");
  const [ClientCitizenship, setClientCitizenship] = useState("");
  const [ClientAddress, setClientAddress] = useState("");
  const [ClientSex, setClientSex] = useState("");
  const [ClientPurpose, setClientPurpose] = useState("");

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>CAAP-ACCESS-PASS</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              ClientName={ClientName}
              ClientAge={ClientAge}
              ClientSex={ClientSex}
              ClientCitizenship={ClientCitizenship}
              ClientAddress={ClientAddress}
              ClientPurpose={ClientPurpose}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            setClientName={setClientName}
            setClientAge={setClientAge}
            setClientSex={setClientSex}
            setClientCitizenship={setClientCitizenship}
            setClientAddress={setClientAddress}
            setClientPurpose={setClientPurpose}
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
  ClientAge,
  ClientSex,
  ClientName,
  ClientCitizenship,
  ClientAddress,
  ClientPurpose,
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
            <Text style={styles.title}>BARANGAY CERTIFICATION</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that {""}
                  <Text style={styles.clientname}>{ClientName}</Text>,{" "}
                  <Text>{ClientAge}</Text> years of age,{" "}
                  <Text style={styles.textlowercase}>{ClientSex}</Text>,{" "}
                  <Text style={styles.textCapitalize}>{ClientCitizenship}</Text>{" "}
                  Citizen, a resident of {" "}
                  <Text>{ClientAddress}</Text>, Brgy. Sta Ana, Taytay, Rizal.
                </Text>
              </View>
              <View style={styles.marginTopContainer} wrap={true}>
                <Text style={styles.textfirstparag} wrap={true}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is also to certify that <Text style={styles.clientname}>{ClientName}</Text> is{" "}
                  <Text style={styles.textregular}>NOT IDENTIFIED</Text> as a <Text style={styles.textregular}>PERSON UNDER MONITORING (PUM) or PERSON UNDER INVESTIGATION (PUI)</Text>{" "}
                  based on the records of Barangay Luna District Health Center.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is being issued upon the request of the
                  above-named person as a requirement for{" "}
                  <Text style={styles.textregular}>{ClientPurpose}</Text>.
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
                  day of <Text>{MonthAndDate}</Text> at Brgy. Sta Ana, Taytay, Rizal, Philippines.{" "}
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
  setClientPurpose,
  setClientSex,
  setClientName,
  setClientCitizenship,
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
        label="Age"
        radius="sm"
        placeholder="ex. 23"
        onChange={(e) => setClientAge(e.target.value)}
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
        label="Address"
        radius="sm"
        placeholder="ex. Purok 1, Payawan 2"
        onChange={(e) => setClientAddress(e.target.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Client Purpose"
        radius="sm"
        placeholder="ex. BOARD EXAM"
        onChange={(e) => setClientPurpose(e.target.value)}
      />
      <AdditionInputs clientname={ClientName} lettername="Caap Access Pass" />
    </Container>
  );
};



export default CaapAccessPassDirect;
