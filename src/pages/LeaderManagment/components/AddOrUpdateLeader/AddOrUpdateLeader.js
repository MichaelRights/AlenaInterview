import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useContext,
} from "react";
import { Select } from "../../../../components";
import { validatePhone } from "../../../../helpers";
import { getItemById } from "../../../../helpers/getters";
import { addLeader, editLeader, getRoles } from "../../../../services";
import { LeadersContext } from "../../LeaderManagment";
import {
  reducer,
  handleChange as handleValueChange,
  clearState,
  setState,
} from "./store";

export function AddOrUpdateLeader() {
  const { selectedLeader, setLeaders } = useContext(LeadersContext);
  const [selectedRole, setSelectedRole] = useState({ id: "" });
  const [roles, setRoles] = useState([]);
  const [state, dispatch] = useReducer(reducer, selectedLeader);
  const { firstName, lastName, organization, email, phone } = state;

  useEffect(() => {
    // initialize roles
    getRoles().then((data) => {
      setRoles(data);
    });
  }, []);

  useEffect(() => {
    if (selectedLeader.id !== null) {
      dispatch(setState(selectedLeader));
      setSelectedRole({ id: selectedLeader.roleId, name: selectedLeader.role });
    }
  }, [selectedLeader]);

  const handleChange = useCallback(
    (e) => {
      // using the id of input as key
      dispatch(handleValueChange(e.target.id, e.target.value));
    },
    [state]
  );
  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      // clearing all fields of form
      dispatch(clearState());
      setSelectedRole({ id: "" });
    },
    [clearState]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      state.roleId = selectedRole.id;
      state.role = getItemById(roles, selectedRole.id).name;
      // if there is leader id then edit
      // else add it to db
      if (state.id) {
        editLeader(state).then(() => {
          setLeaders((prev) => {
            return prev.map((leader) =>
              leader.id === state.id ? state : leader
            );
          });
        });
      } else {
        addLeader(state).then((data) => {
          setLeaders((prev) => {
            data.role = selectedRole.name;
            prev.push(data);
            return [...prev];
          });
        });
      }
      // then clear all fields
      dispatch(clearState());
    },
    [state]
  );
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <fieldset className="d-flex flex-direction-column">
        <input
          id="firstName"
          value={firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
          type="text"
        />
        <input
          id="lastName"
          value={lastName}
          onChange={handleChange}
          required
          placeholder="Last Name"
          type="text"
        />
        <input
          id="organization"
          value={organization}
          onChange={handleChange}
          required
          placeholder="Organization"
          type="text"
        />
        <Select
          onSelect={(item) => setSelectedRole(item)}
          placeholder="Role"
          data={roles}
          selectedItem={selectedRole}
        />
        <input
          id="email"
          value={email}
          onChange={handleChange}
          required
          placeholder="Email"
          type="email"
        />
        <input
          id="phone"
          value={phone}
          onChange={handleChange}
          required
          placeholder="Phone"
          onInvalid={validatePhone}
          pattern="[+][0-9]{1,3}[\s][(][0-9]{3}[)][\s][0-9]{3}-[0-9]{4}"
          type="tel"
        />
        <fieldset className="d-flex justify-content-between">
          <button type="submit" className="btn">
            Save
          </button>
          <button type="reset" className="btn">
            Clear
          </button>
        </fieldset>
      </fieldset>
    </form>
  );
}
