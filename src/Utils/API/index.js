

export const createStorageSync = (keys, values) => {

    return localStorage.setItem(keys, values);
  };
  
  export const getStorageSync = (key) => {
    return localStorage.getItem(key);
  };
  
//   export const getUniqueName = (tok) => {
//     try {
//       const val = jwt_decode(tok);
//       return val.unique_name;
//     } catch (error) {
//       return null;
//     }
//   };
  
  export const API_URL = `https://api.paradisesolutions.com/api`;
  //export const API_URL = `https://localhost:44358/`;
  
  export const options = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  