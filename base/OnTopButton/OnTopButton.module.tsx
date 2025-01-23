import React, { useState, useEffect } from "react";
import { Icon } from "@base/index";
import { ALL_ICONS } from "@constants/icons";
import s from "./OnTopButton.module.scss";

const OnTopButton = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    let minScrollForButton = 50;

    if (window.innerWidth < 768) {
      minScrollForButton = 360;
    }
    const footerDistance =
      document.documentElement.scrollHeight - window.scrollY;

    if (footerDistance > window.innerHeight * 2) {
      setVisible(false);
    } else if (footerDistance - window.innerHeight < minScrollForButton) {
      setVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", toggleVisible);
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
      window.addEventListener("resize", toggleVisible);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {visible && (
        <button className={s.OnTopButton} onClick={scrollToTop}>
          <Icon
            viewBox="0 0 21 21"
            icon={ALL_ICONS.UP_ARROW}
            className={s.OnTopButton__UpArrowSvg}
          />
        </button>
      )}
    </>
  );
};

export default OnTopButton;
