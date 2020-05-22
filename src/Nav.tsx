import React, { useState, useEffect, useRef } from "react";
import { PositionProperty } from "csstype";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import useColor from "./icons/useColor";
import { motion, AnimateSharedLayout } from "framer-motion";
import Curve from "./Curve";

import ROUTES, { RouteConfig } from "./Routes";

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
        setPosition("fixed");
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

function useMatchedRoute() {
  const location = useLocation();
  const matchedRoute = ROUTES.filter(
    (route) => location.pathname === route.path
  );
  if (matchedRoute.length < 1) {
    return null;
  }
  return matchedRoute[0];
}

export function useRouteColor() {
  const matchedRoute = useMatchedRoute();
  return useColor(matchedRoute?.nav?.color);
}

interface NavItemProps {
  routeConfig: RouteConfig;
}

function NavItem({ routeConfig }: NavItemProps) {
  const { nav, path } = routeConfig;
  const isMatch: boolean = useMatch(routeConfig.path);
  if (nav) {
    const Icon = nav.icon.default;
    return (
      <NavLink className={styles.link} to={path}>
        <motion.div
          whileTap={{ scale: 0.8, rotate: -10 }}
          animate={isMatch ? { scale: 1.4 } : { scale: 1 }}
        >
          <Icon size={24} color={isMatch ? "--background" : "--foreground"} />
        </motion.div>
      </NavLink>
    );
  } else {
    return null;
  }
}

export default function Nav() {
  const ref = useRef<HTMLElement>();
  const color = useRouteColor();
  const [top, position] = useStickyish(ref);
  return (
    <>
      <style type="text/css">
        :root {"{"} --active: {color}
      </style>
      <nav ref={ref} className={styles.nav} style={{ top, position }}>
        <div className={styles.navItems} style={{ backgroundColor: color }}>
          {ROUTES.map((routeConfig) => (
            <NavItem routeConfig={routeConfig} />
          ))}
        </div>
        <Curve />
      </nav>
      <div className={styles.navSpacer} />
    </>
  );
}
