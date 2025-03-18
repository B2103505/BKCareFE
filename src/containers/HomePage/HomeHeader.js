import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/Logo.webp";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changelanguageApp } from "../../store/actions";

import SideMenu from "./Section/SideMenu/SideMenu";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false, // Trạng thái đóng mở side menu
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  changeLanguage = (language) => {
    // alert(language);
    // fire redux event : actions
    this.props.changelanguageAppRedux(language);
  };

  render() {
    const { intl } = this.props;
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="home-header">
          <div className="home-header__content">
            <div className="home-header__left">
              <i className="fas fa-bars" onClick={this.toggleMenu}></i>
              <div className="home-header__logo">
                <a href="#">
                  <img src={logo} alt="Logo" />
                </a>
              </div>
            </div>

            <div className="home-header__center">
              <div className="home-header__nav">
                <div className="home-header__nav-item">
                  <div>
                    <b>
                      {" "}
                      <FormattedMessage id="homeheader.tag-all" />
                    </b>
                  </div>
                </div>

                <div className="home-header__nav-item">
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.tag-home" />
                    </b>
                  </div>
                </div>

                <div className="home-header__nav-item">
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.tag-hospital" />
                    </b>
                  </div>
                </div>

                <div className="home-header__nav-item">
                  <div>
                    <b>
                      {" "}
                      <FormattedMessage id="homeheader.tag-healthy" />
                    </b>
                  </div>
                </div>
              </div>

              <div className="home-header__search">
                <input
                  type="text"
                  className="home-header__search-input"
                  placeholder={intl.formatMessage({ id: "homeheader.search" })}
                ></input>
                <i className="fas fa-search"></i>
              </div>
            </div>

            <div className="home-header__right">
              <div className="home-header__cooperation">
                <i className="far fa-handshake"></i>
                <p>
                  {" "}
                  <FormattedMessage id="homeheader.cooperation" />
                </p>
              </div>

              <div className="home-header__schedule">
                <i className="far fa-clock"></i>
                <p>
                  {" "}
                  <FormattedMessage id="homeheader.appointment" />
                </p>
              </div>
              <div className="home-header__language">
                <div
                  className={language === LANGUAGES.VI ? "language-option--vi active" : "language-option--vi"}
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                </div>

                <div
                  className={language === LANGUAGES.EN ? "language-option--en active" : "language-option--en"}
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-banner">
          <div className="home-banner__intro">
            <h2>
              {" "}
              <FormattedMessage id="banner.title1"></FormattedMessage>
            </h2>
            <h2>
              <FormattedMessage id="banner.title2"></FormattedMessage>
            </h2>

            <div className="home-banner__search-container">
              <div className="home-banner__search-box">
                <input
                  type="text"
                  className="home-header__search-input"
                  placeholder={intl.formatMessage({ id: "banner.search" })}
                ></input>
                <i className="fas fa-paper-plane"></i>
              </div>

              <div className="home-banner__recommend">
                <i className="fas fa-hospital"></i>
                <FormattedMessage id="banner.findHospital"></FormattedMessage>
              </div>
            </div>
          </div>
          <div className="home-banner__gradient"></div>
        </div>

        <SideMenu isOpen={this.state.isMenuOpen} onClose={() => this.setState({ isMenuOpen: false })} />
      </React.Fragment>
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
  return {
    changelanguageAppRedux: (language) => dispatch(changelanguageApp(language)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
