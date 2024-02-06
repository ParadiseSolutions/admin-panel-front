export const createStorageSync = (keys, values) => {
  if (keys === "token") {
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

export const createSessionSync = (keys, values) => {
  return sessionStorage.setItem(keys, values);
};

export const getSessionSync = (key) => {
  return sessionStorage.getItem(key);
};

var tokenData = JSON.parse(getStorageSync("token"));
var bearerToken = tokenData ? `Bearer ${tokenData.token}` : '';
export const API_URL = `https://apitest.paradisesolutions.com/api`;

export var options = {
  "Content-Type": "application/json",
  accept: "application/json",
  Authorization: `${bearerToken}`,
};

export const getCookie = (cname, json = false) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      if (json) {
        return JSON.parse(c.substring(name.length, c.length));
      } else {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
}

export const setCookie = (cname, cvalue, seconds = 24 * 60 * 60 * 1000) => {
  const d = new Date();
  // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  d.setTime(d.getTime() + (seconds * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;domain=" + window.location.hostname;
}

export const removeCookie = (cname) => {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=" + window.location.hostname;
}

export const switchTourTab = (tab) => {
  return window.location.protocol + "//" + window.location.host + window.location.pathname + "?t=" + tab
}