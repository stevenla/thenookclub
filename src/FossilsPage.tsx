import React, { useState } from "react";
import { FossilGroup } from "./types";
import FossilRow, { getStoreName } from "./FossilRow";
import { useRadioGroup } from "./RadioGroup";
import styles from "./FossilsPage.module.css";
import NullState from "./NullState";
import FossilIcon from "./icons/FossilIcon";
import { useStoredValues } from "./useStoredState";

import fossils from "./data/fossils.json";

const FOSSIL_GROUPS: FossilGroup[] = [
  {
    name: "Standalone Fossils",
    parts: fossils.standalone,
  },
  ...fossils.multipart,
];

const FOUND_FILTERS = ["Any", "Found", "Not Found"];

interface GroupingProps {
  fossilGroup: FossilGroup;
}

function Grouping({ fossilGroup }: GroupingProps) {
  const values = useStoredValues<boolean>(
    fossilGroup.parts.map((part) => getStoreName(part.name))
  );
  const numFound = values.reduce(
    (acc: number, value: boolean): number => acc + (value ? 1 : 0),
    0
  );

  return (
    <div className={styles.fossilGroup}>
      <div className={styles.fossilGroupName}>
        {fossilGroup.name}
        <span className={styles.fossilGroupCount}>
          ({numFound} / {values.length})
        </span>
      </div>
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
}

export default function Index() {
  const [query, setQuery] = useState<string>("");
  const [foundFilter, foundFilterEl] = useRadioGroup("catch", FOUND_FILTERS);

  const filteredFossilGroups = React.useMemo((): FossilGroup[] => {
    let ret = FOSSIL_GROUPS;

    if (query != "") {
      ret = ret.map((group) => {
        if (query !== "") {
          const regex = new RegExp(query, "gi");
          const groupNameMatches = group.name.match(regex);
          if (groupNameMatches) {
            return group;
          }
          return {
            ...group,
            parts: group.parts.filter((fossil) => {
              return !!fossil.name.match(regex);
            }),
          };
        }
        return group;
      });
    }

    if (foundFilter !== "Any") {
      ret = ret.map((group) => {
        return {
          ...group,
          parts: group.parts.filter((fossil) => {
            const storeName = getStoreName(fossil.name);
            const storageValue = window.localStorage.getItem(storeName);
            if (foundFilter === "Found") {
              return JSON.parse(storageValue);
            } else {
              return !JSON.parse(storageValue);
            }
          }),
        };
      });
    }

    return ret.filter((group) => {
      if (!group) {
        return false;
      }
      if (group.parts.length === 0) {
        return false;
      }
      return true;
    });
  }, [query, foundFilter]);

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
          <span>Found</span>
          {foundFilterEl}
        </div>
      </div>
      <div className={styles.fossils}>
        {filteredFossilGroups.map((fossilGroup) => {
          return <Grouping fossilGroup={fossilGroup} key={fossilGroup.name} />;
        })}
      </div>
      {filteredFossilGroups.length === 0 && (
        <NullState icon={<FossilIcon size={64} />} text="No fossils found" />
      )}
    </div>
  );
}
