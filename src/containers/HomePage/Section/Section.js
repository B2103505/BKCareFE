import React, { useState } from "react";
import DragScroll from "./Function/DragScroll";
import ModalBK from "./Modal/ModalBK";

import { FormattedMessage } from "react-intl";
import "./SpecialtySection.scss";

function Section({ title, items, onItemClick }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở rộng

  return (
    <div className="services-overview">
      <h1>
        <FormattedMessage id={title} />
      </h1>

      {/* Kiểm tra nếu đang ở chế độ kéo ngang thì dùng DragScroll */}
      {isExpanded ? (
        <div className="specialty-links-container expanded">
          {items.map((item, index) => {
            return (
              <div className="specialty-container" key={index}>
                <button onClick={() => onItemClick(item)}>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span>{item.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <DragScroll>
          <div className="specialty-links-container">
            {items.map((item, index) => {
              return (
                <div className="specialty-container" key={index}>
                  <button onClick={() => onItemClick(item)}>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <span>{item.name}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </DragScroll>
      )}

      <div className="extension_btn">
        <button className="ext_btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Hiển thị modal nếu có dịch vụ được chọn */}
      <ModalBK service={selectedService} onclose={() => setSelectedService(null)} />
    </div>
  );
}

export default Section;
