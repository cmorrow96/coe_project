import { FetchInstance } from "../utils/";

const getPublishers = async () => {
  const response = await FetchInstance(`publishers`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return { data, status: response.status };
};

export default{
    getPublishers,
};