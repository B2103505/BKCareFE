import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { getAllCodeService, getClinicById } from "../../../services/UserService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorid: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const clinicId = this.props.match.params.id;

      // Gọi API lấy chi tiết clinic
      let res = await getClinicById(clinicId)({
        id: clinicId,
      });

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

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorid,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <>
        <HomeHeader />
        <div className="verify-container" style={{ height: "70px" }}></div>

        <div>Hello from Clinic</div>
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
