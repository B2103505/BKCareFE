import React, { Component } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from 'react-redux';
import "./Doctor.scss";
import doctors from "../Data/doctorData";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/'
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: []
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux
      })
    }
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  render() {
    console.log('check topDoctorsRedux', this.props.topDoctorsRedux)
    let allDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className='section-share '>
        <div className='section-container'></div>
        <div className='section-body'>
          <div className="doctor_cont">
            {this.state.arrDoctors && this.state.arrDoctors.length > 0 &&
              this.state.arrDoctors.map((item, index) => {
                let nameVi = `${item.positionId}, ${item.firstName}, ${item.lastName}`
                let nameEn = `${item.positionId}, ${item.firstName}, ${item.lastName}`
                return (
                  <>
                    <div className="background_doctor" style={{ backgroundImage: "url('/background/1.webp')" }}>
                      <div className="services-overview">
                        <h1>
                          <FormattedMessage id="doctor.main_title" />
                        </h1>
                        <div className='doctor-box'>
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                          <div className="doctor_cont">ABC
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
  }
}

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



