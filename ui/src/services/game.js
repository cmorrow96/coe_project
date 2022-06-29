import { FetchInstance } from "../utils/";

const getGame = async (id) => {
  const response = await FetchInstance(`games/${id}`, {
    method: "GET",
  });
};

const getGames = async () => {
  const response = await FetchInstance(`games`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

const createGame = async () => {
    const response = await FetchInstance(`games`, {
        method: "POST",
    })
}

export default {
  getGame,
  getGames,
  createGame,
};
