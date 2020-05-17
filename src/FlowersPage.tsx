import React, { useState } from "react";
import { FlowerGroup, Flower } from "./types";
import styles from "./FlowersPage.module.css";
import FlowerRow, { getStoreName } from "./FlowerRow";
import NullState from "./NullState";
import FlowerIcon from "./icons/FlowerIcon";
import { useRadioGroup } from "./RadioGroup";
import { useStoredValues } from "./useStoredState";

import flowers from "./data/flowers.json";

const FLOWER_GROUPS: FlowerGroup[] = [...flowers];
const FLOWERS_BY_GROUP_NAME: { [key: string]: Flower[] } = FLOWER_GROUPS.reduce(
  (acc, group) => {
    acc[group.name] = [...group.flowers];
    return acc;
  },
  {}
);

const FOUND_FILTERS = ["Any", "Found", "Not Found"];

interface GroupingProps {
  flowerGroup: FlowerGroup;
}

function Grouping({ flowerGroup }: GroupingProps) {
  const values = useStoredValues<boolean>(
    FLOWERS_BY_GROUP_NAME[flowerGroup.name].map((flower) =>
      getStoreName(flower)
    )
  );
  const numFound = values.reduce(
    (acc: number, value: boolean): number => acc + (value ? 1 : 0),
    0
  );

  return (
    <div className={styles.flowerGroup}>
      <div className={styles.flowerGroupName}>
        {flowerGroup.name}
        <span className={styles.flowerGroupCount}>
          ({numFound} / {FLOWERS_BY_GROUP_NAME[flowerGroup.name].length})
        </span>
      </div>
      <div className={styles.flowerList}>
        {flowerGroup.flowers.map((flower) => {
          return (
            <div key={`${flower.color}_${flower.type}`} className={styles.flower}>
              <FlowerRow flower={flower} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FlowersPage() {
  const [query, setQuery] = useState<string>("");
  const [foundFilter, foundFilterEl] = useRadioGroup("catch", FOUND_FILTERS);

  const filteredFlowerGroups = React.useMemo((): FlowerGroup[] => {
    let ret = FLOWER_GROUPS;
      
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
              flowers: group.flowers.filter((flower) => {
              return !!(flower.type.match(regex) || flower.color.match(regex));
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
          flowers: group.flowers.filter((flower) => {
            const storeName = getStoreName(flower);
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
      if (group.flowers.length === 0) {
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
      <div className={styles.flowers}>
      {filteredFlowerGroups.map((flowerGroup) => {
          return <Grouping flowerGroup={flowerGroup} key={flowerGroup.name} />;
        })}
      </div>
      {filteredFlowerGroups.length === 0 && (
        <NullState icon={<FlowerIcon size={64} />} text="No flowers found" />
      )}
    </div>
  );
}
