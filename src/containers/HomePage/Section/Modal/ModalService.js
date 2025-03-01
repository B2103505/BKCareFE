import React from "react";
import specialties from "../../Data/specialtyData";
import { FormattedMessage } from "react-intl";

import "./ModalService.scss";

function ModalService({ onclose }) {
  if (!specialties || specialties.length === 0) return null;

  return (
    <div className="modal-service">
      <div className="modal-service__content">
        <span className="close" onClick={onclose}>
          &times;
        </span>

        <h2>Danh sách chuyên khoa</h2>
        <div className="specialty-links-container_md">
          {specialties.map((item, index) => (
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

export default ModalService;
