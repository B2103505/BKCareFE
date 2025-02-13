import React from "react";

function ArrowButton({ direction, onClick }) {
    return (
        <button className={`scroll-btn ${direction}`} onClick={onClick} aria-label={`Scroll ${direction}`}>
            {direction === "left" ? "◀" : "▶"}
        </button>
    );
}

export default ArrowButton;
