import { FetchInstance } from "../utils/";

const getFavourites = async (userID) => {
  return await FetchInstance(`users/${userID}/favourites/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
};

export default {
  getFavourites,
};
