import React from "react";
import { FormattedMessage } from "react-intl";

import "./style/ModalService.scss";
import healthtests from "../../Data/health-testData";

function Modal_healthtest({ onclose }) {
  if (!healthtests || healthtests.length === 0) return null;

  return (
    <div className="modal-service">
      <div className="modal-service__content">
        <span className="close" onClick={onclose}>
          &times;
        </span>

        <h2>
          <FormattedMessage id="service.healthtest" />
        </h2>
        <div className="specialty-links-container_md">
          {healthtests.map((item, index) => (
            <div className="specialty-container_md" key={index}>
              <button className="specialty_option">
                <div>
                  <img src={item.img} alt={item.text} />
                </div>
                <span>
                  <FormattedMessage id={item.text} />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal_healthtest;
