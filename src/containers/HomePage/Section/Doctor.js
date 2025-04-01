import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Doctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/";
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  render() {
    // console.log("check topDoctorsRedux", this.props.topDoctorsRedux);
    let allDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <div className="section-share ">
        <div className="section-container"></div>
        <div className="section-body">
          <div className="doctor-list">
            <div className="background_doctor" style={{ backgroundImage: "url('/background/1.webp')" }}>
              <h1 className="background_imgdoctor">
                <FormattedMessage id="doctor.main_title" />
              </h1>
              <div className="doctor-overview">
                {allDoctors &&
                  allDoctors.length > 0 &&
                  allDoctors.map((item, index) => {
                    console.log(item);

                    let position = ""; // Khai báo trước để sử dụng ngoài switch

                    switch (item.positionId) {
                      case "P0": // Đảm bảo item.positionId trả về chuỗi
                        position = "doctor.P0";
                        break;
                      case "P1":
                        position = "doctor.P1";
                        break;
                      case "P2":
                        position = "doctor.P2";
                        break;
                      case "P3":
                        position = "doctor.P3";
                        break;
                      case "P4":
                        position = "doctor.P4";
                        break;
                      default:
                        position = "Không xác định"; // Giá trị mặc định nếu không khớp
                    }

                    console.log("Chức vụ:", position);

                    let nameVi = `${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.firstName} ${item.lastName}`;

                    // Chuyển buffer thành Base64 để hiển thị hình ảnh
                    const bufferData = item.image.data;
                    const base64String = Buffer.from(bufferData).toString("utf-8");
                    const imageSrc = base64String; // Đây là chuỗi base64 của hình ảnh

                    return (
                      <>
                        <div className="doctor-avatar" key={index}>
                          <img src={imageSrc} alt="Doctor Avatar" />
                          <h3>
                            <FormattedMessage id={position} /> {language === LANGUAGES.VI ? nameVi : nameEn}{" "}
                          </h3>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

// function Doctor() {
//   const intl = useIntl(); // Hook để lấy text từ react-intl

//   return (
//     <>
//       <div className="background_doctor" style={{ backgroundImage: "url('/background/1.webp')" }}>
//         <div className="services-overview">
//           <h1>
//             <FormattedMessage id="doctor.main_title" />
//           </h1>

//           <div className="doctor_cont">
//             {doctors.map((dt, index) => (
//               <div className="dc_info">
//                 <img src={dt.img} alt={intl.formatMessage({ id: dt.name })} />
//                 <span>
//                   <FormattedMessage id={dt.name} />
//                 </span>
//                 <span>
//                   <FormattedMessage id={dt.title} />
//                 </span>
//                 <span>
//                   <FormattedMessage id="doctor.chuyen" />: <FormattedMessage id={dt.major} />
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Doctor;
