import React, { useState } from "react";
import "./style/ScheduleModal.scss";
import axios from "axios";
import { FormattedMessage } from "react-intl";

const ScheduleModal = ({ disease, schedule, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    phone: "",
    birthday: "",
  });

  const handleChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      doctor: schedule?.doctor_name,
      time: schedule?.time,
      patient: {
        name: patientInfo.name,
        phone: patientInfo.phone,
        birthday: patientInfo.birthday,
        cccd: patientInfo.cccd,
        address: patientInfo.address,
        gender: patientInfo.gender,
      },
      disease: disease,
    };

    console.log("📤 Dữ liệu gửi lên server:", requestData);

    try {
      const response = await axios.post("http://localhost:3001/appointments", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Phản hồi từ server:", response.data);
      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi gửi dữ liệu:", error.response?.data || error.message);
      alert("❌ Đăng ký thất bại!");
    }
  };

  if (!schedule) return null; // Nếu chưa chọn lịch thì không hiển thị

  return (
    <div className="schedule-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Đặt Lịch hẹn của bạn</h2>
        <p>Bác sĩ: {schedule.doctor_name}</p>
        <p>Thời gian: {schedule.time}</p>
        <p>
          Khám bệnh: <FormattedMessage id={disease} />
        </p>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tên bệnh nhân</label>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Tên bệnh nhân"
              value={patientInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input
              className="form-input"
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={patientInfo.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Ngày sinh</label>
            <input
              className="form-input"
              type="text"
              name="birthday"
              placeholder="Ngày sinh"
              value={patientInfo.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Căn cước công dân</label>
            <input
              className="form-input"
              type="text"
              name="cccd"
              placeholder="Căn cước công dân"
              value={patientInfo.cccd}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Địa chỉ</label>
            <input
              className="form-input"
              type="text"
              name="address"
              placeholder="Nơi sinh sống"
              value={patientInfo.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group_gender">
            <label>Giới tính:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={patientInfo.gender === "male"}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={patientInfo.gender === "female"}
                  onChange={handleChange}
                />
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={patientInfo.gender === "other"}
                  onChange={handleChange}
                />
                Khác
              </label>
            </div>
          </div>
          <div className="form-button">
            <button type="submit">Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
