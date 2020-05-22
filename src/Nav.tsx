import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStickyish } from "react-stickyish";

import ROUTES from "./Routes";

import styles from "./Nav.module.css";

export default function Nav() {
  const ref = useRef<HTMLElement>();
  const { top, position } = useStickyish(ref);
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
