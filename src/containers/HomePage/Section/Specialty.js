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
      { img: "/specialty-icon/1.webp", text: "specialty.musculoskeletal" },
      { img: "/specialty-icon/2.webp", text: "specialty.neurology" },
      { img: "/specialty-icon/3.webp", text: "specialty.digestive" },
      { img: "/specialty-icon/4.webp", text: "specialty.cardiology" },
      { img: "/specialty-icon/5.webp", text: "specialty.ent" },
      { img: "/specialty-icon/6.webp", text: "specialty.spine" },
      { img: "/specialty-icon/7.webp", text: "specialty.traditional_medicine" },
      { img: "/specialty-icon/8.webp", text: "specialty.acupuncture" },
      { img: "/specialty-icon/9.webp", text: "specialty.obstetrics_gynecology" },
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
