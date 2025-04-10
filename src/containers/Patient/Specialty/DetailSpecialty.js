import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/UserService'
import _ from 'lodash';
import Select from 'react-select';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      listProvinceRaw: [],
      selectedProvince: '',
      provinceId: ''
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyById({
        id: id,
        location: 'ALL'
      });

      let resProvince = await getAllCodeService('PROVINCE')

      if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map(item => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        let rawProvince = resProvince.data;
        let buildProvince = this.buildDataProvince(rawProvince);
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: buildProvince,
          listProvinceRaw: rawProvince
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let newListProvince = this.buildDataProvince(this.state.listProvinceRaw); // giữ 1 state gốc
      this.setState({
        listProvince: newListProvince
      });
    }
  }

  buildDataProvince = (data) => {
    let result = [];
    let language = this.props.language
    if (data && data.length > 0) {
      data.map(item => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      })
    }
    return result
  }

  handleChangeProvince = async (selectedOption) => {
    this.setState({
      selectedProvince: selectedOption
    })

  }

  render() {
    let { arrDoctorId, dataDetailSpecialty } = this.state;
    let { language } = this.props;
    console.log('selected Province', this.state.selectedProvince)
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="verify-container" style={{ height: "70px" }}></div>

        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
              <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
              </div>
            }
          </div>

          <div className="search-doctor-by-province">
             <Select
               value={this.state.selectedProvince}
               onChange={this.handleChangeProvince}
               options={this.state.listProvince}
             />
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
