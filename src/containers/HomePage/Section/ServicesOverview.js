import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import "./ServicesOverview.scss";

class ServicesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: null,
    };
  }

  setSelectedService = (service) => {
    this.setState({ selectedService: service });
  };

  render() {
    const { intl } = this.props;
    const services = [
      { img: "/icon-service/1.webp", id: "service.specialist" },
      { img: "/icon-service/2.webp", id: "service.remote" },
      { img: "/icon-service/3.webp", id: "service.general" },
      { img: "/icon-service/4.webp", id: "service.lab" },
      { img: "/icon-service/5.webp", id: "service.mental" },
      { img: "/icon-service/6.webp", id: "service.dental" },
      { img: "/icon-service/7.webp", id: "service.surgery" },
      { img: "/icon-service/8.webp", id: "service.diabetes" },
      { img: "/icon-service/9.webp", id: "service.healthtest" },
      { img: "/icon-service/10.webp", id: "service.nearby" },
    ];

    return (
      <div className="services-overview">
        <h1>
          <FormattedMessage id="service.title" />
        </h1>
        <div className="service-links-container">
          {services.map((service, index) => (
            <div className="service-container" key={index}>
              <img src={service.img} alt={intl.formatMessage({ id: service.id })} className="service-img" />
              <button className="service-link" onClick={() => this.setSelectedService(service)}>
                <div className="service-item">
                  <FormattedMessage id={service.id} />
                </div>
              </button>
            </div>
          ))}
        </div>
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ServicesOverview));
