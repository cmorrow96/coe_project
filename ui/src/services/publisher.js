import { FetchInstance } from "../utils/";

const getPublishers = async () => {
  const response = await FetchInstance(`publishers`, {
    method: "GET",
  });

  const data = await response.json();
  return { data, status: response.status };
};

export default{
    getPublishers,
};