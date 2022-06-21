import { FetchInstance } from "../utils/";

const getUser = async (userID) => {
  const response = await FetchInstance(`users/${userID}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return { data, status: response.status };
};

const getFavourites = async (userID) => {
  const response = await FetchInstance(`users/${userID}/favourites`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return { data, status: response.status };
};

// const getFavouritesNEW = async (userID) => {
//     const response = await FetchInstance(`users/${userID}/favourites`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     });

//     const data = await response.json();
//     return { data, status: response.status }
//   };

//   const { data, status } = await FavouriteService.getFavouritesNEW(1);

export default {
  getUser,
  getFavourites,
};
