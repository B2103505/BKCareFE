import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Home from "../../routes/Home";
import Specialty from "./Section/Specialty";
import ServicesOverview from "./Section/ServicesOverview";
import HospitalSection from "./Section/HospitalSection";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <ServicesOverview />
        <Specialty />
        <HospitalSection />
        <div style={{ height: "300px" }}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
