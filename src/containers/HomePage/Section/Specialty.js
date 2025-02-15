import React, { Component } from "react";
import { connect } from "react-redux";

import { injectIntl } from "react-intl";

import Section from "./Section";
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    const specialties = [
      {
        img: require("../../../assets/images/specialty-icon/1.webp").default,
        text: "specialty.musculoskeletal",
      },
      { img: require("../../../assets/images/specialty-icon/2.webp").default, text: "specialty.neurology" },
      { img: require("../../../assets/images/specialty-icon/3.webp").default, text: "specialty.digestive" },
      { img: require("../../../assets/images/specialty-icon/4.webp").default, text: "specialty.cardiology" },
      { img: require("../../../assets/images/specialty-icon/5.webp").default, text: "specialty.ent" },
      { img: require("../../../assets/images/specialty-icon/6.webp").default, text: "specialty.spine" },
      {
        img: require("../../../assets/images/specialty-icon/7.webp").default,
        text: "specialty.traditional_medicine",
      },
      { img: require("../../../assets/images/specialty-icon/8.webp").default, text: "specialty.acupuncture" },
      {
        img: require("../../../assets/images/specialty-icon/9.webp").default,
        text: "specialty.obstetrics_gynecology",
      },
    ];

    return <Section title="specialty.name" items={specialties} />;
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
