import {
  Container,
  NativeSelect,
  createStyles,
  Button,
  MultiSelect,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";


const useStyles = createStyles((theme) => ({
  formcontainer: {
    width: "35vw",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  textmargin: {
    marginRight: `${theme.spacing.xs}px`,
    fontFamily: "Bold",
  },
  textinputs: {
    width: "80%",
    padding: `${theme.spacing.sm}px`,
  },
  button: {
    width: "110px",
    cursor: "pointer",
  },
}));

const DirectAccess = () => {
  const [DirectAccessDocument, setDirectAccessDocument] = useState("4P'sTransfery");
  const {userPrivilege} = useContext(AppContext);

  const { classes } = useStyles();

  const documentsdatas = [
    {
      value: "BrgyCertification",
      label: "BrgyCertifcation",
      group: "Certificatiion",
    },
    {
      value: "Certification-Stranded",
      label: "Certification-Stranded",
      group: "Certificatiion",
    },
    {
      value: "Clearance",
      label: "Clearance",
      group: "Certificatiion",
    },
    {
      value: "DeathCertificate",
      label: "DeathCertificate",
      group: "Certificatiion",
    },
    {
      value: "GoodMoral",
      label: "GoodMoral",
      group: "Certificatiion",
    },
    {
      value: "JobSeeker",
      label: "JobSeeker",
      group: "Certificatiion",
    },
    {
      value: "LowIncome",
      label: "LowIncome",
      group: "Certificatiion",
    },
    {
      value: "LowIncomeSubsidized",
      label: "LowIncomeSubsidized",
      group: "Certificatiion",
    },
    {
      value: "Livelihood",
      label: "Livelihood",
      group: "Certificatiion",
    },
    {
      value: "SoloParent",
      label: "SoloParent",
      group: "Certificatiion",
    },
    {
      value: "TravelCertificate",
      label: "TravelCertificate",
      group: "Certificatiion",
    },
    {
      value: "BurialAssistanceRelatives",
      label: "BurialAssistanceRelatives",
      group: "Assistance",
    },
    {
      value: "BaligyaBaboy",
      label: "BaligyaBaboy",
      group: "Request",
    },
    {
      value: "Certification-Abroad",
      label: "Certification-Abroad",
      group: "Request",
    },
    {
      value: "ElectricConnection",
      label: "ElectricConnection",
      group: "Request",
    },
    {
      value: "WaterConnection",
      label: "WaterConnection",
      group: "Request",
    },
    {
      value: "WaterConnectionDiscount",
      label: "WaterConnectionDiscount",
      group: "Request",
    },
    {
      value: "BuildingPermit",
      label: "BuildingPermit",
      group: "Request",
    },
    {
      value: "BusinessClosurePSA",
      label: "BusinessClosurePSA",
      group: "Request",
    },
    {
      value: "CaapAccessPass",
      label: "CaapAccessPass",
      group: "Request",
    },
    {
      value: "BirPattern/Assitance",
      label: "BirPattern/Assitance",
      group: "Request",
    },
    {
      value: "BusinessClosure",
      label: "BusinessClosure",
      group: "Request",
    },
    {
      value: "MinorVaccination",
      label: "MinorVaccination",
      group: "Request",
    },
    {
      value: "Certification-Pabahay",
      label: "Certification-Pabahay",
      group: "Certificatiion",
    },
    {
      value: "PhilHealth",
      label: "PhilHealth",
      group: "Request",
    },
    {
      value: "PhilSys-Step-2",
      label: "PhilSys-Step-2",
      group: "Request",
    },
    {
      value: "4P'sTransfery",
      label: "4P'sTransfery",
      group: "Transfer",
    },
    {
      value: "CHEDScholar",
      label: "CHEDScholar",
      group: "Scholar",
    },
    {
      value: "BrgyAcceptance",
      label: "BrgyAcceptance",
      group: "Acceptance",
    },
  ];




  const documentsdata = [
    "4P'sTransfery",
    "BaligyaBaboy",
    "BrgyAcceptance",
    "BrgyAcceptance2",
    "BusinessClosure",
    "BusinessClosurePSA",
    "BurialAssistanceRelatives",
    "BuildingPermit",
    "BirPattern/Assitance",
    "BrgyCertification",
    "BrgyCertification2",
    "BrgyCertification3",
    "CaapAccessPass",
    "Certification-Abroad",
    "Certification-Stranded",
    "Clearance",
    "CHEDScholar",
    "Certification-Pabahay",
    "DeathCertificate",
    "ElectricConnection",
    "GoodMoral",
    "LowIncomeSubsidized",
    "Livelihood",
    "LowIncome",
    "JobSeeker",
    "MinorVaccination",
    "PaihawBaboy",
    "PhilHealth",
    "PhilSys-Step-2",
    "SoloParent",
    "TravelCertificate",
    "WaterConnection",
    "WaterConnectionDiscount",
  ];

  

  return (
    <Container fluid="true" className={classes.formcontainer}>
      <NativeSelect
        className={classes.textinputs}
        data={documentsdata}
        value={DirectAccessDocument}
        radius="sm"
        label="Select a document"
        onChange={(event) => setDirectAccessDocument(event.currentTarget.value)}
      ></NativeSelect>
      <Link
        to={
          DirectAccessDocument === "4P'sTransfery"
            ? `${userPrivilege}/4PsTransferyDirect`
            : DirectAccessDocument === "BrgyAcceptance"
            ? `${userPrivilege}/BrgyAcceptanceDirect`
            : DirectAccessDocument === "BrgyAcceptance2"
            ? `${userPrivilege}/BrgyAcceptance2Direct`
            : DirectAccessDocument === "BusinessClosure"
            ? `${userPrivilege}/BusinessClosureDirect`
            : DirectAccessDocument === "BusinessClosurePSA"
            ? `${userPrivilege}/BusinessClosurePSADirect`
            : DirectAccessDocument === "BurialAssistanceRelatives"
            ? `${userPrivilege}/BurialAssistanceRelativesDirect`
            : DirectAccessDocument === "BuildingPermit"
            ? `${userPrivilege}/BuildingPermitDirect`
            : DirectAccessDocument === "TravelCertificate"
            ? `${userPrivilege}/TravelCertificateDirect`
            : DirectAccessDocument === "Certification-Abroad"
            ? `${userPrivilege}/CertificateAbroadDirect`
            : DirectAccessDocument === "BirPattern/Assitance"
            ? `${userPrivilege}/CertificateBirPatternDirect`
            : DirectAccessDocument === "WaterConnection"
            ? `${userPrivilege}/CertificateWaterConnectionDirect`
            : DirectAccessDocument === "Certification-Stranded"
            ? `${userPrivilege}/CertificateStrandedDirect`
            : DirectAccessDocument === "JobSeeker"
            ? `${userPrivilege}/JobSeekerDirect`
            : DirectAccessDocument === "Clearance"
            ? `${userPrivilege}/ClearanceDirect`
            : DirectAccessDocument === "WaterConnectionDiscount"
            ? `${userPrivilege}/CertificateWaterConnectionDiscountDirect`
            : DirectAccessDocument === "LowIncome"
            ? `${userPrivilege}/CertificationLowIncomeDirect`
            : DirectAccessDocument === "PhilHealth"
            ? `${userPrivilege}/PhilHealthDirect`
            : DirectAccessDocument === "LowIncomeSubsidized"
            ? `${userPrivilege}/LowIncomeSubsidizedDirect`
            : DirectAccessDocument === "CHEDScholar"
            ? `${userPrivilege}/ChedScholarDirect`
            : DirectAccessDocument === "BrgyCertification"
            ? `${userPrivilege}/BrgyCertificationDirect`
            : DirectAccessDocument === "Livelihood"
            ? `${userPrivilege}/LivelihoodDirect`
            : DirectAccessDocument === "Certification-Pabahay"
            ? `${userPrivilege}/CertificationPabahayDirect`
            : DirectAccessDocument === "ElectricConnection"
            ? `${userPrivilege}/ElectricConnectionDirect`
            : DirectAccessDocument === "GoodMoral"
            ? `${userPrivilege}/GoodMoralDirect`
            : DirectAccessDocument === "CaapAccessPass"
            ? `${userPrivilege}/CaapAccessPassDirect`
            : DirectAccessDocument === "BaligyaBaboy"
            ? `${userPrivilege}/BaligyaBaboyDirect`
            : DirectAccessDocument === "BrgyCertification2"
            ? `${userPrivilege}/BrgyCertification2Direct`
            : DirectAccessDocument === "BrgyCertification3"
            ? `${userPrivilege}/BrgyCertification3Direct`
            : DirectAccessDocument === "PaihawBaboy"
            ? `${userPrivilege}/PaihawBaboyDirect`
            : DirectAccessDocument === "DeathCertificate"
            ? `${userPrivilege}/DeathCertificateDirect`
            : DirectAccessDocument === "MinorVaccination"
            ? `${userPrivilege}/MinorVaccinationDirect`
            : DirectAccessDocument === "PhilSys-Step-2"
            ? `${userPrivilege}/PhilSysDirect`
            : DirectAccessDocument === "SoloParent"
            ? `${userPrivilege}/SoloParentDirect`
            : "N/A"
        }
      >
        <Button variant="filled" size="sm" className={classes.button}>
          Apply
        </Button>
      </Link>
    </Container>
  );
};

export default DirectAccess;
