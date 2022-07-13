import { FetchInstance } from "../utils/";

const getUser = async (userID) => {
  const response = await FetchInstance(`users/${userID}`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

const getUsers = async () => {
  const response = await FetchInstance(`users/`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

const getFavourites = async (userID) => {
  const response = await FetchInstance(`users/${userID}/favourites`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

const deleteFavourite = async (userID, favID) => {
  const response = await FetchInstance(`users/${userID}/favourites/${favID}`, {
    method: "DELETE"
  })
}

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
  getUsers,
  getFavourites,
  deleteFavourite,
};
