import React, { useState } from "react";
import "./style/ModalBK.scss";
import { FormattedMessage, useIntl } from "react-intl";
import schedule_doctor from "../../Data/schedule_doctorData";
import ScheduleModal from "./BKScheduleModal";

function ModalBK({ service, onclose }) {
  const [selectedSchedule, setSelectedSchedule] = useState(null); // ✅ Lưu lịch đã chọn
  const intl = useIntl();

  if (!service) return null;
  const disease_transed = intl.formatMessage({ id: service.text });
  // console.log(disease_transed);

  return (
    <div className="modal-bk">
      <div className="modal-bk__content">
        <span className="close" onClick={onclose}>
          &times;
        </span>
        <div className="content">
          <div className="doctor_container">
            <img alt="Bác sĩ tuyệt vời nhất" />
            <div className="doctor-info">
              <h2>{service.doctor_name}</h2>
              <div>
                <p>Là Bác sĩ có 21 năm kinh nghiệm về lĩnh vực {disease_transed}.</p>
                <p>Được mọi người yêu mến và ủng hộ.</p>
                <p></p>
                <p>Chính vì vậy hãy đặt lịch ngay để có thể có được diễm phúc được vị thần y này chữa bệnh</p>
              </div>
            </div>
          </div>

          <div className="schedule_time">
            <p>Lịch Khám</p>
            <div className="schedule_container">
              {schedule_doctor.map((item, index) => (
                <div key={index} className="time_exam">
                  <button onClick={() => setSelectedSchedule(item)}>{item.time}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScheduleModal
        disease={disease_transed}
        schedule={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />
    </div>
  );
}

export default ModalBK;
