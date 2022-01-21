import { request } from "../helpers";

export const getRoles = async () => {
  let roles = await request("/roles");
  return roles;
};
