import React, { Component } from "react";
import { connect } from "react-redux";

import { injectIntl } from "react-intl";

import Section from "./Section";
import specialties from "../Data/specialtyData";

class Specialty extends Component {
  render() {
    return (
      <div>
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
