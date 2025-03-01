import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import "./ServicesOverview.scss";
import ModalService from "./Modal/ModalService";
import services from "../Data/serviceData";

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

        {this.state.selectedService && <ModalService onclose={() => this.setSelectedService(null)} />}
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
