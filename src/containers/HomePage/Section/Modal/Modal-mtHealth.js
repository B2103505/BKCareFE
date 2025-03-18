import React from "react";
import { FormattedMessage } from "react-intl";

import "./ModalService.scss";
import mental_health from "../../Data/mental_heathData";

function ModalMtHeatlth({ onclose }) {
  if (!mental_health || mental_health.length === 0) return null;

  return (
    <div className="modal-service">
      <div className="modal-service__content">
        <span className="close" onClick={onclose}>
          &times;
        </span>

        <h2>
          <FormattedMessage id="service.mental" />
        </h2>
        <div className="specialty-links-container_md">
          {mental_health.map((item, index) => (
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

export default ModalMtHeatlth;
