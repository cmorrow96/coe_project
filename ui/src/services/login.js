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

export default {
  login,
};
