import React from "react";
import Section from "./Section";
import hospitals from "../Data/hospitalData";

function HospitalSection() {
  return <Section title="hospital.name" items={hospitals} />;
}

export default HospitalSection;
