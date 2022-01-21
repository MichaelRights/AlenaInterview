import React, { useContext } from "react";
import { useCallback, useEffect, useState } from "react/cjs/react.development";
import { editLeader, getLeaders, removeLeader } from "../../../../services";
import { Filters, Leader } from "./components";
import { LeadersContext } from "../../LeaderManagment";
import "./LeaderList.css";
import { initialState } from "../AddOrUpdateLeader/store";

let timeout = 0;
export function LeaderList() {
  const { leaders, setLeaders, setSelectedLeader } = useContext(LeadersContext);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    console.log(
      search,
      search.length,
      selected,
      !search || search.length > 3 || selected
    );
    if (!search || search.length > 3 || selected) {
      clearTimeout(timeout);
      timeout = setTimeout(
        () =>
          getLeaders(search, selected).then((data) => {
            setLeaders(data);
          }),
        200
      );
    }
  }, [search, selected]);

  const handleRemove = useCallback(
    (id) => {
      removeLeader(id);
      setLeaders((prevLeaders) =>
        prevLeaders.filter((leader) => leader.id !== id)
      );
      setSelectedLeader(initialState);
    },
    [setLeaders]
  );

  const handleDoubleClick = useCallback(
    (leader) => {
      leader.selected = !leader.selected;
      setLeaders((prev) => prev.map((l) => (l.id === leader.id ? leader : l)));
      editLeader(leader);
    },
    [setLeaders]
  );
  return (
    <>
      <Filters
        value={search}
        setValue={setSearch}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="list-container d-flex flex-direction-column">
        {leaders.map((leader) => (
          <Leader
            key={leader.id}
            onClick={setSelectedLeader}
            onDoubleClick={handleDoubleClick}
            onRemove={handleRemove}
            leader={leader}
          />
        ))}
      </div>
    </>
  );
}
