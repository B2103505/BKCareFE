import React from "react";
import "./SideMenu.css";

import { FormattedMessage } from "react-intl";

function SideMenu({ isOpen, onClose }) {
  const options = [
    { name: <FormattedMessage id="sidemenu.home" />, url: "" },
    { name: <FormattedMessage id="sidemenu.handbook" />, url: "" },
    { name: <FormattedMessage id="sidemenu.partnership" />, url: "" },
    { name: <FormattedMessage id="sidemenu.business_health" />, url: "" },
    { name: <FormattedMessage id="sidemenu.clinic_digital" />, url: "" },
    { name: <FormattedMessage id="sidemenu.recruitment" />, url: "" },
  ];

  if (!isOpen) return null;

  return (
    //Khi nhấn vào sẽ đóng menu
    <div className={`side-menu-overlay ${isOpen ? "active" : ""}`} onClick={onClose}>
      {/* Phòng khi nhấn vào sẽ không đóng menu */}
      <div className="side-menu_container" onClick={(e) => e.stopPropagation()}>
        <div className="side-menu__content">
          {options.map((item, index) => (
            <div key={index} className="side-menu__option">
              <a href={item.url}>{item.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
