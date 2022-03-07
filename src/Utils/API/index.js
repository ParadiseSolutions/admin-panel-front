export const createStorageSync = (keys, values) => {
  return localStorage.setItem(keys, values);
};

export const getStorageSync = (key) => {
  return localStorage.getItem(key);
};

const tokenData = JSON.parse(getStorageSync("token"));
const bearerToken = tokenData ? `Bearer ${tokenData.token}` : '';
export const API_URL = `https://api.paradisesolutions.com/api`;

export const options = {
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: `${bearerToken}`,
};
