import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import Section from "./Section";
import specialties from "../Data/specialtyData";
import { getAllSpecialty } from '../../../services/UserService'

class Specialty extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],

    }
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log('check res', res)
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
  }


  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span>Chuyen Khoa Pho Bien</span>
            <button className="btn-section">Xem them</button>
          </div>

          <div className="section-body">
            {dataSpecialty && dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div className="section-customize" key={index}>
                    <div className="bg-image"
                      style={{ backgroundImage: `url(${item.image})`, height: '150px' }}
                    />
                    <div> {item.name} </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Section title="specialty.name" items={specialties} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Specialty));
