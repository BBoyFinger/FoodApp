import React, { useEffect, useState } from "react";
import "./scroll.css";
import { BackTop } from "antd";
import { IoChevronUpOutline } from "react-icons/io5";

function Scroll() {
  const [heightPage, setHeightPage] = useState(0);
  const handleScroll = () => {
    setHeightPage(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="scroll">
      {heightPage > 1000 ? (
        <div>
          <BackTop
            className="scrolltotop"
            style={{ color: "white", right: "85px" }}
          >
            <IoChevronUpOutline />
          </BackTop>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default Scroll;
