import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import "./Doctor.scss";
import doctors from "../Data/doctorData";

function Doctor() {
  const intl = useIntl(); // Hook để lấy text từ react-intl

  return (
    <>
      <div className="background_doctor" style={{ backgroundImage: "url('/background/1.webp')" }}>
        <div className="services-overview">
          <h1>
            <FormattedMessage id="doctor.main_title" />
          </h1>

          <div className="doctor_cont">
            {doctors.map((dt, index) => (
              <div className="dc_info">
                <img src={dt.img} alt={intl.formatMessage({ id: dt.name })} />
                <span>
                  <FormattedMessage id={dt.name} />
                </span>
                <span>
                  <FormattedMessage id={dt.title} />
                </span>
                <span>
                  <FormattedMessage id="doctor.chuyen" />: <FormattedMessage id={dt.major} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctor;
