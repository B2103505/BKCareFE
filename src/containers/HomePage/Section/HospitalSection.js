import React from "react";
import Section from "./Section";

function HospitalSection() {
  const hospitals = [
    { img: "/hospital/1.webp", text: "hospital.vietduc" },
    { img: "/hospital/2.webp", text: "hospital.choray" },
    { img: "/hospital/3.webp", text: "hospital.doctorcheck" },
    { img: "/hospital/4.webp", text: "hospital.fv" },
    { img: "/hospital/5.webp", text: "hospital.anviet" },
    { img: "/hospital/6.webp", text: "hospital.anphuoc" },
  ];

  return <Section title="hospital.name" items={hospitals} />;
}

export default HospitalSection;
