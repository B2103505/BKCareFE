import React, { useState } from "react";
import DragScroll from "./Function/DragScroll";
import ModalBK from "./Modal/ModalBK";

import { FormattedMessage } from "react-intl";
import "./SpecialtySection.scss";

function Section({ title, items }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="services-overview">
      <h1>
        <FormattedMessage id={title} />
      </h1>
      <DragScroll>
        <div className="specialty-links-container">
          {items.map((item, index) => (
            <div className="specialty-container" key={index}>
              <button onClick={() => setSelectedService(item)}>
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
      </DragScroll>

      {/* Hiển thị modal nếu có dịch vụ được chọn */}
      <ModalBK service={selectedService} onclose={() => setSelectedService(null)} />
    </div>
  );
}

export default Section;
