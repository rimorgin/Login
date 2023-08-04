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
    height: "1500px",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    borderRadius: `20px`,
    display: "flex",
    flexDirection: "column",
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
    width: "100%",
    height: `250vh`,
    borderRadius: 20,
  },
  pdfviewer: {
    height: "90vh",
    width: "35vw",
  },
  containerwrapper: {
    marginTop: 40,
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
    paddingBottom: 18,
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
  headers: {
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    paddingBottom: 5,
  },
  wrapper: {
    lineHeight: 2,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    fontFamily: "OpenSans",
  },
  contenttext: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  marginTopText: {
    marginTop: 3,
    textAlign: "left",
    width: 160,
  },
  marginTopAge: {
    marginTop: 3,
    textAlign: "right",
    width: 100,
  },
  marginTopBirthdate: {
    marginTop: 3,
    textAlign: "left",
    width: 140,
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

const MinorVaccinationDirect = () => {
  const { classes } = useStyles();
  const singleperson = useSelector((state) => state.facerecog.singlepersondata);
  const [ClientAge, setClientAge] = useState("");
  const [ClientName, setClientName] = useState("");
  const [ClientSex, setClientSex] = useState("");
  const [ClientCivilStatus, setClientCivilStatus] = useState("");
  const [ClientCitizenship, setClientCitizenship] = useState("");
  const [ClientAddress, setClientAddress] = useState("");
  const [FirstChildName, setFirstChildName] = useState("");
  const [FirstChildBirthdate, setFirstChildBirthdate] = useState("");
  const [FirstChildAge, setFirstChildAge] = useState("");
  const [SecondChildName, setSecondChildName] = useState("");
  const [SecondChildBirthdate, setSecondChildBirthdate] = useState("");
  const [SecondChildAge, setSecondChildAge] = useState("");
  const [ThirdChildName, setThirdChildName] = useState("");
  const [ThirdChildBirthdate, setThirdChildBirthdate] = useState("");
  const [ThirdChildAge, setThirdChildAge] = useState("");
  const [FourthChildName, setFourthChildName] = useState("");
  const [FourthChildBirthdate, setFourthChildBirthdate] = useState("");
  const [FourthChildAge, setFourthChildAge] = useState("");
  const [FifthChildName, setFifthChildName] = useState("");
  const [FifthChildBirthdate, setFifthChildBirthdate] = useState("");
  const [FifthChildAge, setFifthChildAge] = useState("");

  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>MINOR VACCINATION</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments
              singleperson={singleperson}
              ClientAge={ClientAge}
              ClientName={ClientName}
              ClientSex={ClientSex}
              ClientCivilStatus={ClientCivilStatus}
              ClientCitizenship={ClientCitizenship}
              ClientAddress={ClientAddress}
              FirstChildName={FirstChildName}
              FirstChildBirthdate={FirstChildBirthdate}
              FirstChildAge={FirstChildAge}
              SecondChildName={SecondChildName}
              SecondChildBirthdate={SecondChildBirthdate}
              SecondChildAge={SecondChildAge}
              ThirdChildName={ThirdChildName}
              ThirdChildBirthdate={ThirdChildBirthdate}
              ThirdChildAge={ThirdChildAge}
              FourthChildName={FourthChildName}
              FourthChildBirthdate={FourthChildBirthdate}
              FourthChildAge={FourthChildAge}
              FifthChildName={FifthChildName}
              FifthChildBirthdate={FifthChildBirthdate}
              FifthChildAge={FifthChildAge}
            />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut
            setClientAge={setClientAge}
            setClientName={setClientName}
            setClientSex={setClientSex}
            setClientCivilStatus={setClientCivilStatus}
            setClientCitizenship={setClientCitizenship}
            setClientAddress={setClientAddress}
            setFirstChildName={setFirstChildName}
            setFirstChildBirthdate={setFirstChildBirthdate}
            setFirstChildAge={setFirstChildAge}
            setSecondChildName={setSecondChildName}
            setSecondChildBirthdate={setSecondChildBirthdate}
            setSecondChildAge={setSecondChildAge}
            setThirdChildName={setThirdChildName}
            setThirdChildBirthdate={setThirdChildBirthdate}
            setThirdChildAge={setThirdChildAge}
            setFourthChildName={setFourthChildName}
            setFourthChildBirthdate={setFourthChildBirthdate}
            setFourthChildAge={setFourthChildAge}
            setFifthChildName={setFifthChildName}
            setFifthChildBirthdate={setFifthChildBirthdate}
            setFifthChildAge={setFifthChildAge}
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
  ClientName,
  ClientSex,
  ClientCivilStatus,
  ClientCitizenship,
  ClientAddress,
  FirstChildName,
  FirstChildBirthdate,
  FirstChildAge,
  SecondChildName,
  SecondChildBirthdate,
  SecondChildAge,
  ThirdChildName,
  ThirdChildBirthdate,
  ThirdChildAge,
  FourthChildName,
  FourthChildBirthdate,
  FourthChildAge,
  FifthChildName,
  FifthChildBirthdate,
  FifthChildAge,
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
                  <Text style={styles.textlowercase}>{ClientCivilStatus}</Text>,{" "}
                  <Text style={styles.textCapitalize}>{ClientCitizenship}</Text>{" "}
                  Citizen, a resident of <Text>{ClientAddress}</Text>, Brgy. Sta Ana, Taytay, Rizal
                  , <Text></Text>.
                </Text>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.headers}>
                  <Text>Name</Text>
                  <Text>Date of Birth</Text>
                  <Text>Age</Text>
                </View>
                <View style={styles.contenttext}>
                  <Text style={styles.marginTopText}>{FirstChildName}</Text>
                  <Text style={styles.marginTopBirthdate}>
                    {FirstChildBirthdate}
                  </Text>
                  <Text style={styles.marginTopAge}>
                    {FirstChildAge} YEARS OLD
                  </Text>
                </View>
                {SecondChildName && (
                  <View style={styles.contenttext}>
                    <Text style={styles.marginTopText}>{SecondChildName}</Text>
                    <Text style={styles.marginTopBirthdate}>
                      {SecondChildBirthdate}
                    </Text>
                    <Text style={styles.marginTopAge}>
                      {SecondChildAge} YEARS OLD
                    </Text>
                  </View>
                )}
                {ThirdChildName && (
                  <View style={styles.contenttext}>
                    <Text style={styles.marginTopText}>{ThirdChildName}</Text>
                    <Text style={styles.marginTopBirthdate}>
                      {ThirdChildBirthdate}
                    </Text>
                    <Text style={styles.marginTopAge}>
                      {ThirdChildAge} YEARS OLD
                    </Text>
                  </View>
                )}
                {FourthChildName && (
                  <View style={styles.contenttext}>
                    <Text style={styles.marginTopText}>{FourthChildName}</Text>
                    <Text style={styles.marginTopBirthdate}>
                      {FourthChildBirthdate}
                    </Text>
                    <Text style={styles.marginTopAge}>
                      {FourthChildAge} YEARS OLD
                    </Text>
                  </View>
                )}
                {FifthChildName && (
                  <View style={styles.contenttext}>
                    <Text style={styles.marginTopText}>{FifthChildName}</Text>
                    <Text style={styles.marginTopBirthdate}>
                      {FifthChildBirthdate}
                    </Text>
                    <Text style={styles.marginTopAge}>
                      {FifthChildAge} YEARS OLD
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is issued upon the request of the
                  above-mentioned person{" "}
                  <Text style={styles.textregular}>
                    as required by CITY HEALTH OFFICE FOR VACCINATION
                  </Text>
                  .
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
  setClientName,
  setClientCitizenship,
  setClientCivilStatus,
  setClientSex,
  setClientAddress,
  setFirstChildName,
  setFirstChildBirthdate,
  setFirstChildAge,
  setSecondChildName,
  setSecondChildBirthdate,
  setSecondChildAge,
  setThirdChildName,
  setThirdChildBirthdate,
  setThirdChildAge,
  setFourthChildName,
  setFourthChildBirthdate,
  setFourthChildAge,
  setFifthChildName,
  setFifthChildBirthdate,
  setFifthChildAge,
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
        onChange={(e) => setClientAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="First Child Name"
        radius="sm"
        placeholder="ex. 1.	LEA E. DESCARTIN"
        onChange={(e) => setFirstChildName(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="First Child Birthdate"
        radius="sm"
        placeholder="ex. OCTOBER 4, 2005"
        onChange={(e) => setFirstChildBirthdate(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="First Child Age"
        radius="sm"
        placeholder="ex. 16"
        onChange={(e) => setFirstChildAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Second Child Name"
        radius="sm"
        placeholder="ex. 2.	LEA E. DESCARTIN"
        onChange={(e) => setSecondChildName(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Second Child Birthdate"
        radius="sm"
        placeholder="ex. OCTOBER 4, 2005"
        onChange={(e) => setSecondChildBirthdate(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Second Child Age"
        radius="sm"
        placeholder="ex. 16"
        onChange={(e) => setSecondChildAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Third Child Name"
        radius="sm"
        placeholder="ex. 3.	LEA E. DESCARTIN"
        onChange={(e) => setThirdChildName(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Third Child Birthdate"
        radius="sm"
        placeholder="ex. OCTOBER 4, 2005"
        onChange={(e) => setThirdChildBirthdate(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Third Child Age"
        radius="sm"
        placeholder="ex. 16"
        onChange={(e) => setThirdChildAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fourth Child Name"
        radius="sm"
        placeholder="ex. 4.	LEA E. DESCARTIN"
        onChange={(e) => setFourthChildName(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fourth Child Birthdate"
        radius="sm"
        placeholder="ex. OCTOBER 4, 2005"
        onChange={(e) => setFourthChildBirthdate(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fourth Child Age"
        radius="sm"
        placeholder="ex. 16"
        onChange={(e) => setFourthChildAge(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fifth Child Name"
        radius="sm"
        placeholder="ex. 5.	LEA E. DESCARTIN"
        onChange={(e) => setFifthChildName(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fifth Child Birthdate"
        radius="sm"
        placeholder="ex. OCTOBER 4, 2005"
        onChange={(e) => setFifthChildBirthdate(e.currentTarget.value)}
      />
      <TextInput
        style={styles.textinputs}
        label="Fifth Child Age"
        radius="sm"
        placeholder="ex. 16"
        onChange={(e) => setFifthChildAge(e.currentTarget.value)}
      />
      <AdditionInputs clientname={ClientName} lettername="Minor Vaccination" />
    </Container>
  );
};

export default MinorVaccinationDirect;
