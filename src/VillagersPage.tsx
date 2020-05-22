import React from "react";
import NullState from "./NullState";
import VillagersIcon from "./icons/VillagersIcon";
import { css } from "otion";

import VILLAGERS_DATA from "./data/villagers.json";

function nameToImageName(name: string): string {
  const cleanName = name.toLocaleLowerCase().replace(/[^\s\w\d]/g, "");
  return `/images/villagers/${cleanName}.png`;
}

export default function VillagersPage() {
  return (
    <div className={styles.root}>
      {VILLAGERS_DATA.map((villager) => {
        return (
          <div className={styles.villager} key={villager.name}>
            {villager.name}
            <img
              className={styles.image}
              src={nameToImageName(villager.name)}
            />
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }),
  villager: css({}),
  image: css({
    height: 64,
    width: 64,
  }),
};
