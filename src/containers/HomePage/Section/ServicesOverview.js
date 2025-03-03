import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import "./ServicesOverview.scss";

import ModalService from "./Modal/ModalService";
import services from "../Data/serviceData";
import Modal_rmService from "./Modal/Modal_rmService";
import Modal_mtHeatlth from "./Modal/Modal_mtHealth";

class ServicesOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModal: null,
    };
  }

  setSelectedService = (modalType) => {
    // this.setState({ selectedService: service });
    // Lựa chọn bằng modalType
    this.setState({ selectedModal: modalType });
  };

  closeServiceModal = () => {
    this.setState({ selectedModal: null });
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
            <div
              className="service-container"
              key={index}
              style={{ backgroundImage: "url('/icon-service/bg.webp')" }}
            >
              <img src={service.img} alt={intl.formatMessage({ id: service.id })} className="service-img" />
              <button className="service-link" onClick={() => this.setSelectedService(service.modalType)}>
                <div className="service-item">
                  <FormattedMessage id={service.id} />
                </div>
              </button>
            </div>
          ))}
        </div>
        {this.state.selectedModal === "specialist" && <ModalService onclose={this.closeServiceModal} />}
        {this.state.selectedModal === "remote" && <Modal_rmService onclose={this.closeServiceModal} />}
        {this.state.selectedModal === "mental" && <Modal_mtHeatlth onclose={this.closeServiceModal} />}
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
