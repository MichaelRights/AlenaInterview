import { getRoles } from ".";
import { request } from "../helpers";

export async function getLeaders(search, selected) {
  let leaders = await request("/leaders");
  let roles = await getRoles();
  leaders = leaders.filter((leader) => {
    leader.role = roles.find((role) => leader.roleId === role.id).name;
    let containsSearch = !search;
    if (search) {
      for (let key in leader) {
        if (typeof leader[key] === "string" && leader[key].includes(search)) {
          containsSearch = true;
          break;
        }
      }
    }
    if (selected) {
      return leader.selected === true && containsSearch;
    }
    return containsSearch;
  });
  return leaders;
}

export async function removeLeader(id) {
  return request(`/leaders/${id}`, "DELETE");
}

export async function addLeader(leader) {
  leader.id = Date.now();
  return await request("/leaders", "POST", leader);
}

export async function editLeader(leader) {
  return request(`/leaders/${leader.id}`, "PUT", leader);
}
