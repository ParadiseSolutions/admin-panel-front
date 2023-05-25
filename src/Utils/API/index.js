export const createStorageSync = (keys, values) => {
  if(keys == "token") {
    tokenData = JSON.parse(values);
    bearerToken = tokenData ? `Bearer ${tokenData.token}` : '';
    options = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${bearerToken}`,
    }
  }

  return localStorage.setItem(keys, values);
};

export const getStorageSync = (key) => {
  return localStorage.getItem(key);
};

var tokenData = JSON.parse(getStorageSync("token"));
var bearerToken = tokenData ? `Bearer ${tokenData.token}` : '';
export const API_URL = `https://apitest.paradisesolutions.com/api`;

export var options = {
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: `${bearerToken}`,
};
