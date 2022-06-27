import { FetchInstance } from "../utils/";

const getDevelopers = async () => {
  const response = await FetchInstance(`developers`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return { data, status: response.status };
};

export default{
    getDevelopers,
};