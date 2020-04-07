import React, { useState, useEffect, useRef } from "react";
import { PositionProperty } from "csstype";
import CrittersIcon from "./icons/CrittersIcon";
import FossilIcon from "./icons/FossilIcon";
import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

/**
 * Used to make navbars sticky-ish, where they will disappear when scrolling
 * down, but re-appear when scrolling up.
 * @param ref the element to track
 */
function useStickyish(
  ref: React.MutableRefObject<HTMLElement>
): [number, PositionProperty] {
  const lastScrollY = useRef<number>(0);
  const [top, setTop] = useState<number>(0);
  const [position, setPosition] = useState<PositionProperty>("fixed");
  useEffect(() => {
    function listener() {
      const navHeight = ref?.current?.scrollHeight || 0;
      const currentY = window.scrollY;
      const lastY = lastScrollY.current;
      if (currentY <= 0) {
        setPosition("absolute");
        setTop(0);
      } else if (currentY < lastY) {
        // Scroll up
        if (currentY - top > navHeight) {
          setTop(currentY - navHeight);
        } else if (top >= currentY) {
          setPosition("fixed");
        }
      } else {
        // Scroll down
        if (position === "fixed") {
          setPosition("absolute");
          setTop(currentY);
        }
      }
      lastScrollY.current = window.scrollY;
    }
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [top, position, ref]);
  return [position === "fixed" ? 0 : top, position];
}

export default function Nav() {
  const ref = useRef<HTMLElement>();
  const [top, position] = useStickyish(ref);
  return (
    <>
      <nav ref={ref} className={styles.nav} style={{ position, top }}>
        <NavLink
          activeClassName={styles.linkActive}
          className={styles.link}
          to="/"
        >
          <CrittersIcon size={24} />
          <span>Critters</span>
        </NavLink>
        <NavLink
          activeClassName={styles.linkActive}
          className={styles.link}
          to="/fossils"
        >
          <FossilIcon size={24} />
          <span>Fossils</span>
        </NavLink>
      </nav>
      <div className={styles.navSpacer} />
    </>
  );
}
