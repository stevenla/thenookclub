import React, { useState } from "react";
import { Critter } from "./types";
import CritterRow from "./CritterRow";
import { useRadioGroup } from "./RadioGroup";
import styles from "./App.module.css";

import fishes from "./data/fish.json";
import bugs from "./data/bug.json";

const CRITTERS: Critter[] = [...fishes, ...bugs].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
});

const MONTH_NUMBER_TO_STR = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

function isActiveInMonths(critter: Critter, months: number[]): boolean {
  return months.some(month => critter[MONTH_NUMBER_TO_STR[month]]);
}

const MONTH_FILTERS = ["Any", "Current", "Expiring", "New"];
const TYPE_FILTERS = ["Any", "Fish", "Bugs"];

export default function Index() {
  const [monthFilter, monthFilterEl] = useRadioGroup(
    "monthFilter",
    "Any",
    MONTH_FILTERS
  );

  const [typeFilter, typeFilterEl] = useRadioGroup(
    "typeFilter",
    "Any",
    TYPE_FILTERS
  );

  const [query, setQuery] = useState<string>("");

  const filteredCritters = React.useMemo(
    () =>
      CRITTERS.filter(critter => {
        const now = new Date();
        const thisMonth = now.getMonth();
        const nextMonth = (thisMonth + 1) % 12;
        const prevMonth = (thisMonth - 1 + 12) % 12;

        if (
          monthFilter === "Current" &&
          !isActiveInMonths(critter, [thisMonth])
        ) {
          return false;
        }

        if (
          monthFilter === "Expiring" &&
          !(
            isActiveInMonths(critter, [thisMonth]) &&
            !isActiveInMonths(critter, [nextMonth])
          )
        ) {
          return false;
        }

        if (
          monthFilter === "New" &&
          !(
            isActiveInMonths(critter, [thisMonth]) &&
            !isActiveInMonths(critter, [prevMonth])
          )
        ) {
          return false;
        }

        if (typeFilter === "Bugs" && critter.type !== "bug") {
          return false;
        }
        if (typeFilter === "Fish" && critter.type !== "fish") {
          return false;
        }

        if (query !== "") {
          const regex = new RegExp(query, "gi");
          return !!critter.name.match(regex);
        }

        return true;
      }),
    [monthFilter, typeFilter, query]
  );

  return (
    <div>
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <span>Name</span>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="search..."
          />
        </div>
        <div className={styles.filterRow}>
          <span>Type</span>
          {typeFilterEl}
        </div>
        <div className={styles.filterRow}>
          <span>Month</span>
          {monthFilterEl}
        </div>
      </div>
      <div className={styles.critters}>
        {filteredCritters.map(critter => {
          return <CritterRow key={critter.name} critter={critter} />;
        })}
      </div>
    </div>
  );
}
