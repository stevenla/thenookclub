import React, { useState, useEffect, useRef } from "react";
import { PositionProperty } from "csstype";
import { NavLink } from "react-router-dom";

import ROUTES from "./Routes";

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
        {ROUTES.map((routeConfig) => {
          const { nav, path } = routeConfig;
          if (nav) {
            const Icon = nav.icon.default;
            return (
              <NavLink
                key={routeConfig.path}
                activeClassName={styles.linkActive}
                className={styles.link}
                to={path}
              >
                <Icon size={24} />
                <span>{nav.name}</span>
              </NavLink>
            );
          } else {
            return null;
          }
        })}
      </nav>
      <div className={styles.navSpacer} />
    </>
  );
}
