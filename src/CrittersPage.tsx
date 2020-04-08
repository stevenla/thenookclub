import React, { useState } from "react";
import { Critter } from "./types";
import CritterRow, { getStoreName } from "./CritterRow";
import { MONTHS } from "./Calendar";
import { useRadioGroup } from "./RadioGroup";
import styles from "./CrittersPage.module.css";
import { HemisphereContextProvider } from "./HemisphereContext";
import NullState from "./NullState";
import CrittersIcon from "./icons/CrittersIcon";

import fishes from "./data/fish.json";
import bugs from "./data/bug.json";

const CRITTERS_BY_NAME: Critter[] = [...fishes, ...bugs].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
});

const CRITTERS_BY_PRICE: Critter[] = [...fishes, ...bugs].sort((a, b) => {
  return b.price - a.price;
});

function isActiveInMonths(critter: Critter, months: number[]): boolean {
  return months.some((month) => critter[MONTHS[month]]);
}

const MONTH_FILTERS = ["Any", "Current", "Expiring", "New"];
const TYPE_FILTERS = ["Any", "Fish", "Bugs"];
const HEMISPHERE_FILTERS = ["North", "South"];
const CATCH_FILTERS = ["Any", "Caught", "Uncaught"];
const SORT_OPTIONS = ["Name", "Price"];

export default function Index() {
  const [monthFilter, monthFilterEl] = useRadioGroup("month", MONTH_FILTERS);
  const [typeFilter, typeFilterEl] = useRadioGroup("type", TYPE_FILTERS);
  const [catchFilter, catchFilterEl] = useRadioGroup("catch", CATCH_FILTERS);
  const [hemisphere, hemisphereEl] = useRadioGroup("hemi", HEMISPHERE_FILTERS);
  const [sort, sortEl] = useRadioGroup("sort", SORT_OPTIONS);

  const [query, setQuery] = useState<string>("");

  const filteredCritters = React.useMemo(() => {
    const crittersToUse =
      sort === "Price" ? CRITTERS_BY_PRICE : CRITTERS_BY_NAME;
    return crittersToUse.filter((critter) => {
      const now = new Date();
      const hemisphereOffset = hemisphere === "North" ? 0 : 6;
      const thisMonth = now.getMonth() + hemisphereOffset;
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

      if (catchFilter !== "Any") {
        const storeName = getStoreName(critter.name);
        const storageValue = window.localStorage.getItem(storeName);
        const parsedValue = storageValue && JSON.parse(storageValue);
        if (catchFilter === "Caught" && parsedValue === false) {
          return false;
        } else if (catchFilter === "Uncaught" && parsedValue === true) {
          return false;
        }
      }

      if (query !== "") {
        const regex = new RegExp(query, "gi");
        return !!critter.name.match(regex);
      }

      return true;
    });
  }, [monthFilter, typeFilter, query, sort, hemisphere, catchFilter]);

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <span>Name</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        <div className={styles.filterRow}>
          <span>Caught</span>
          {catchFilterEl}
        </div>
        <div className={styles.filterRow}>
          <span>Hemi</span>
          {hemisphereEl}
        </div>
        <div className={styles.filterRow}>
          <span>Sort</span>
          {sortEl}
        </div>
      </div>
      <HemisphereContextProvider value={hemisphere}>
        <div className={styles.critters}>
          {filteredCritters.map((critter) => {
            return (
              <div key={critter.name} className={styles.critter}>
                <CritterRow critter={critter} />
              </div>
            );
          })}
        </div>
      </HemisphereContextProvider>
      {filteredCritters.length === 0 && (
        <NullState icon={<CrittersIcon size={64} />} text="No critters found" />
      )}
    </div>
  );
}
