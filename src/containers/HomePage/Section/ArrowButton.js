import React from "react";

import "./ArrowButton.scss";

function ArrowButton({ direction, onClick }) {
  return (
    <button className={`scroll-btn ${direction}`} onClick={onClick} aria-label={`Scroll ${direction}`}>
      {direction === "left" ? "◀" : "▶"}
    </button>
  );
}

export default ArrowButton;
