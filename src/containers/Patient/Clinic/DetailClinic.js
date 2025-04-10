import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllCodeService, getClinicById } from "../../../services/UserService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorid: [],
      dataDetailClinic: {},
      imageSrc: "",
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const clinicId = this.props.match.params.id;

      // Gọi API lấy chi tiết clinic
      let res = await getClinicById({ id: clinicId });

      // console.log(">> Kết quả gọi API getClinicById:", res);

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorid = [];
        if (data) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorid.push(item.doctorId);
            });
          }
        }

        // 👉 Chỉ log ở đây thôi
        if (data.image && data.image.data) {
          console.log("✅ Ảnh buffer từ DB:", data.image.data);
        }

        // Chuyển buffer thành Base64 để hiển thị hình ảnh
        const bufferData = data.image.data;
        const base64String = Buffer.from(bufferData).toString("utf-8");
        const imageSrc = base64String; // Đây là chuỗi base64 của hình ảnh

        console.log(imageSrc);

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorid,
          imageSrc: base64String,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="verify-container" style={{ height: "70px" }}></div>

        <div className="detail-clinic-body">
          <div className="clinic-info-container">
            <div className="clinic-image">
              {dataDetailClinic.image && <img src={this.state.imageSrc} alt="clinic" />}
            </div>

            <div className="clinic-header">
              <h2>Bệnh viện {dataDetailClinic.name}</h2>
              <p className="clinic_address">{dataDetailClinic.address}</p>
              <div
                className="clinic-description"
                dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}
              ></div>
            </div>
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor-specialty" key={item}>
                  <div className="detail-specialty-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescDoctor={true}
                        // dataScheduleModalTime={dataScheduleModalTime}
                      />
                    </div>
                  </div>

                  <div className="detail-specialty-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} key={index} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
