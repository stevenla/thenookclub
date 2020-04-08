import React, { useState } from "react";
import { Critter, Fossil, FossilGroup, FossilJSON } from "./types";
import FossilRow, { getStoreName } from "./FossilRow";
import { MONTHS } from "./Calendar";
import { useRadioGroup } from "./RadioGroup";
import styles from "./FossilsPage.module.css";
import { HemisphereContextProvider } from "./HemisphereContext";

import fossils from "./data/fossils.json";

const FOSSIL_GROUPS: FossilGroup[] = [
  {
    name: "Standalone Fossils",
    parts: fossils.standalone,
  },
  ...fossils.multipart,
];

export default function Index() {
  const [query, setQuery] = useState<string>("");

  const filteredFossilGroups = React.useMemo(() => {
    return FOSSIL_GROUPS.map(
      (group: FossilGroup): FossilGroup => {
        if (query !== "") {
          const regex = new RegExp(query, "gi");
          const groupNameMatches = group.name.match(regex);
          if (groupNameMatches) {
            return group;
          }
          const newGroup = {
            name: group.name,
            parts: group.parts.filter((fossil: Fossil) => {
              return !!fossil.name.match(regex);
            }),
          };
          if (newGroup.parts.length === 0) {
            return null;
          }
          return newGroup;
        }
        return group;
      }
    ).filter((x) => x);
  }, [query]);

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
      </div>
      <div className={styles.fossils}>
        {filteredFossilGroups.map((fossilGroup) => {
          return (
            <div key={fossilGroup.name} className={styles.fossilGroup}>
              <div className={styles.fossilGroupName}>{fossilGroup.name}</div>
              <div className={styles.fossilList}>
                {fossilGroup.parts.map((fossil) => {
                  return (
                    <div key={fossil.name} className={styles.fossil}>
                      <FossilRow fossil={fossil} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
