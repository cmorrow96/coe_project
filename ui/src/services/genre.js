import { FetchInstance } from "../utils/";

const getGenres = async () => {
  const response = await FetchInstance(`genres`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

export default{
    getGenres,
};