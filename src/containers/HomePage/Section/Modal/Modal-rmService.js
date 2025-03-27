import React from "react";
import { FormattedMessage } from "react-intl";

import "./style/ModalService.scss";
import rm_services from "../../Data/rm_serviceData";

function ModalRmService({ onclose }) {
  if (!rm_services || rm_services.length === 0) return null;

  return (
    <div className="modal-service">
      <div className="modal-service__content">
        <span className="close" onClick={onclose}>
          &times;
        </span>

        <h2>
          <FormattedMessage id="service.remote" />
        </h2>
        <div className="specialty-links-container_md">
          {rm_services.map((item, index) => (
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

export default ModalRmService;
