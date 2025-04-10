import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/UserService";
import moment from "moment";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
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
      const { user } = this.props;
      const { currentDate } = this.state;
      let formattedDate = new Date(currentDate).getTime();
      this.getDataPatient(user, formattedDate);
    }
  }

  getDataPatient = async (user, formattedDate) => {
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
      () => {
        const { user } = this.props;
        const { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
      }
    );
  };

  handleBtnConfirm = () => {};
  handleBtnInvoice = () => {};

  render() {
    const { dataPatient } = this.state;
    const { language } = this.props;

    return (
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
                              onClick={() => this.handleBtnConfirm()}
                            >
                              <FormattedMessage id="manage-patient.confirm" defaultMessage="Confirm" />
                            </button>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => this.handleBtnConfirm()}
                            >
                              <FormattedMessage
                                id="manage-patient.invoice"
                                defaultMessage="Send an invoice"
                              />
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
