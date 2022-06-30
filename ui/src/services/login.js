import { FetchInstance } from "../utils/";

const login = async (username, password) => {
  return await FetchInstance("auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

const refresh = async (refreshToken) => {
  return await FetchInstance("auth/refresh", {
    method: "POST",
    headers: {
      authorization: refreshToken,
      "content-type": "application/json",
    },
  });
};

export default {
  login,
  refresh,
};
