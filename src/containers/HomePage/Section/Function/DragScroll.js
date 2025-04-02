import React, { useRef, useState, useEffect } from "react";
import ArrowButton from "./ArrowButton";

import "./DragScroll.scss";

function DragScroll({ children, showArrows = true }) {
  const containerRef = useRef(null); // Tham chiếu đến container
  const [isDragging, setIsDragging] = useState(false); // Theo dõi trạng thái kéo
  const [startX, setStartX] = useState(0); // Vị trí chuột ban đầu
  const [scrollLeft, setScrollLeft] = useState(0); // Vị trí cuộn ban đầu
  const [itemWidth, setItemWidth] = useState(0); // Chiều rộng của mỗi phần tử

  const [canScrollLeft, setCanScrollLeft] = useState(false); // Trạng thái nút trái
  const [canScrollRight, setCanScrollRight] = useState(true); // Trạng thái nút phải

  useEffect(() => {
    // Lấy chiều rộng của một phần tử (giả định các phần tử có chiều rộng bằng nhau)
    if (containerRef.current) {
      const firstItem = containerRef.current.querySelector(".specialty-container");
      if (firstItem) {
        setItemWidth(firstItem.offsetWidth);
      }
    }

    updateButtonVisibility(); // Cập nhật trạng thái nút khi component được render
  }, [children]);

  const updateButtonVisibility = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(Math.floor(container.scrollLeft) > 0);
      setCanScrollRight(Math.floor(container.scrollLeft) + 1 + container.clientWidth < container.scrollWidth);
    }
  };

  // Sự kiện cuộn container
  const handleScroll = () => {
    updateButtonVisibility();
  };

  // Khi nhấn chuột, lưu lại trạng thái và vị trí ban đầu
  const handleMouseDown = (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // Khi di chuyển chuột, tính toán khoảng cách kéo và di chuyển container
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Tăng tốc độ cuộn
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Khi thả chuột hoặc chuột rời container, tắt trạng thái kéo
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Xử lý khi nhấn nút mũi tên trái
  const handleScrollLeft = () => {
    containerRef.current.scrollBy({
      left: -((itemWidth + 20) * 3), // Di chuyển sang trái 300px
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  // Xử lý khi nhấn nút mũi tên phải
  const handleScrollRight = () => {
    containerRef.current.scrollBy({
      left: +((itemWidth + 20) * 3), // Di chuyển sang trái 300px
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={containerRef} // Tham chiếu đến container
        className="drag-scroll-container"
        onMouseDown={handleMouseDown} // Xử lý sự kiện nhấn chuột
        onMouseMove={handleMouseMove} // Xử lý sự kiện di chuyển chuột
        onMouseUp={handleMouseUp} // Xử lý sự kiện thả chuột
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll} // Lắng nghe sự kiện cuộn
      >
        {children} {/* Nội dung sẽ được render bên trong */}
        {/* Nút cuộn trái/phải */}
        {showArrows && canScrollLeft && <ArrowButton direction="left" onClick={handleScrollLeft} />}
        {showArrows && canScrollRight && <ArrowButton direction="right" onClick={handleScrollRight} />}
      </div>
    </div>
  );
}

export default DragScroll;
