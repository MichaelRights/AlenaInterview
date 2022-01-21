import React, { useEffect, useState } from "react";
import { AddOrUpdateLeader, LeaderList } from "./components";
import { initialState } from "./components/AddOrUpdateLeader/store";
export const LeadersContext = React.createContext([]);

export function LeaderManagment() {
  const [leaders, setLeaders] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState({ id: null });
  return (
    <LeadersContext.Provider
      value={{ leaders, setLeaders, selectedLeader, setSelectedLeader }}
    >
      <AddOrUpdateLeader />
      <LeaderList />
    </LeadersContext.Provider>
  );
}
