import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor, getProfileDoctorById, postSendRemedy } from "../../../services/UserService";
import moment from "moment";
import { isConstructorDeclaration } from "typescript";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formattedDate);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.getDataPatient();
    }
  }

  getDataPatient = async () => {
    const { user } = this.props;
    const { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = async (item) => {
    console.log("Check Patient:", item);

    let time =
      this.props.language === LANGUAGES.VI
        ? item.timeTypeDataPatient?.valueVi
        : item.timeTypeDataPatient?.valueEn;

    let patientName = item.patientData?.firstname;

    // 👇 Gọi API để lấy thông tin bác sĩ
    let doctorName = "";
    let res = await getProfileDoctorById(item.doctorId);
    if (res && res.errCode === 0 && res.data) {
      doctorName = `${res.data.lastName} ${res.data.firstName}`; // hoặc ngược lại tùy ngôn ngữ
      console.log(doctorName);
    }

    let data = {
      doctorId: item.doctorId,
      doctorName: doctorName,
      patientId: item.patientId,
      email: item.patientData.email,
      patientName: patientName,
      timeType: item.timeType,
      time: time,
      language: this.props.language,
    };

    console.log(data);

    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      doctorName: dataModal.doctorName,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      time: dataModal.time,
      language: dataModal.language,
    });

    if (res && res.errCode === 0) {
      toast.success("Send Remedy success");
      await this.getDataPatient();
      this.setState({ isOpenRemedyModal: false, dataModal: {} });
    } else {
      toast.error("Something wrongs....");
      console.log("error mess: ", res);
    }
  };

  render() {
    const { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    const { language } = this.props;

    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">
            <FormattedMessage id="manage-patient.title" defaultMessage="Manage Patients" />
          </div>

          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-patient.choose-date" defaultMessage="Choose Date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>

            <div className="col-12 table-manage-patient">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>
                      <FormattedMessage id="manage-patient.time" defaultMessage="Time" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.fullname" defaultMessage="Full Name" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.gender" defaultMessage="Gender" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.actions" defaultMessage="Actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient
                      .slice()
                      .sort((a, b) => a.timeType.localeCompare(b.timeType)) // 💡 Sắp xếp theo timeType tăng dần
                      .map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient?.valueVi
                            : item.timeTypeDataPatient?.valueEn;

                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData?.genderData?.valueVi
                            : item.patientData?.genderData?.valueEn;

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData?.firstname}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                <FormattedMessage id="manage-patient.confirm" defaultMessage="Confirm" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        <FormattedMessage id="manage-patient.no-data" defaultMessage="No Data" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(ManagePatient);
