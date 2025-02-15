import React, { useState } from "react";
import "./ModalBK.scss";

function ModalBK({ service, onclose }) {
  const schedule_doctor = [
    { doctor_name: "Võ Đặng", time: "7:00 - 7:30" },
    { doctor_name: "Võ Đặng", time: "7:30 - 8:00" },
    { doctor_name: "Võ Đặng", time: "8:00 - 8:30" },
    { doctor_name: "Võ Đặng", time: "8:30 - 9:00" },
    { doctor_name: "Võ Đặng", time: "9:00 - 9:30" },
    { doctor_name: "Võ Đặng", time: "9:30 - 10:00" },
    { doctor_name: "Phạm Vủ Lâm", time: "13:00 - 13:30" },
    { doctor_name: "Phạm Vủ Lâm", time: "14:00 - 14:30" },
    { doctor_name: "Phạm Vủ Lâm", time: "15:00 - 15:30" },
    { doctor_name: "Phạm Vủ Lâm", time: "16:00 - 17:00" },
  ];

  if (!service) return null;

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
                <p>Là Bác sĩ có 21 năm kinh nghiệm về lĩnh vực {service.text}.</p>
                <p>Được mọi người yêu mến và ủng hộ.</p>
                <p></p>
                <p>Chính vì vậy hãy đặt lịch ngay để có thể có được diễm phúc được vị thần y này chữa bệnh</p>
              </div>
            </div>
          </div>

          <div className="schedule">
            <p>Lịch Khám</p>
            <div className="schedule_container">
              {schedule_doctor.map((item, index) => (
                <div key={index} className="time_exam">
                  <button>{item.time}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBK;
