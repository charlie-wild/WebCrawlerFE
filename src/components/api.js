import axios from "axios";

export const getLinkData = async URL => {
  const { data } = await axios.get(URL);
  return data;
}