import React, { useEffect, useState } from "react";
import Section from "./Section";
import hospitals from "../Data/hospitalData";
import { getAllClinic } from "../../../services/UserService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function HospitalSection() {
  const [dataClinic, setDataClinic] = useState([]);
  const history = useHistory(); // dùng hook để điều hướng

  useEffect(() => {
    const fetchClinic = async () => {
      let res = await getAllClinic();
      // console.log("check res", res);
      if (res && res.errCode === 0) {
        setDataClinic(res.data || []);
      }
    };

    fetchClinic();
  }, []);

  const handleViewDetailClinic = (item) => {
    history.push(`/detail-clinic/${item.id}`);
  };

  return <Section title="hospital.name" items={dataClinic} onItemClick={handleViewDetailClinic} />;
}

export default HospitalSection;
